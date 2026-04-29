import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard TestForge 🚀</h1>
        <button onClick={logout} className="btn-logout">Sair</button>
      </header>
      
      <main className="cards-grid">
        <Link to="/produtos" className="card">
          <h2>📦 Produtos</h2>
          <p>Gerencie o catálogo de produtos.</p>
        </Link>
        <Link to="/livros" className="card">
          <h2>📚 Livros</h2>
          <p>Gerencie a biblioteca de livros.</p>
        </Link>
      </main>
    </div>
  );
}
