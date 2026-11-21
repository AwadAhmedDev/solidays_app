import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import ArtistApiService from "../../../services/artist_api_service";
import type { Artist } from "../../../../models/artist";
import usePageMeta from "../../../hooks/usePageMeta";

// Suppression avec confirmation : ouvrir cette page ne supprime plus rien
// tant que l'administrateur n'a pas cliqué sur « Supprimer définitivement ».
const AdminArtistDelete = () => {
	usePageMeta("Supprimer un artiste");
	const { id } = useParams<{ id?: string }>();
	const navigate = useNavigate();
	const artistId = id ? Number(id) : null;

	const [artist, setArtist] = useState<Artist | null>(null);
	const [error, setError] = useState("");
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (artistId === null || Number.isNaN(artistId)) {
			navigate("/admin");
			return;
		}
		new ArtistApiService().selectOne(artistId).then((res) => {
			if (res.data) setArtist(res.data);
			else setError(res.message);
		});
	}, [artistId, navigate]);

	const confirm = async () => {
		setDeleting(true);
		const res = await new ArtistApiService().delete({ id: artistId ?? undefined });
		if (res.status === 200) navigate("/admin");
		else {
			setError(res.message);
			setDeleting(false);
		}
	};

	return (
		<section className="sd-status" style={{ maxWidth: 560, margin: "0 auto" }}>
			<h1 className="sd-section-title" style={{ fontSize: "2rem" }}>Supprimer un artiste</h1>
			{error && <p className="sd-status--error" role="alert" style={{ marginTop: 16 }}>{error}</p>}
			{artist && (
				<>
					<p style={{ margin: "20px 0 28px" }}>
						Supprimer <strong>{artist.name}</strong> de la programmation ? Sa photo sera aussi supprimée. Cette
						action est définitive.
					</p>
					<div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
						<button type="button" className="sd-btn sd-btn--solid" onClick={confirm} disabled={deleting}>
							{deleting ? "Suppression…" : "Supprimer définitivement"}
						</button>
						<NavLink to="/admin" className="sd-btn">Annuler</NavLink>
					</div>
				</>
			)}
		</section>
	);
};
export default AdminArtistDelete;
