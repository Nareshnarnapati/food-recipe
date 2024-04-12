import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import RecipeDetails from "../RecipedetailsCard";
import "./index.css";
import Navbar from "../Header";

const Allrecipe = () => {
  const [productsList, setProductsList] = useState([]);
  const [searchImg, setSearchImg] = useState("");
  const [originalProductsList, setOriginalProductsList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getProducts = async () => {
      const app_id = "c2928d27";
      const app_key = "85ddcf1041e9a8f3b52d5af6725d0eb5";
      const recipe_name = "chicken";
      const url = `https://api.edamam.com/search?q=${recipe_name}&app_id=${app_id}&app_key=${app_key}&from=0&to=30`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProductsList(data.hits);
        setOriginalProductsList(data.hits);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchImg(event.target.value);
    if (event.target.value === "") {
      setProductsList(originalProductsList);
    } else {
      const filteredList = originalProductsList.filter((product) =>
        product.recipe.label.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setProductsList(filteredList);
    }
  };

  const handleRecipeClick = (recipe, event) => {
    const rect = event.target.getBoundingClientRect();
    const clickX = event.clientX;
    const clickY = event.clientY;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const positionX = clickX - rect.left + scrollX;
    const positionY = clickY - rect.top + scrollY;
  
    setSelectedRecipe(recipe);
    setClickPosition({ x: positionX, y: positionY });
  };
  

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Navbar/>
      <h1 className="head">
        Discover Our Recipes
      </h1>
      <div className="flex-button">
        <input
          type="search"
          value={searchImg}
          placeholder="Search"
          onChange={handleSearchChange}
          className="search"
        />
        <button className="search-button">
          <img
            src="https://i.ibb.co/k6c9Kq5/icons8-search-48.png"
            alt="search-icon"
            className="search-icon"
          />
        </button>
      </div>
      <div className="products-list">
        {productsList.map((product) => (
          <ProductCard 
            key={product.recipe.uri} 
            productData={product.recipe} 
            onClick={(event) => handleRecipeClick(product.recipe, event)} 
          />
        ))}
      </div>
      {selectedRecipe && (
        <RecipeDetails 
          selectedRecipe={selectedRecipe} 
          onClose={closeRecipeDetails} 
          position={clickPosition} 
        />
      )}
    </div>
  );
};

export default Allrecipe;
