import React from "react";

const SigninPage: React.FC = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Connexion</h2>
        <form
          action="http://localhost:5180/api/auth/login"
          method="POST"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Se connecter
          </button>
        </form>
        <div style={styles.footer}>
          <p>
            Pas encore inscrit ?{" "}
            <a href="sign-up.html" style={styles.link}>
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
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
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    padding: "0.8em",
    margin: "0.5em 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    width: "100%",
    padding: "0.8em",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    marginTop: "1em",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
  },
};

export default SigninPage;
