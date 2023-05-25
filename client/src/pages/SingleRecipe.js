import React, { useContext, useEffect, useState } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import axios from "axios"

export default function SingleRecipe() {
  const {recipeId} = useParams()
  const [thisRecipe, setThisRecipe] = useState([])

  const location = useLocation()

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
  }, [recipeId])

  const search = location.state?.search || ""

  // const allIngredients = Object.keys(thisRecipe)
  //   .filter(key => {
  //     return key.indexOf("strIngredient") == 0
  //   })
  //   .reduce((newData, key) => {
  //     newData[key] = thisRecipe[key]
  //     return newData
  //   }, {})

  // const ingredientsNoEmptyValues = Object.values(allIngredients).filter(value => {
  //   return value !== ""
  // })

  // console.log(ingredientsNoEmptyValues)



  return (
    thisRecipe ? 
      <div >
        <h1 >{thisRecipe.strMeal}</h1>
        <Image style={{ "width": "24rem" }} src={thisRecipe.strMealThumb}></Image>
        
        <h2>Recipe</h2>
        
        <h4>Instructions:</h4>
        <p>{thisRecipe.strInstructions}</p>

        {/* <h4>Ingredients:</h4> */}

        {thisRecipe.strYoutube ? 
          <Button 
            style={{ "backgroundColor": "#D50000", "borderColor": "#E0E0E0" }} 
            href={thisRecipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
          >YouTube
          </Button>
          : null
        }

        <Button 
          href={thisRecipe.strSource} 
          target="_blank" 
          rel="noopener noreferrer"
        >Source
        </Button>
        {search ? 
          <Link
            to={`..?${search}`}
            relative="path"
            className="back-button"
          >
            Back to results
          </Link>
          : 
          <Link
            to={`../..`}
            relative="path"
            className="back-button"
          >
            Back to Home
          </Link> 
        }
      </div>
    : null
  )
}