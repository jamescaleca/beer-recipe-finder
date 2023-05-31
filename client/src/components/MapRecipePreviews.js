import React from "react"
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

export default function MapRecipePreviews(props) {
  const { recipes, search } = props

  const mapRecipes = recipes.map(recipe => (
    <Link 
      key={recipe.idMeal} 
      style={{ "textDecoration": "none" }} 
      to={`/recipes/${recipe.idMeal}`}
      state={{search: search.toString()}}
    >
      <Card style={{ "width": "18rem", "height": "14rem" }}>
        <Card.Img 
          variant="top"
          alt={recipe.idMeal} 
          src={`${recipe.strMealThumb}/preview`}
          style={{ "width": "7rem" }}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{recipe.strMeal}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  ))
  return (
    <CardGroup>{mapRecipes}</CardGroup>
  )
}