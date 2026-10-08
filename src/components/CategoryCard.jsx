import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../services/categoryService";


function Categories() {

  const [categories, setCategories] =
    useState([]);

  const [categoryName, setCategoryName] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editingName, setEditingName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================
  // GET CATEGORIES
  // =========================

  useEffect(() => {
    let cancelled = false;

    getCategories()
      .then((data) => {
        if (!cancelled) {
          setCategories(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);

        if (!cancelled) {
          setError("Failed to load categories");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };

  }, []);


  // =========================
  // CREATE CATEGORY
  // =========================

  const handleAddCategory =
    async (e) => {

      e.preventDefault();

      if (!categoryName.trim()) {

        alert(
          "Please enter category name"
        );

        return;

      }


      try {

        const newCategory =
          await createCategory({
            name:
              categoryName.trim()
          });


        setCategories(
          (prevCategories) => [
            ...prevCategories,
            newCategory
          ]
        );


        setCategoryName("");

      } catch (error) {

        console.error(
          "Failed to create category:",
          error
        );

        alert(
          error.response?.data?.message ||
          "Failed to create category"
        );

      }

    };


  // =========================
  // START EDIT
  // =========================

  const handleEdit =
    (category) => {

      setEditingId(
        category._id
      );

      setEditingName(
        category.name
      );

    };


  // =========================
  // UPDATE CATEGORY
  // =========================

  const handleUpdate =
    async (id) => {

      if (!editingName.trim()) {

        alert(
          "Category name is required"
        );

        return;

      }


      try {

        const updatedCategory =
          await updateCategory(
            id,
            {
              name:
                editingName.trim()
            }
          );


        setCategories(
          (prevCategories) =>
            prevCategories.map(
              (category) =>
                category._id === id
                  ? updatedCategory
                  : category
            )
        );


        setEditingId(null);

        setEditingName("");

      } catch (error) {

        console.error(
          "Failed to update category:",
          error
        );

        alert(
          "Failed to update category"
        );

      }

    };


  // =========================
  // DELETE CATEGORY
  // =========================

  const handleDelete =
    async (id) => {

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

        alert(
          "Failed to delete category"
        );

      }

    };


  if (loading) {

    return (
      <div>
        <h2>
          Loading categories...
        </h2>
      </div>
    );

  }


  return (

    <div>

      <h1>
        Categories
      </h1>


      {error && (
        <p>
          {error}
        </p>
      )}


      {/* =========================
          ADD CATEGORY
      ========================= */}

      <form
        onSubmit={
          handleAddCategory
        }
      >

        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(
              e.target.value
            )
          }
        />


        <button type="submit">
          Add Category
        </button>

      </form>


      <hr />


      {/* =========================
          CATEGORY LIST
      ========================= */}

      {categories.length === 0 ? (

        <p>
          No categories found
        </p>

      ) : (

        categories.map(
          (category) => (

            <div
              key={category._id}
            >

              {editingId ===
              category._id ? (

                <>
                  <input
                    type="text"
                    value={
                      editingName
                    }
                    onChange={(e) =>
                      setEditingName(
                        e.target.value
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      handleUpdate(
                        category._id
                      )
                    }
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {

                      setEditingId(
                        null
                      );

                      setEditingName("");

                    }}
                  >
                    Cancel
                  </button>
                </>

              ) : (

                <>
                  <span>
                    {category.name}
                  </span>

                  {" "}

                  <button
                    onClick={() =>
                      handleEdit(
                        category
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        category._id
                      )
                    }
                  >
                    Delete
                  </button>
                </>

              )}

              <hr />

            </div>

          )
        )

      )}

    </div>

  );

}


export default Categories;
