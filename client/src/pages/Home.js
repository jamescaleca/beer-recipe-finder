import React, { useContext, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../css/styles.css"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import MapRecipePreviews from "../components/MapRecipePreviews"
import axios from "axios"

function Home() {
  const [categories, setCategories] = useState([])
  const [latestMeals, setLatestMeals] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
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
    setLoading(true)
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/latest.php`)
      .then(res => {
        const strLatestMeals = res.data.meals.map(meal => meal)
        setLatestMeals(strLatestMeals)
        setLoading(false)
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
      {loading === true ? 
        <div className="loader-container">
          <span className="loader"></span>
        </div>
        :
        <ButtonGroup>{mapCategories}</ButtonGroup>
      }
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
      {loading ?
        <div className="loader-container">
          <span className="loader"></span>
        </div>
        : 
        <>
          <h3>Check out our latest recipes:</h3>
          <MapRecipePreviews recipes={latestMeals} search=""/>
        </>
      }
    </div>
  )
}

export default Home