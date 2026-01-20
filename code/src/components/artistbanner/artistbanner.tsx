import styles from "./artistbanner.module.css"
import { NavLink } from "react-router"
// import bigflo from "../../assets/bigflo_oli.jpg"
// import gims from "../../assets/gims.jpg"
// import l2b from "../../assets/l2b.jpg"
// import inocasablanca from "../../assets/inocasablanca.jpg"
// import lamano from "../../assets/lamano.jpg"
// import mosimann from "../../assets/mosimann.jpg"
// import nicomoreno from "../../assets/nicomoreno.jpg"
import orelsan from "../../../public/assets/img/orelsan.jpg"
// import rvfleuse from "../../assets/rvfleuse.jpg"
// import zaralarsson from "../../assets/zaralarsson.jpg"

import ApiArtistService from "../../services/api_artist_service";
import { useEffect, useState } from "react";
import type { Artist } from "../../../models/artist";
import ArtistListItem from "../artistListItem/ArtistListItem";
// import ArtistListItem from "../artistListItem/ArtistListItem"



// const artists = [
//     { name: "BIGFLO & OLI", image: bigflo },
//     { name: "GIMS", image: gims },
//     { name: "INO CASABLANCA", image: inocasablanca },
//     { name: "L2B", image: l2b },
//     { name: "LA MANO 1.9", image: lamano },
//     { name: "LA RVFLEUSE", image: rvfleuse },
//     { name: "MOSIMANN", image: mosimann },
//     { name: "NICO MORENO", image: nicomoreno },
//     { name: "ORELSAN", image: orelsan },
//     { name: "ZARA LARSSON", image: zaralarsson }
// ];



const ArtistBanner = () => {

    const [artists, setArtists] = useState<Artist[]>([])

    useEffect(() => {
        new ApiArtistService().selectAll().then((response) => {
            setArtists(response.data as Artist[]);
            console.log(response.data);
        });
    }, [])

    // default background = orelsan
    const [bg, setBg] = useState(orelsan);

    return (
        <div className={styles.artistbanner}
            style={{ backgroundImage: `url(/img/${bg})` }}
        >

            <ul className={styles.artistlist}>
                {artists?.map((artist) => (
                    <li>
                        <ArtistListItem artist={artist} setBg={setBg} key={artist.name} />
                    </li>
                ))}
                <li>
                    <NavLink className={styles.link} to="/concert"> & MANY MORE </NavLink>
                </li>
            </ul>
        </div>

    );
};

export default ArtistBanner;

