import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from "./components/navbar/Navbar"
import {Route, Routes} from "react-router"
import Events from "./pages/evenement/Events"
import Festival from "./pages/festival/Festival"
import Billeterie from "./pages/billeterie/Billeterie"
import MentionLegales from "./pages/mention_legale/MentionLegales"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"


function App() {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evenement" element={<Events />} />
        <Route path="/festival" element={< Festival/>} />
        <Route path="/billeterie" element={<Billeterie />} />
        <Route path="/mention_legale" element={<MentionLegales />} />
      </Routes>
    
       <Footer />
    </div>
  )
}

export default App
