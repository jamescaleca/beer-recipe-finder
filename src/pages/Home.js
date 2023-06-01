import React, { useState } from "react"
import { useNavigate, useLoaderData, defer } from "react-router-dom"
import "../css/styles.css"
import { Button, Form, Row, Col } from "react-bootstrap"
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
      <h1 className={`text-center`}>Welcome to Recipe Finder!</h1>
      <h3 className={`text-center`}>Search for a recipe by name</h3>
      <Form>
        <Form.Group as={Row} className="my-2">
          {/* <input 
            className={`search-input`}
            type="text" 
            placeholder="Beef Wellington"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input> */}
          <Col sm={8}>
            <Form.Control 
              type="text" 
              placeholder="Beef Wellington"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col sm={2}>
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
          </Col>
        </Form.Group>
      </Form>
      <h3 className={`text-center`}>Or filter recipes by category</h3>

      <div className="btn-group-cont">
        {mapCategories}
      </div>
      

      <h3 className="text-center">And here are our latest recipes</h3>
      <MapRecipePreviews recipes={latestMeals} search=""/>
    </div>
  )
}

export default Home