"use client";

import { useEffect, useState } from "react";
import type { Artist } from "../../../../models/artist";
import ArtistApiService from "../../../services/artist_api_service";
import AdminArtistFormContent from "../../../components/admin/admin_artist_form_content";
import AdminArtistFormValidator from "../../../validators/admin/admin_artist_form_validators";
import { useParams } from "react-router";


const AdminArtistForm = () => {
  const { id } = useParams<{ id?: string }>();
  const artistId = id ? Number(id) : null;

  const [dataToUpdate, setDataToUpdate] = useState<Artist | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artistId === null || Number.isNaN(artistId)) return;

    setLoading(true);

    new ArtistApiService()
      .selectOne(artistId)
      .then(res => setDataToUpdate(res.data as Artist))
      .finally(() => setLoading(false));
  }, [artistId]);

  if (loading) return <p>Chargement...</p>;


// const AdminArtistForm = ({ params }: AdminArtistParams) => {

// 	const { id } = params;

// 	let dataToUpdate: Artist | undefined;

// 	if (id) {
// 		dataToUpdate = use(new ArtistApiService().selectOne(id)).data as Artist;
// 	}

	return (
		<AdminArtistFormContent
			validator={new AdminArtistFormValidator().validate}
			dataToUpdate={dataToUpdate}
		/>
	);
};

export default AdminArtistForm;
