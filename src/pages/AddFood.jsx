import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createFood } from "../services/foodService";
import { getCategories } from "../services/categoryService";

import "../styles/AddFood.css";

function AddFood({ addFood }) {

  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // =========================
  // GET CATEGORIES
  // =========================

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const data = await getCategories();

        setCategories(data);

      } catch (error) {

        console.error(
          "Failed to fetch categories:",
          error
        );

        setError(
          "Failed to load categories"
        );

      }

    };

    fetchCategories();

  }, []);


  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // Food validation

    if (!foodName.trim()) {

      setError(
        "Please enter food name"
      );

      return;
    }


    // Category validation

    if (!category) {

      setError(
        "Please select a category"
      );

      return;
    }


    // Price validation

    if (
      !price ||
      Number(price) <= 0
    ) {

      setError(
        "Please enter a valid price"
      );

      return;
    }


    try {

      setLoading(true);


      const newFood = {

        name: foodName.trim(),

        category: category,

        price: Number(price),

        image:
          image.trim() ||
          "https://placehold.co/300x200"

      };


      const food =
        await createFood(newFood);


      console.log(
        "Food added:",
        food
      );


      // Update App state

      addFood(food);


      // Clear form

      setFoodName("");
      setCategory("");
      setPrice("");
      setImage("");


      // Go to Menu

      navigate("/menu");


    } catch (error) {

      console.error(
        "Failed to add food:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to add food"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="add-food-page">

      <div className="add-food-container">

        {/* Header */}

        <div className="add-food-header">

          <div>
            <h1>Add Food</h1>

            <p>
              Add a new food item to your restaurant menu.
            </p>
          </div>

          <span className="add-food-icon">
            🍽️
          </span>

        </div>


        {/* Error */}

        {error && (

          <p className="error-message">
            {error}
          </p>

        )}


        {/* Form */}

        <form
          className="add-food-form"
          onSubmit={handleSubmit}
        >


          {/* FOOD NAME */}

          <div className="form-group">

            <label>
              Food Name
            </label>

            <input
              type="text"
              placeholder="Enter food name"
              value={foodName}
              onChange={(e) =>
                setFoodName(e.target.value)
              }
            />

          </div>


          {/* CATEGORY */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="">
                Select Category
              </option>

              {categories.map(
                (item) => (

                  <option
                    key={item._id}
                    value={item.name}
                  >
                    {item.name}
                  </option>

                )
              )}

            </select>

          </div>


          {/* PRICE */}

          <div className="form-group">

            <label>
              Price
            </label>

            <div className="price-input">

              <span>₹</span>

              <input
                type="number"
                placeholder="Enter price"
                min="1"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

            </div>

          </div>


          {/* IMAGE */}

          <div className="form-group">

            <label>
              Image URL
            </label>

            <input
              type="url"
              placeholder="https://example.com/food.jpg"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
            />

            <small>
              Leave empty to use a default image.
            </small>

          </div>


          {/* SUBMIT */}

          <button
            className="add-food-btn"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Adding Food..."
              : "➕ Add Food"}

          </button>

        </form>

      </div>

    </div>

  );
}

export default AddFood;
