import React,{useState} from "react";
import CategoryChild from "./child/category-child";

function SelectCategory({ categories, setFormData,formData }) {
  const [selectActive, setSelectActive] = useState(false);
    const [getSubcategory, setGetSubCategory] = useState(false);
    
    const [categoryName, setCategoryName] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');

  return (
    <div className="relative">
      <div
        onClick={() => !getSubcategory && setSelectActive(!selectActive)}
        className="border border-gray-300 py-2 px-4  cursor-pointer flex flex-row justify-between rounded-md items-center"
      >
        <span className="text-md text-gray-600">
          {categoryName !== "" && subCategoryName !== ''
            ? `${categoryName} -> ${subCategoryName}`
            : "Pilih Kategori"}
        </span>
        {selectActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
      {selectActive && (
        <div className="absolute w-full">
          <CategoryChild
            selectCategory={setSelectActive}
            formData={formData}
            getSubcategory={getSubcategory}
            setGetSubCategory={setGetSubCategory}
            categories={categories}
            setFormData={setFormData}
            setCategoryName={setCategoryName}
            setSubCategoryName={setSubCategoryName}
          />
        </div>
      )}
    </div>
  );
}

export default SelectCategory;
