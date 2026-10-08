import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../services/categoryService";

import "../styles/Categories.css";

function Categories() {

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [editingId, setEditingId] = useState(null);


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

      }

    };

    fetchCategories();

  }, []);


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name.trim()) {

      alert(
        "Please enter category name"
      );

      return;
    }


    try {

      if (editingId) {

        const updatedCategory =
          await updateCategory(
            editingId,
            name
          );

        setCategories(
          (prevCategories) =>
            prevCategories.map(
              (category) =>
                category._id === editingId
                  ? updatedCategory
                  : category
            )
        );

        setEditingId(null);

      } else {

        const newCategory =
          await createCategory(name);

        setCategories(
          (prevCategories) => [
            newCategory,
            ...prevCategories
          ]
        );

      }

      setName("");

    } catch (error) {

      console.error(
        "Failed to save category:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to save category"
      );

    }

  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (category) => {

    setName(category.name);

    setEditingId(
      category._id
    );

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    try {

      await deleteCategory(id);

      setCategories(
        (prevCategories) =>
          prevCategories.filter(
            (category) =>
              category._id !== id
          )
      );

    } catch (error) {

      console.error(
        "Failed to delete category:",
        error
      );

    }

  };


  return (

    <div className="categories-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="categories-header">

        <div>

          <h1>
            Categories
          </h1>

          <p>
            Manage your restaurant food categories.
          </p>

        </div>

        <div className="category-count">

          <span>
            {categories.length}
          </span>

          <small>
            Categories
          </small>

        </div>

      </div>


      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      <div className="category-form-card">

        <h2>
          {editingId
            ? "Edit Category"
            : "Add New Category"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="category-form"
        >

          <div className="category-input-group">

            <label>
              Category Name
            </label>

            <input
              type="text"
              placeholder="e.g. Biryani, Pizza, Drinks"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          <div className="category-form-actions">

            <button
              type="submit"
              className="category-submit-btn"
            >

              {editingId
                ? "✓ Update Category"
                : "＋ Add Category"}

            </button>


            {editingId && (

              <button
                type="button"
                className="category-cancel-btn"
                onClick={() => {

                  setEditingId(null);
                  setName("");

                }}
              >

                Cancel

              </button>

            )}

          </div>

        </form>

      </div>


      {/* =========================
          CATEGORY LIST
      ========================= */}

      <div className="category-list-section">

        <div className="section-heading">

          <h2>
            All Categories
          </h2>

          <span>
            {categories.length} total
          </span>

        </div>


        {categories.length === 0 ? (

          <div className="no-categories">

            <div className="empty-icon">
              📂
            </div>

            <h3>
              No categories found
            </h3>

            <p>
              Add your first food category above.
            </p>

          </div>

        ) : (

          <div className="category-grid">

            {categories.map(
              (category) => (

                <div
                  className="category-card"
                  key={category._id}
                >

                  <div className="category-card-icon">
                    🍽️
                  </div>

                  <div className="category-info">

                    <h3>
                      {category.name}
                    </h3>

                    <p>
                      Food Category
                    </p>

                  </div>


                  <div className="category-actions">

                    <button
                      className="category-edit-btn"
                      onClick={() =>
                        handleEdit(category)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="category-delete-btn"
                      onClick={() =>
                        handleDelete(
                          category._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Categories;
