import Product from '../model/productModel.js'

const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Product fetching error", details: err.message });
    }
};


export { fetchProducts }