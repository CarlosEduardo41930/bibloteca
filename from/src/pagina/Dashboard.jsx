import { useEffect, useState } from 'react';
import Cards from '../Componentes/Cards';
import {
  listarLivros,
  listarLeitores,
  listarEmprestimos,
  cadastrarLivro as cadastrarLivroApi,
  cadastrarLeitor as cadastrarLeitorApi,
  cadastrarEmprestimo as cadastrarEmprestimoApi,
  devolverEmprestimo as devolverEmprestimoApi
} from '../api/apisRotas';

function Dashboard() {
  const [livros, setLivros] = useState([]);
  const [leitores, setLeitores] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [formLivro, setFormLivro] = useState({ titulo: '', autor: '', categoria: '', ano_publicacao: '', image: '' });
  const [formLeitor, setFormLeitor] = useState({ nome: '', email: '', cpf: '', tel: '' });
  const [formEmprestimo, setFormEmprestimo] = useState({ fk_leitor: '', fk_livro: '', data_para_devolucao: '' });
  const [mensagem, setMensagem] = useState('');

  const carregarDados = async () => {
    try {
      const [resLivros, resLeitores, resEmprestimos] = await Promise.all([
        listarLivros(),
        listarLeitores(),
        listarEmprestimos()
      ]);

      setLivros(resLivros.data);
      setLeitores(resLeitores.data);
      setEmprestimos(resEmprestimos.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleCadastrarLivro = async (e) => {
    e.preventDefault();
    try {
      const resposta = await cadastrarLivroApi(formLivro);
      setMensagem(resposta.data.message || resposta.data.erro || '');
      if (resposta.status === 201 || resposta.status === 200) {
        setFormLivro({ titulo: '', autor: '', categoria: '', ano_publicacao: '', image: '' });
        carregarDados();
      }
    } catch (error) {
      setMensagem('Erro ao cadastrar livro');
    }
  };

  const handleCadastrarLeitor = async (e) => {
    e.preventDefault();
    try {
      const resposta = await cadastrarLeitorApi(formLeitor);
      setMensagem(resposta.data.message || resposta.data.erro || '');
      if (resposta.status === 201 || resposta.status === 200) {
        setFormLeitor({ nome: '', email: '', cpf: '', tel: '' });
        carregarDados();
      }
    } catch (error) {
      setMensagem('Erro ao cadastrar leitor');
    }
  };

  const handleCriarEmprestimo = async (e) => {
    e.preventDefault();
    try {
      const resposta = await cadastrarEmprestimoApi(formEmprestimo);
      setMensagem(resposta.data.message || resposta.data.erro || '');
      if (resposta.status === 201 || resposta.status === 200) {
        setFormEmprestimo({ fk_leitor: '', fk_livro: '', data_para_devolucao: '' });
        carregarDados();
      }
    } catch (error) {
      setMensagem('Erro ao criar empréstimo');
    }
  };

  const handleDevolverEmprestimo = async (id) => {
    try {
      const resposta = await devolverEmprestimoApi(id);
      setMensagem(resposta.data.message || resposta.data.erro || '');
      if (resposta.status === 200) {
        carregarDados();
      }
    } catch (error) {
      setMensagem('Erro ao devolver livro');
    }
  };

  return (
    <div className="space-y-8">
      {mensagem && <div className="bg-[#0b1220] text-cyan-300 p-3 rounded border border-cyan-400/30">{mensagem}</div>}

      <section id="livros" className="bg-[#0b1220] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-cyan-400">Livros e status</h2>
          <span className="text-sm text-gray-400">{livros.length} livros</span>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {livros.map((livro) => (
            <Cards key={livro.id} livro={livro} />
          ))}
        </div>
      </section>

      <section id="cadastro-livro" className="bg-[#0b1220] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Adicionar livro</h2>
        <form onSubmit={handleCadastrarLivro} className="grid md:grid-cols-2 gap-3">
          <input value={formLivro.titulo} onChange={(e) => setFormLivro({ ...formLivro, titulo: e.target.value })} placeholder="Título" className="p-2 rounded bg-[#050516] border border-gray-700" required />
          <input value={formLivro.autor} onChange={(e) => setFormLivro({ ...formLivro, autor: e.target.value })} placeholder="Autor" className="p-2 rounded bg-[#050516] border border-gray-700" required />
          <input value={formLivro.categoria} onChange={(e) => setFormLivro({ ...formLivro, categoria: e.target.value })} placeholder="Categoria" className="p-2 rounded bg-[#050516] border border-gray-700" required />
          <input value={formLivro.ano_publicacao} onChange={(e) => setFormLivro({ ...formLivro, ano_publicacao: e.target.value })} placeholder="Ano" className="p-2 rounded bg-[#050516] border border-gray-700" />
          <input value={formLivro.image} onChange={(e) => setFormLivro({ ...formLivro, image: e.target.value })} placeholder="URL da imagem" className="p-2 rounded bg-[#050516] border border-gray-700 md:col-span-2" />
          <button className="bg-cyan-400 text-[#050516] font-semibold p-2 rounded md:col-span-2">Cadastrar livro</button>
        </form>
      </section>

      <section id="leitores" className="bg-[#0b1220] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Cadastrar leitor</h2>
        <form onSubmit={handleCadastrarLeitor} className="grid md:grid-cols-2 gap-3">
          <input value={formLeitor.nome} onChange={(e) => setFormLeitor({ ...formLeitor, nome: e.target.value })} placeholder="Nome" className="p-2 rounded bg-[#050516] border border-gray-700" required />
          <input value={formLeitor.email} onChange={(e) => setFormLeitor({ ...formLeitor, email: e.target.value })} placeholder="E-mail" className="p-2 rounded bg-[#050516] border border-gray-700" required />
          <input value={formLeitor.cpf} onChange={(e) => setFormLeitor({ ...formLeitor, cpf: e.target.value })} placeholder="CPF" className="p-2 rounded bg-[#050516] border border-gray-700" required />
          <input value={formLeitor.tel} onChange={(e) => setFormLeitor({ ...formLeitor, tel: e.target.value })} placeholder="Telefone" className="p-2 rounded bg-[#050516] border border-gray-700" />
          <button className="bg-cyan-400 text-[#050516] font-semibold p-2 rounded md:col-span-2">Cadastrar leitor</button>
        </form>

        <div className="mt-6 overflow-auto">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Leitores</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left py-2">Nome</th>
                <th className="text-left py-2">E-mail</th>
                <th className="text-left py-2">Livro em uso</th>
              </tr>
            </thead>
            <tbody>
              {leitores.map((leitor) => (
                <tr key={leitor.id} className="border-t border-gray-800">
                  <td className="py-2">{leitor.nome}</td>
                  <td>{leitor.email}</td>
                  <td>{leitor.livro_emprestado || 'Nenhum'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="emprestimos" className="bg-[#0b1220] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Gestão de empréstimos</h2>
        <form onSubmit={handleCriarEmprestimo} className="grid md:grid-cols-3 gap-3 mb-6">
          <select value={formEmprestimo.fk_leitor} onChange={(e) => setFormEmprestimo({ ...formEmprestimo, fk_leitor: e.target.value })} className="p-2 rounded bg-[#050516] border border-gray-700" required>
            <option value="">Selecione o leitor</option>
            {leitores.map((leitor) => (
              <option key={leitor.id} value={leitor.id}>{leitor.nome}</option>
            ))}
          </select>
          <select value={formEmprestimo.fk_livro} onChange={(e) => setFormEmprestimo({ ...formEmprestimo, fk_livro: e.target.value })} className="p-2 rounded bg-[#050516] border border-gray-700" required>
            <option value="">Selecione o livro</option>
            {livros.map((livro) => (
              <option key={livro.id} value={livro.id}>{livro.titulo}</option>
            ))}
          </select>
          <input type="date" value={formEmprestimo.data_para_devolucao} onChange={(e) => setFormEmprestimo({ ...formEmprestimo, data_para_devolucao: e.target.value })} className="p-2 rounded bg-[#050516] border border-gray-700" required />
          <button className="bg-cyan-400 text-[#050516] font-semibold p-2 rounded md:col-span-3">Reservar livro</button>
        </form>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left py-2">Leitor</th>
                <th className="text-left py-2">Livro</th>
                <th className="text-left py-2">Data devolução</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => (
                <tr key={emprestimo.id} className="border-t border-gray-800">
                  <td className="py-2">{emprestimo.leitor}</td>
                  <td>{emprestimo.livro}</td>
                  <td>{emprestimo.data_para_devolucao}</td>
                  <td>{emprestimo.status}</td>
                  <td>
                    {emprestimo.status === 'EMPRESTADO' ? (
                      <button onClick={() => handleDevolverEmprestimo(emprestimo.id)} className="text-cyan-400 hover:underline">Marcar devolvido</button>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;