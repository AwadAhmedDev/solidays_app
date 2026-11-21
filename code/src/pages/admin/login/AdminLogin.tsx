import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import AuthApiService from "../../../services/auth_api_service";
import usePageMeta from "../../../hooks/usePageMeta";
import styles from "./AdminLogin.module.css";

type LoginForm = { email: string; password: string };

const AdminLogin = () => {
	usePageMeta("Connexion administrateur");
	const emailId = useId();
	const passwordId = useId();
	const navigate = useNavigate();
	const from = (useLocation().state as { from?: string } | null)?.from ?? "/admin";
	const [message, setMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>();

	const submit = async ({ email, password }: LoginForm) => {
		setMessage("");
		const res = await new AuthApiService().login(email, password);
		if (res.status === 200) navigate(from, { replace: true });
		else setMessage(res.message);
	};

	return (
		<section className={styles.page}>
			<form className={styles.card} onSubmit={handleSubmit(submit)} noValidate>
				<h1 className={styles.title}>Espace administrateur</h1>
				<p className={styles.lead}>Gestion des artistes de la programmation.</p>

				<label htmlFor={emailId}>E-mail</label>
				<input
					id={emailId}
					type="email"
					autoComplete="username"
					aria-invalid={!!errors.email}
					{...register("email", { required: "L'e-mail est obligatoire" })}
				/>
				<small role="alert">{errors.email?.message}</small>

				<label htmlFor={passwordId}>Mot de passe</label>
				<input
					id={passwordId}
					type="password"
					autoComplete="current-password"
					aria-invalid={!!errors.password}
					{...register("password", { required: "Le mot de passe est obligatoire" })}
				/>
				<small role="alert">{errors.password?.message}</small>

				{message && (
					<p className={styles.error} role="alert">
						{message}
					</p>
				)}

				<button type="submit" className="sd-btn sd-btn--solid" disabled={isSubmitting}>
					{isSubmitting ? "Connexion…" : "Se connecter"}
				</button>
			</form>
		</section>
	);
};

export default AdminLogin;
