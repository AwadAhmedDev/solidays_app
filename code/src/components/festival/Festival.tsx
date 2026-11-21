import styles from "../festival/Festival.module.css"
import { NavLink } from "react-router-dom"

// Les 4 rubriques du festival (comme sur solidays.org)
const TILES = [
  { img: "concert", label: "Concerts", w: 900, h: 450 },
  { img: "talk", label: "Talks", w: 600, h: 600 },
  { img: "association", label: "Associations", w: 900, h: 450 },
  { img: "exposition", label: "Expositions", w: 900, h: 450 },
]

function Festival() {
  return (
    <section className={styles.festival} aria-labelledby="festival-titre">
      <h2 id="festival-titre" className={styles.title}>
        Festival <span>d'intérêt public</span>
      </h2>

      <div className={styles.con}>
        {TILES.map((tile) => (
          <NavLink key={tile.img} className={styles.festivalcard} to="/festival">
            <img
              src={`/assets/img/${tile.img}.webp`}
              alt=""
              width={tile.w}
              height={tile.h}
              loading="lazy"
            />
            <h3>{tile.label}</h3>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

export default Festival
