import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { user, senha });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { user, senha });
      alert("Usuário registrado! Agora faça login.");
    } catch (err) {
      setError("Erro ao registrar");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>TestForge Pro</h1>
        <p>Acesse sua conta</p>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Usuário" 
            value={user} 
            onChange={e => setUser(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
          />
          {error && <span className="error">{error}</span>}
          <div className="actions">
            <button type="submit" className="btn-primary">Entrar</button>
            <button type="button" onClick={handleRegister} className="btn-secondary">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
