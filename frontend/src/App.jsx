import React from 'react'

import "./App.css"
import "./index.css";
import Navigation from './components/Navigation'
import UserRoutes from './routes/UserRoutes'
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Navigation />
    <UserRoutes />
    <Footer />
    </>
  )
}

export default App


