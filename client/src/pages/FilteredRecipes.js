import React, { useContext } from "react"
import { RecipesContext } from "../context/recipesContext"

export default function FilteredRecipes() {
    const {searchResults} = useContext(RecipesContext)

    return (
      <div className={`-bg-primary container`}>
        <h1 style={{margin: 0, padding: 20 }} className={`text-center`}>Search Results</h1>
        <ul className={`search-res-ul tiles`}>{searchResults}</ul>
      </div>
    )
}