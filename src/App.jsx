import { Routes, Route } from 'react-router-dom';

import NewRecipePage from './pages/recipe';

import NewAllRecipes from './pages/allRecipes';
import Layout from './layout/layout';
import AiPage from './pages/generateAiPage';
import MealPlanner from './pages/mealPlanner';
import ProfileSection from './pages/profilePage';
import LandingPage from './pages/landingPage';
import Login from './pages/loginPage';

import { AuthContextProvider } from './context/AuthContext';
import SearchPage from './pages/searchPage';
import CookBook from './pages/cookBook';
import ShoppingListPage from './pages/shoppingList';
const App = () => {
  return (
    <div className="flex flex-col   bg-gray-100">
      <AuthContextProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/recipes" element={<NewAllRecipes />} />
            <Route path="/recipes/recipe" element={<NewRecipePage />} />
            <Route path="/generate-recipe" element={<AiPage />} />
            <Route path="/planner" element={<MealPlanner />} />
            <Route path="/profile" element={<ProfileSection />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
            <Route path="/cookbook" element={<CookBook />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
