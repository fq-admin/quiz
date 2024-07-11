// import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Quiz from './Components/Quiz'
import Home from './Components/Home'
import GlobalState from './Contexts/GlobalState'

function App() {
  return (
    <GlobalState>
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
    </GlobalState>
  )
}

export default App