import React, { useContext, useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { RecipesContext } from "../context/recipesContext"
import MapRecipePreviews from "../components/MapRecipePreviews"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import axios from "axios"

export default function FilteredRecipes() {
  const [ recipes, setRecipes ] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryFilter = searchParams.get("category")
  const queryFilter = searchParams.get("q")
  console.log(queryFilter)

  console.log(categoryFilter)

  const getMealsByCategory = (cat) => {
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/filter.php?c=${cat}`)
      .then(res => {
        const results = res.data.meals.map(meal => meal)
        setRecipes(results)
      })
      .catch(err => console.log(err))
  }

  const getMealsBySearchQuery = (search) => {
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/search.php?s=${search}`)
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

  return (
    <div className={`-bg-primary container`}>
      <h1 style={{ margin: 0, padding: 20 }} className={`text-center`}>Search Results</h1>
      {recipes.length < 1 ?
        <h2>Sorry, we're having trouble retrieving your request. Please try again or check back later!
        </h2>
        : <MapRecipePreviews recipes={recipes} />
      }
    </div>
  )
}