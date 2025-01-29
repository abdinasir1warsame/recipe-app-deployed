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
import ViewAiRecipe from './pages/viewAiRecipe';
import ProtectedRoute from './context/protectedRoutes'; // Import the ProtectedRoute component

const App = () => {
  return (
    <div className="flex flex-col bg-gray-100">
      <AuthContextProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <NewAllRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes/recipe"
              element={
                <ProtectedRoute>
                  <NewRecipePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/generate-recipe"
              element={
                <ProtectedRoute>
                  <AiPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-recipe"
              element={
                <ProtectedRoute>
                  <ViewAiRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/planner"
              element={
                <ProtectedRoute>
                  <MealPlanner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileSection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shopping-list"
              element={
                <ProtectedRoute>
                  <ShoppingListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cookbook"
              element={
                <ProtectedRoute>
                  <CookBook />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
