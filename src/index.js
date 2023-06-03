import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom"
import Layout from "./components/Layout"
import Error from "./components/Error"
import NotFound from "./pages/NotFound"
import Home, { loader as homeLoader } from "./pages/Home"
import FilteredRecipes from "./pages/FilteredRecipes"
import SingleRecipe from "./pages/SingleRecipe"
import "./css/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route 
      index 
      element={<Home />} 
      errorElement={<Error />}
      loader={homeLoader} 
    />
    <Route 
      path="recipes"
      element={<FilteredRecipes />}
    />
    <Route 
      path="recipes/:recipeId" 
      element={<SingleRecipe />}
    />
    <Route 
      path="search" 
      element={<FilteredRecipes />}
    />
    <Route 
      path="*"
      element={<NotFound />}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
)