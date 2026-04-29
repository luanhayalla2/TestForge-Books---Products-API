import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [form, setForm] = useState({ nome: "", autor: "", genero: "" });

  const carregarLivros = async () => {
    const res = await api.get("/livros");
    setLivros(res.data);
  };

  const adicionarLivro = async (e) => {
    e.preventDefault();
    try {
      await api.post("/livros", form);
      setForm({ nome: "", autor: "", genero: "" });
      carregarLivros();
    } catch (err) {
      alert("Erro ao adicionar livro.");
    }
  };

  const deletarLivro = async (id) => {
    await api.delete(`/livros/${id}`);
    carregarLivros();
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div className="page-container">
      <Link to="/dashboard" className="back-link">← Voltar ao Dashboard</Link>
      <h1>Biblioteca de Livros</h1>

      <form onSubmit={adicionarLivro} className="add-form">
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required />
        <input placeholder="Autor" value={form.autor} onChange={e => setForm({...form, autor: e.target.value})} required />
        <input placeholder="Gênero" value={form.genero} onChange={e => setForm({...form, genero: e.target.value})} required />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="list">
        {livros.map(l => (
          <li key={l._id} className="item">
            <div>
              <strong>{l.nome}</strong> - {l.autor} ({l.genero})
            </div>
            <button onClick={() => deletarLivro(l._id)} className="btn-delete">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
