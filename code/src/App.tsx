import Navbar from "./components/navbar/Navbar"
import { Route, Routes, useLocation } from "react-router"
import { lazy, Suspense, useEffect } from "react"
import Festival from "./pages/weekend/weekend"
import MentionLegales from "./pages/mention_legale/MentionLegales"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"
import DemoBanner from "./components/demo_banner/DemoBanner"
import Billetterie from './pages/billetterie/billetterie'
import Programmation from './pages/programmation/programmation'
import ArtistPage from "./pages/artist/artist"
import AdminGuard from "./components/admin/AdminGuard"
import NotFound from "./pages/not_found/NotFound"

// Espace admin chargé à part : les visiteurs ne téléchargent pas son code (formulaires, validation)
const AdminHomepage = lazy(() => import("./pages/admin/adminHomepage"))
const AdminArtistForm = lazy(() => import("./pages/admin/admin_artist/artistCrudForm"))
const AdminArtistDelete = lazy(() => import("./pages/admin/admin_artist/delete"))
const AdminLogin = lazy(() => import("./pages/admin/login/AdminLogin"))

function App() {
  // Chaque nouvelle page s'ouvre en haut
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <DemoBanner />
      <Navbar />
      <main id="contenu">
        <Suspense fallback={<p className="sd-status">Chargement…</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programmation" element={<Programmation />} />
          <Route path="/festival" element={< Festival />} />
          <Route path="/billetterie" element={<Billetterie />} />
          <Route path="/mention_legale" element={<MentionLegales />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Espace admin : réservé à l'administrateur connecté */}
          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/artist-form/:id?" element={<AdminArtistForm />} />
            <Route path="/admin/artist-form-delete/:id?" element={<AdminArtistDelete />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
