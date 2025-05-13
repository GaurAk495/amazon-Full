import Ship from '../model/deliveryModel.js';

const shipOption = async (req, res) => {
    try {
        const deliveryOptions = await Ship.find()
        res.status(200).json({
            success: true,
            message: 'Delivery options fetched successfully.',
            count: deliveryOptions.length,
            deliveryOptions
        });
    } catch (error) {
        console.error("❌ Error fetching delivery options:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch delivery options.',
            error: error.message
        });
    }
};

export { shipOption };
