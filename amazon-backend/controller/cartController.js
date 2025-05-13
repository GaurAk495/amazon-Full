import Cart from '../model/cartModel.js';
import User from '../model/userModel.js';
import Ship from '../model/deliveryModel.js';
import Order from '../model/OrderModel.js';


const addtoCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    if (!req.body || !userId) {
      return res.status(400).json({ message: "Invalid input." });
    }
    console.log({ productId, quantity })
    const deliveryId = '681e5617ff0a1a62be74ad35';

    // 1. Get the user's cartItems array
    const user = await User.findById(userId).populate({
      path: "cartItems",
      populate: [{ path: "productId" }, { path: "deliveryOptionId" }]
    });
    // 2. Check if product already exists in cart
    const existingCartItem = user.cartItems.find((item) => {
      console.log(item.productId._id.toString() === productId)
      return item.productId._id.toString() === productId
    }
    );

    let cartDetail;

    if (existingCartItem) {
      // 3. If exists, update quantity
      const updatedCartItem = await Cart.findByIdAndUpdate(
        existingCartItem._id,
        { $inc: { quantity: quantity } },
        { new: true }
      ).populate("productId deliveryOptionId");

      cartDetail = updatedCartItem;
    } else {
      // 4. If not exists, create new cart item
      const newCartItem = await Cart.create({
        productId: productId,
        quantity,
        deliveryOptionId: deliveryId,
      });

      // 5. Push to user's cartItems array
      await User.findByIdAndUpdate(userId, {
        $push: { cartItems: newCartItem._id },
      });

      cartDetail = await Cart.findById(newCartItem._id).populate("productId deliveryOptionId");
    }

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully.",
      cartItem: cartDetail,
    });

  } catch (error) {
    console.error("❌ addtoCart error:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

const updateQty = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cartId, newQty } = req.body;

    // Quantity validation
    if (typeof newQty !== 'number' || newQty < 1) {
      return res.status(400).json({ success: false, message: "Invalid quantity value" });
    }

    // Get user with cartItems
    const user = await User.findById(userId).populate('cartItems');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the cartId belongs to this user
    const ownsCart = user.cartItems.some(item => item._id.toString() === cartId);

    if (!ownsCart) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this cart item" });
    }

    // Update quantity
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { quantity: newQty },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, message: "Quantity updated successfully", updatedCart });

  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteCart = async (req, res) => {
  const { cartId } = req.body;
  const { userId } = req.user;

  try {
    if (!cartId || !userId) {
      return res.status(400).json({ success: false, message: "Invalid request data." });
    }

    // 1. Remove cartId from user's cartItems array
    await User.findByIdAndUpdate(userId, {
      $pull: { cartItems: cartId }
    });

    // 2. Delete the actual cart document
    await Cart.findByIdAndDelete(cartId);

    res.status(200).json({ success: true, message: "Item removed from cart." });
  } catch (error) {
    console.error("❌ deleteCart error:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

const cartItems = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing user ID' });
    }

    const user = await User.findById(userId)
      .populate({
        path: 'cartItems',
        populate: [
          {
            path: 'productId',
            // select: 'name price image'
          },
          {
            path: 'deliveryOptionId',
            // select: 'name price'
          }
        ]
      })
      .select('cartItems'); // fetch only cartItems from user

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Cart items fetched successfully',
      cartItems: user.cartItems,
    });

  } catch (error) {
    console.error('❌ Error fetching cart items:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const shipupdate = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { cartId, updatedDelivey } = req.body;

    // Input validation
    if (!userId || !cartId || !updatedDelivey) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, cartId, or updatedDelivey.'
      });
    }

    // Find the shipping method
    const shippingSelected = await Ship.findById(updatedDelivey);
    if (!shippingSelected) {
      return res.status(404).json({
        success: false,
        message: 'Selected shipping method not found.'
      });
    }

    // Find the cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found.'
      });
    }

    // Update shipping method
    cart.deliveryOptionId = shippingSelected._id;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate({ path: 'productId' })
      .populate({ path: 'deliveryOptionId' });

    res.status(200).json({
      success: true,
      message: 'Shipping method updated successfully.',
      updatedCart: updatedCart
    });
  } catch (error) {
    console.error("❌ Error updating shipping method:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating shipping method.',
      error: error.message
    });
  }
};

const ordering = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cartItems } = req.body;

    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid input." });
    }

    const orderTime = new Date();
    let totalCostCents = 0;
    const products = [];

    for (const item of cartItems) {
      const productObj = item.productId;
      const delivery = item.deliveryOptionId;

      if (!productObj || !delivery) continue;

      const estimatedDeliveryTime = new Date(
        orderTime.getTime() + delivery.days * 24 * 60 * 60 * 1000
      );

      const cost = (productObj.priceCents * item.quantity + delivery.priceCents) * 1.1;
      totalCostCents += Math.round(cost);

      products.push({
        product: productObj._id,
        quantity: item.quantity,
        estimatedDeliveryTime,
      });

    }
    await User.findByIdAndUpdate(userId, { $set: { cartItems: [] } });
    const cartItemIds = cartItems.map(item => item._id); // assuming these are Cart document IDs
    await Cart.deleteMany({ _id: { $in: cartItemIds } });
    const newOrder = await Order.create({
      userId,
      orderTime,
      totalCostCents,
      products,
    });

    const orderArray = await Order.find({ userId })
      .populate({
        path: 'products.product',
        select: 'name image priceCents rating' // only the fields you need
      });
    res.json({ success: true, message: 'Order Successfully', orderArray })

  } catch (error) {
    console.error("❌ Order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const orderdItems = async (req, res) => {
  const userId = req.user.userId;

  try {
    const Orders = await Order.find({ userId })
      .populate({
        path: 'products.product',
        select: 'name image priceCents rating' // only the fields you need
      }).sort({ createdAt: -1 }) // ⬅️ latest first

    res.json({
      success: true,
      message: 'Ordered Items Fetched Successfully',
      Orders,
    });
  } catch (error) {
    console.error("❌ Error fetching ordered items:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


export { addtoCart, updateQty, cartItems, ordering, shipupdate, orderdItems, deleteCart }