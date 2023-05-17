import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { RecipesContext } from "../context/recipesContext"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import axios from "axios"

function RecipesList() {
  const { recipesData, setRecipesData } = useContext(RecipesContext)

  const getAllRecipes = () => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then(res => setRecipesData(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllRecipes()
  }, [recipesData])

  const allRecipes = recipesData.map(recipe => (
    <Link style={{ "text-decoration": "none" }} to={`/recipes/${recipe.id}`}>
      <Card style={{ "width": "18rem" }}>
        <Card.Img 
          variant="top"
          alt={recipe.name} 
          src={recipe.image_url}
          style={{ "width": "7rem" }}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text>{recipe.tagline}</Card.Text>
          <Card.Text>ABV: {recipe.abv}%</Card.Text>
          <Card.Text>IBUs: {recipe.ibu}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  ))

  return (
    <div className={`-bg-primary container`}>
      <h1 style={{margin: 0, padding: 20 }} className={`text-center`}>All Recipes</h1>
      <CardGroup>{allRecipes}</CardGroup>
    </div>
  )
}

export default RecipesList