const Food = require("../models/Food");

const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();

        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch foods",
            error: error.message
        });
    }
};

const createFood = async (req, res) => {
    try {
        const { name, category, price, image } = req.body;

        const food = await Food.create({
            name,
            category,
            price,
            image
        });

        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create food",
            error: error.message
        });
    }
};
const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, image } = req.body;

        const food = await Food.findByIdAndUpdate(
            id,
            {
                name,
                category,
                price,
                image
            },
            { new: true }
        );

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        res.status(200).json(food);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update food",
            error: error.message
        });
    }
};
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    res.status(200).json({
      message: "Food deleted successfully",
      food
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete food",
      error: error.message
    });
  }
};

module.exports = {
    getFoods,
    createFood,
    updateFood,
    deleteFood
};