import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import axios from "axios"

export default function SingleRecipe() {
  const {recipeId} = useParams()
  const [thisRecipe, setThisRecipe] = useState([])

  console.log(recipeId)

  useEffect(() => {
    const getThisRecipe = () => {
      axios 
        .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=${recipeId}`)
        .then(res => {
          setThisRecipe(res.data.meals[0])
        })
        .catch(error => console.log(error))
    }
    getThisRecipe()
  }, [])

  return (
    thisRecipe ? 
      <div >
        <h1 >{thisRecipe.strMeal}</h1>
        <Image style={{ "width": "24rem" }} src={thisRecipe.strMealThumb}></Image>
        
        <h2>Recipe</h2>
        
        <h4>Instructions:</h4>
        <p>{thisRecipe.strInstructions}</p>

        <h4>Ingredients:</h4>

        <a href={thisRecipe.strSource}>Source</a>
        <Button variant="secondary" size="sm">
            Back to results
        </Button>{' '}
      </div>
    : null
  )
}