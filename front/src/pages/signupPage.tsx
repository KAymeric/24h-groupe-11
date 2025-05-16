import React, { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5180/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "277566730f0ccef7f82a12c216098ee073aacedd7da81e5a84e6cdf282310a69" // Clé API directe pour éviter l'erreur process
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur d'inscription");
      }

      setName("");
      setEmail("");
      setPassword("");
      setSuccess("Inscription réussie! Vous pouvez maintenant vous connecter.");
      

      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);

    } catch (err) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Inscription</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom complet"
            required
            style={styles.input}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            style={styles.input}
          />
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Inscription en cours..." : "Créer un compte"}
          </button>
        </form>
        
        <div style={styles.footer}>
          <p>
            Déjà inscrit ?{" "}
            <a href="/signin" style={styles.link}>
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    background: "white",
    padding: "2em",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "300px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1em",
  },
  input: {
    width: "100%",
    padding: "0.8em",
    margin: "0.5em 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "0.8em",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    opacity: (props) => (props.disabled ? 0.7 : 1),
  },
  footer: {
    textAlign: "center",
    marginTop: "1em",
  },
  link: {
    color: "#10b981",
    textDecoration: "none",
  },
  error: {
    color: "#ef4444",
    backgroundColor: "#fee2e2",
    padding: "0.5em",
    borderRadius: "8px",
    marginBottom: "1em",
    textAlign: "center",
  },
  success: {
    color: "#10b981",
    backgroundColor: "#d1fae5",
    padding: "0.5em",
    borderRadius: "8px",
    marginBottom: "1em",
    textAlign: "center",
  },
};

export default SignupPage;