import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecipesContextProvider } from './context/recipesContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecipesContextProvider>
      <App />
    </RecipesContextProvider>
  </React.StrictMode>
)