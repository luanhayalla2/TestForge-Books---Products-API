import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const carregarProdutos = async () => {
    const res = await api.get("/produtos");
    setProdutos(res.data);
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
    try {
      await api.post("/produtos", { nome, preco: Number(preco) });
      setNome("");
      setPreco("");
      carregarProdutos();
    } catch (err) {
      alert("Erro ao adicionar produto. Verifique se está logado.");
    }
  };

  const deletarProduto = async (id) => {
    await api.delete(`/produtos/${id}`);
    carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="page-container">
      <Link to="/dashboard" className="back-link">← Voltar ao Dashboard</Link>
      <h1>Gerenciamento de Produtos</h1>

      <form onSubmit={adicionarProduto} className="add-form">
        <input placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)} required />
        <input type="number" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} required />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="list">
        {produtos.map(p => (
          <li key={p._id} className="item">
            <span>{p.nome} - R$ {p.preco}</span>
            <button onClick={() => deletarProduto(p._id)} className="btn-delete">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
