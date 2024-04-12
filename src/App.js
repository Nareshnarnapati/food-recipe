import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Allrecipe from './components/Allfoodrecipe';


import RecipeDetails from './components/RecipedetailsCard';
import LoginForm from './components/Login';


function App() {
  return (
    <Router>
      <div>
     
        <Routes>
        <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/home" element={<Allrecipe />} />
          <Route exact path="/recipeDetails" element={<RecipeDetails/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
