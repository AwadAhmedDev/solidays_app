// import { Route, Routes } from 'react-router'
import Navbar from './components/navbar/Navbar'
import Festival from './pages/festival/Festival'
import Billeterie from './pages/billeterie/Billeterie'
import { Route, Routes } from 'react-router'
import Events from './pages/evenement/Events'
import Footer from './pages/footer/Footer'
import Hero from './components/hero/Hero'



function App() {

  return (
    <div className='container'>
      <Navbar />
      <Hero/>
      <Routes>
        <Route path="/evenement" element={<Events />} />
        <Route path="/festival" element={<Festival />} />
        <Route path="/billeterie" element={<Billeterie />} />
      </Routes>
     <Footer />
    </div>
  )
}

export default App
