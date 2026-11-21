import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import AuthApiService from "../../services/auth_api_service";

// Protège les pages admin : sans session valide, redirection vers la connexion.
// (Le serveur refuse de toute façon les écritures sans session : ceci évite d'afficher l'admin pour rien.)
const AdminGuard = () => {
	const [state, setState] = useState<"loading" | "ok" | "out">("loading");
	const location = useLocation();

	useEffect(() => {
		new AuthApiService().me().then((res) => setState(res.status === 200 ? "ok" : "out"));
	}, []);

	if (state === "loading") return <p className="sd-status">Vérification de la session…</p>;
	if (state === "out") return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
	return <Outlet />;
};

export default AdminGuard;
