import Navbar from "./components/navbar/Navbar"
import { Route, Routes } from "react-router"
import Festival from "./pages/weekend/weekend"
import MentionLegales from "./pages/mention_legale/MentionLegales"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"
import Billetterie from './pages/billetterie/billetterie'
import Programmation from './pages/programmation/programmation'
import ArtistPage from "./pages/artist/artist"
import AdminArtistForm from "./pages/admin/artist/form"
import AdminArtistDelete from "./pages/admin/artist/delete"
import AdminHomepage from "./pages/admin/homepage_admin"



function App() {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programmation" element={<Programmation />} />
        <Route path="/festival" element={< Festival />} />
        <Route path="/billetterie" element={<Billetterie />} />
        <Route path="/mention_legale" element={<MentionLegales />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
         {/* <Route path="/artist/:id" element={<ArtistPage />} /> */}
        <Route path="/admin" element={<AdminHomepage />} />
        <Route path="/admin/form/:id?" element={<AdminArtistForm params={{
          id: 0
        }} />} />
        <Route path="/admin/delete" element={<AdminArtistDelete params={{
          id: 0
        }} />} />
       
      </Routes>
     

      <Footer />
    
    </div>
  )
}

export default App
