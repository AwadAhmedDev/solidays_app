import { useEffect, useState } from "react";
import type { Artist } from "../../../../models/artist";
import ArtistApiService from "../../../services/artist_api_service";
import AdminArtistFormContent from "../../../components/admin/admin_artist_form_content";
import AdminArtistFormValidator from "../../../validators/admin/admin_artist_form_validators";
import { useParams } from "react-router";
import usePageMeta from "../../../hooks/usePageMeta";

const AdminArtistForm = () => {
  const { id } = useParams<{ id?: string }>();
  const artistId = id ? Number(id) : null;
  const isEdit = artistId !== null && !Number.isNaN(artistId);
  usePageMeta(isEdit ? "Modifier un artiste" : "Ajouter un artiste");

  // En modification : chargement de l'artiste avant d'afficher le formulaire
  const [loaded, setLoaded] = useState<{ id: number; data?: Artist; message?: string } | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    new ArtistApiService()
      .selectOne(artistId)
      .then((res) => setLoaded({ id: artistId, data: res.data, message: res.data ? undefined : res.message }));
  }, [artistId, isEdit]);

  if (isEdit && loaded?.id !== artistId) return <p className="sd-status">Chargement…</p>;
  if (isEdit && loaded?.message) return <p className="sd-status sd-status--error">{loaded.message}</p>;

  return (
    <AdminArtistFormContent
      key={artistId ?? "new"}
      validator={new AdminArtistFormValidator().validate}
      dataToUpdate={isEdit ? loaded?.data : undefined}
    />
  );
};

export default AdminArtistForm;
