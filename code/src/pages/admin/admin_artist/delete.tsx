"use client";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ArtistApiService from "../../../services/artist_api_service";


const AdminArtistDelete = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

const artistId = id ? Number(id) : null;
	
	useEffect(() => {
  if (artistId === null || Number.isNaN(artistId)) {
    navigate("/admin");
    return;
  }

  new ArtistApiService()
    .delete({ id: artistId })
    .then(() => navigate("/admin"));
}, [artistId, navigate]);


// const AdminArtistDelete = ({ params }: AdminArtistParams) => {
	
// 	const { id } = params;
	
// 	const navigate = useNavigate();

//     useEffect(() => {
        
// 		new ArtistApiService().delete({ id: id }).then(() => {
// 			navigate("/admin");
// 			return;
// 		});
// 	}, [id, navigate]);

	return <title>Gestion des artistes - Supression </title>;
};
export default AdminArtistDelete;