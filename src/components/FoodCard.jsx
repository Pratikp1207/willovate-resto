import { useState } from "react";

function FoodCard({ food, deleteFood, editFood }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: food.name,
    category: food.category,
    price: food.price,
    image: food.image
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const foodId = food._id || food.id;

    editFood(foodId, {
      ...formData,
      price: Number(formData.price)
    });

    setIsEditing(false);
  };

  /* =========================
     EDIT MODE
  ========================= */

  if (isEditing) {
    return (
      <div className="food-card edit-card">

        <div className="edit-header">
          <h3>Edit Food</h3>
          <span>✏️</span>
        </div>

        <label>Food Name</label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food name"
        />

        <label>Category</label>

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <label>Price</label>

        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <label>Image URL</label>

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <div className="food-actions edit-actions">

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>

        </div>

      </div>
    );
  }

  /* =========================
     NORMAL CARD
  ========================= */

  return (
    <div className="food-card">

      <div className="food-image-container">

        <img
          src={
            food.image &&
            !food.image.includes("via.placeholder")
              ? food.image
              : "https://placehold.co/300x200"
          }
          alt={food.name}
        />

      </div>

      <div className="food-card-content">

        <h2>{food.name}</h2>

        <p className="food-category">
          {food.category}
        </p>

        <p className="food-price">
          ₹{food.price}
        </p>

        <div className="food-actions">

          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              deleteFood(food._id || food.id)
            }
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;
