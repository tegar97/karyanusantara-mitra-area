import React, { useState, useEffect } from "react";

function CategoryChild({
  formData,
  setFormData,
  getSubcategory,
  categories,
  setGetSubCategory,
  selectCategory,
  setCategoryName,
  setSubCategoryName,
}) {
  const [categoryIdState, setCategoryId] = useState();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const category = [];
    categories.data.map((categoryData) => {
      return categoryData.sub_category.find((categoryId) => {
        if (categoryId.category_id === categoryIdState) {
          category.push(categoryId);
        }
      });
    });
    setSubCategories(category);
  }, [categoryIdState]);

  const getCategoryId = (id, name) => {
    setGetSubCategory(true);
    setCategoryId(id);

    setFormData({ ...formData, category_id: id });
    setFormData({
      ...formData,
      category_id: id,
    });
      setCategoryName(name);
  };

  const subCategoryId = (id,name) => {
    setFormData({ ...formData, subcategory_id: id });
    setGetSubCategory(false);
      selectCategory(false);
      setSubCategoryName(name)
    
  };
  console.log(subCategories);
  return (
    <div className={`${getSubcategory === true && "grid grid-cols-2"}`}>
      <div
        className="top-10  bg-white border border-gray-300 w-full py-2 px-4 "
        style={{ borderRadius: "0px 0px 10px 10px" }}
      >
        <ul style={{ maxHeight: 218 }} className="overflow-auto">
          {categories.data.map((data) => {
            return (
              <li
                key={data.id}
                onClick={() => getCategoryId(data.id,data.categoryName)}
                className={`${
                  categoryIdState === data.id && "bg-gray-100"
                }  py-2 px-2 rounded-md hover:bg-gray-100 flex flex-row justify-between`}
              >
                <span>{data.categoryName}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />{" "}
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
      {getSubcategory && (
        <div
          className="top-10  bg-white border border-gray-300 w-full py-2 px-4 cursor-pointer"
          style={{ borderRadius: "0px 0px 10px 10px" }}
        >
          <ul style={{ maxHeight: 218 }} className="overflow-auto">
            {subCategories.map((data) => {
              return (
                <li
                  style={{ maxHeight: 218 }}
                  key={data.id}
                  onClick={() => subCategoryId(data.id,data.subCategoryName)}
                  className="py-2 px-2 rounded-md overflow-auto hover:bg-gray-100 flex flex-row justify-between"
                >
                  {data.subCategoryName}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryChild;
