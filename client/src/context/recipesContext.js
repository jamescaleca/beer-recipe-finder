import React, { useEffect, useState, createContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const RecipesContext = createContext()

function RecipesContextProvider(props) {
  const [recipesData, setRecipesData] = useState([])
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])




  return (
    <RecipesContext.Provider value={{
      recipesData,
      setRecipesData,
      search, 
      setSearch, 
      searchData, 
      setSearchData
    }}>
      { props.children }
    </RecipesContext.Provider>
  )
}

export {RecipesContextProvider, RecipesContext}