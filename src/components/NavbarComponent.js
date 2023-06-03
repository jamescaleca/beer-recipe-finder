import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FoodIcon from "../assets/food.svg"
import { 
  Container, 
  Nav, 
  Navbar,
  NavDropdown,
  Form,
  Button
} from "react-bootstrap"
import axios from "axios"

function NavbarComponent() {
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  const getCategories = () => {
    axios
      .get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?c=list`)
      .then(res => {
        const results = res.data.meals.map(cat => cat.strCategory)
        setCategories(results)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getCategories()
  }, [])

  const mapCategories = categories.map(cat => (
    <NavDropdown.Item href={`/recipes?category=${cat}`} key={cat} variant="primary">
      {cat}
    </NavDropdown.Item>
  ))

  return (
    <Navbar sticky="top" bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img 
            id="food-icon"
            alt="FoodIcon" 
            src={FoodIcon} 
            style={{"width": "2rem"}}
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav 
            className="me-auto my-2 my-lg-0" 
            style={{ maxHeight: '20rem' }} 
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Categories">
              {mapCategories}
            </NavDropdown>
          </Nav>
          <Form className="">
            <Form.Group className="search-form my-2">
              <Form.Control 
                type="text" 
                placeholder="Search Recipes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
                style={{ border: "1px solid white"}}
                variant="primary"
                type="submit" 
                value="Search" 
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/search?q=${search}`)
                }}
              >Search
              </Button>{' '}
            </Form.Group>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent