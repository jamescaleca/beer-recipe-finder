import React, { useContext } from "react"
import { RecipesContext } from "../context/recipesContext"

function RecipesList() {
    const {allRecipes} = useContext(RecipesContext)

    return (
      <div className={`-bg-primary container`}>
        <h1 style={{margin: 0, padding: 20 }} className={`text-center`}>All Recipes</h1>
        <ul className={`-all-rec-ul tiles`}>{allRecipes}</ul>
      </div>
    )
}

export default RecipesList