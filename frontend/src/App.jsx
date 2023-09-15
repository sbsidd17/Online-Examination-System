import React from 'react'

import "./App.css"
import "./index.css";
import Navigation from './components/Navigation'
import UserRoutes from './routes/UserRoutes'

function App() {
  return (
    <>
    <Navigation />
      <UserRoutes />
    </>
  )
}

export default App


