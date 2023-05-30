import React, { useState } from "react"
import { useNavigate, useLoaderData, defer } from "react-router-dom"
import "../css/styles.css"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import MapRecipePreviews from "../components/MapRecipePreviews"

async function getCategories() {
  const res = await fetch(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?c=list`)
  if(!res.ok) {
    throw new Error(`${res.status}: Failed to fetch categories`)
  }
  const data = await res.json()
  const dataMap = data.meals.map(cat => cat.strCategory)
  return dataMap
}
  

async function getLatest() {
  const res = await fetch(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/latest.php`)
  if(!res.ok) {
    throw new Error(`${res.status}: Failed to fetch latest meals`)
  }
  const data = await res.json()
  const dataMap = data.meals.map(meal => meal)
  return dataMap
}

export async function loader() {
  const categoryPromise = await getCategories()
  const latestPromise = await getLatest()
  return defer({categories: categoryPromise, latestMeals: latestPromise})
}

function Home() {
  const [search, setSearch] = useState("")

  const { categories, latestMeals } = useLoaderData()

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
            navigate(`/search?q=${search}`)
          }}
        >Search
        </Button>{' '}
      </form>

      <h3>Check out our latest recipes:</h3>
      <MapRecipePreviews recipes={latestMeals} search=""/>
    </div>
  )
}

export default Home