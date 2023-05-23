import React, { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { RecipesContext } from "../context/recipesContext"
import "../css/styles.css"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import axios from "axios"

function Home() {
  const { search, setSearch, searchData, setSearchData} = useContext(RecipesContext)

  const [categories, setCategories] = useState([])
  
  const getCategories = () => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then(res => {
        const strCategories = res.data.meals.map(cat => cat.strCategory)
        setCategories(strCategories)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getCategories()
  }, [])

  const mapCategories = categories.map(cat => (
    <Button href={`/recipes?category=${cat}`} key={cat} variant="primary">
      {cat}
    </Button>
  ))

  const navigate = useNavigate()

  return (
    <div className="split">
      <h2 className={`theme-text text-center`}>Welcome</h2>
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
        <hr/>
        <Link 
          to="/recipes" 
          className={`all-recipes-button`}
        >See all recipes
        </Link>
      </form>
    </div>
  )
}

export default Home