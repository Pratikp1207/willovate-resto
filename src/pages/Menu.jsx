import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import FoodCard from "../components/FoodCard";
import "../styles/Menu.css";

function Menu({
  foods,
  deleteFood,
  editFood,
  loading,
  error
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const category = searchParams.get("category") || "All";

  // Unique categories
  const categories = [
    "All",
    ...new Set(
      foods.map((food) => food.category)
    )
  ];

  // Search + Category filter
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      food.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  return (
    <div className="menu-page">

      <h1>Menu</h1>

      {/* Search and Category */}
      <div className="menu-controls">

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            setSearchParams(
              selectedCategory === "All"
                ? {}
                : { category: selectedCategory }
            );
          }}
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* Loading */}
      {loading && (
        <p>Loading foods...</p>
      )}

      {/* Error */}
      {error && (
        <p>{error}</p>
      )}

      {/* No foods */}
      {!loading &&
        !error &&
        filteredFoods.length === 0 && (
          <p>No matching food found.</p>
        )}

      {/* Food Cards */}
      <div className="food-grid">

        {filteredFoods.map((food) => (
          <FoodCard
            key={food._id || food.id}
            food={food}
            deleteFood={deleteFood}
            editFood={editFood}
          />
        ))}

      </div>

    </div>
  );
}

export default Menu;
