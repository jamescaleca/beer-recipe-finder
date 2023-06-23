import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props){
  const { children, redirectTo, token } = props
  return token ? children : <Navigate to={redirectTo} />
}