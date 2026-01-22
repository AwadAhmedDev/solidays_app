import styles from "../festival/Festival.module.css"
import { NavLink } from "react-router-dom"

function Festival() {
    return (
      <>
            <div className={styles.festival}>
                <h2>FESTIVAL</h2>
                <p>D'INTÉRÊT PUBLIC</p>

                <div className={styles.con}>
                    <div className={styles.festivalcon}>
                        <NavLink
                        className={styles.festivalcard}    to={"/"}>
                            <img src="../../../assets/img/concert.jpg" alt="concert image" /> 
                            <h3>Concert</h3>
                        </NavLink>
                    </div>

                    <div className={styles.festivalcon}>
                        <NavLink to={"/"}
                         className={styles.festivalcard}>
                            <img src="../../../assets/img/talk.jpg" alt="talk image" />
                            <h3>Talk</h3>
                        </NavLink>
                    </div>
                </div>

                <div className={styles.con}>
                    <div className={styles.festivalcon}>
                        <NavLink  className={styles.festivalcard}
                            to={"/"}>
                            <img src="../../../assets/img/association.jpg" alt="concert image" />
                            <h3>Association</h3>
                         </NavLink>
                    </div>

                    <div className={styles.festivalcon}>
                        <NavLink to={"/"}
                         className={styles.festivalcard}>
                            <img src="../../../assets/img/exposition.jpg
                            " alt="talk image" />
                            <h3>Expositions</h3>
                        </NavLink>
                    </div>
                </div>
    
            </div>
     </>
  )
}

export default Festival
