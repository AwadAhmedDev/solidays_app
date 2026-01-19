import { use } from "react";
import type { Artist } from "../../../../models/artist";
import { Link } from "react-router-dom";
import ApiArtistService from "../../../services/api_artist_service";

const AdminArtistHomeContent = () => {
    const results = use(new ApiArtistService().selectAll()).data as Artist[];

    return (
        <>
            <h1>AdminArtistHome</h1>

            <p>
                <Link to='/admin/artist/form' >Ajouter</Link>
            </p>

            {
                results.map((data) => {
                    return <div>
                        <p>
                            {data.id}: {data.name}
                        </p>
                        <img src={`/images/${data.image}`} alt={data.name} />
                        <p>

                        </p>
                    </div>
                })
            }
        </>
    )
}

export default AdminArtistHomeContent