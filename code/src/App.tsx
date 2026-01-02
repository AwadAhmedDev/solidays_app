
import Navbar from "./components/navbar/Navbar"
import {Route, Routes} from "react-router"
import Events from "./pages/evenement/Events"
import Festival from "./pages/festival/Festival"
import Billeterie from "./pages/billeterie/Billeterie"
import ArtistBanner from "./components/artistbanner/artistbanner"
import Hero from "./components/hero/Hero"
import MentionLegales from "./pages/mention_legale/MentionLegales"


function App() {

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/evenement" element={<Events />} />
        <Route path="/festival" element={< Festival/>} />
        <Route path="/billeterie" element={<Billeterie />} />
        <Route path="/mention_legale" element={<MentionLegales />} />
      </Routes>
      <ArtistBanner/>
    </div>
  )
}

export default App
