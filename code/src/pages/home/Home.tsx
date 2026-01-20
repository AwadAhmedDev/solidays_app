import ALaUne from "../../components/a_la_une/a_la_une";
import ArtistBanner from "../../components/artist/artist";
import Festival from "../../components/festival/Festival";
import Hero from "../../components/hero/Hero";
import Intro_Billetterie from "../../components/intro_billetterie/intro_billetterie";
import Intro_Programmation from "../../components/intro_programmation/intro_programmation";

export default function Home() {
  return (
      <>
    <Hero />
    <Intro_Programmation />
    <ArtistBanner />
    <Intro_Billetterie />
    <ALaUne />      
    <Festival/>

          {/* Home page content goes here */}

      </>

  )
}
