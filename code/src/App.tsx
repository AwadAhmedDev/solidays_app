import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./components/navbar/Navbar"
import {Route, Routes} from "react-router"
import Events from "./pages/evenement/Events"
import Festival from "./pages/festival/Festival"
import Billeterie from "./pages/billeterie/Billeterie"


function App() {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/evenement" element={<Events />} />
        <Route path="/festival" element={< Festival/>} />
        <Route path="/billeterie" element={<Billeterie />} />
      </Routes>
    </div>
  )
}

export default App
