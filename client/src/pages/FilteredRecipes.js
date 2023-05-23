import React, { useContext, useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { RecipesContext } from "../context/recipesContext"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import axios from "axios"

export default function FilteredRecipes() {
  const [ recipes, setRecipes ] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryFilter = searchParams.get("category")
  const queryFilter = searchParams.get("q")
  console.log(queryFilter)

  console.log(searchParams)

  const getMealsByCategory = (cat) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
      .then(res => {
        const results = res.data.meals.map(meal => meal)
        setRecipes(results)
      })
      .catch(err => console.log(err))
  }

  const getMealsBySearchQuery = (search) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then(res => {
        const results = res.data.meals.map(meal => meal)
        setRecipes(results)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(categoryFilter) {
      getMealsByCategory(categoryFilter)
    }
    if(queryFilter) {
      getMealsBySearchQuery(queryFilter)
    }
  }, [categoryFilter, queryFilter])

  const searchResults = recipes.length > 0 ?
    recipes.map(recipe => (
      <Link 
        key={recipe.idMeal} 
        style={{ "textDecoration": "none" }} 
        to={`/recipes/${recipe.idMeal}`}
      >
        <Card style={{ "width": "18rem" }}>
          <Card.Img 
            variant="top"
            alt={recipe.idMeal} 
            src={recipe.strMealThumb}
            style={{ "width": "7rem" }}
          ></Card.Img>
          <Card.Body>
            <Card.Title>{recipe.strMeal}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    ))
    :
    <h3 className={`theme-text text-center`}>
      Sorry, looks like we have no recipes matching that food pairing.
    </h3>

  return (
    <div className={`-bg-primary container`}>
      <h1 style={{margin: 0, padding: 20 }} className={`text-center`}>Search Results</h1>
      <CardGroup>{searchResults}</CardGroup>
    </div>
  )
}