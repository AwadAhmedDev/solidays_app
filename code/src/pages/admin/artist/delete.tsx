"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router";
import ApiArtistService from "../../../services/api_artist_service";
import type { AdminArtistsParams } from "../../../models/params/admin_artists_params";


const AdminArtistDelete = ({ params }: AdminArtistsParams) => {

	const { id } = params;
	const navigate = useNavigate();

	
	useEffect(() => {

		new ApiArtistService().delete({ id: id }).then(() => {
			navigate("/admin");
			return;
		});
	}, [id, navigate]);

	return <title>Gestion des artistes - Supression </title>;
};
export default AdminArtistDelete;