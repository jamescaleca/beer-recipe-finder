import React, { useContext, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { RecipesContext } from "../context/recipesContext"
import "../css/styles.css"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import MapRecipePreviews from "../components/MapRecipePreviews"
import axios from "axios"

function Home() {
  const { search, setSearch, searchData, setSearchData } = useContext(RecipesContext)

  const [categories, setCategories] = useState([])
  const [latestMeals, setLatestMeals] = useState([])
  
  const getCategories = () => {
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?c=list`)
      .then(res => {
        const strCategories = res.data.meals.map(cat => cat.strCategory)
        setCategories(strCategories)
      })
      .catch(err => console.log(err))
  }

  const getLatest = () => {
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/latest.php`)
      .then(res => {
        const strLatestMeals = res.data.meals.map(meal => meal)
        setLatestMeals(strLatestMeals)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getCategories()
    getLatest()
  }, [])

  const mapCategories = categories.map(cat => (
    <Button href={`/recipes?category=${cat}`} key={cat} variant="primary">
      {cat}
    </Button>
  ))

  const navigate = useNavigate()

  return (
    <div className="split">
      <h1 className={`theme-text text-center`}>Welcome</h1>
      <h3>Search for recipe by category:</h3>
      <ButtonGroup>{mapCategories}</ButtonGroup>
      <h3 className={`theme-text text-center`}>Search for a recipe:</h3>
      <form className={`form-search-bar text-center`}>
        <input 
          className={`search-input`}
          type="text" 
          placeholder="Beef Wellington"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <br/>
        <Button 
          variant="primary"
          type="submit" 
          value="Search" 
          onClick={(e) => {
            e.preventDefault()
            // filterRecipes()
            navigate(`/search?q=${search}`)
          }}
        >Search
        </Button>{' '}
      </form>
      {latestMeals.length < 1 ?
        <h2>Sorry, we're having trouble retrieving our latest recipes! Please select a category or type into the search bar to browse.
        </h2>
        : 
        <>
          <h2>Check out our latest recipes:</h2>
          <MapRecipePreviews recipes={latestMeals} search=""/>
        </>
      }
    </div>
  )
}

export default Home