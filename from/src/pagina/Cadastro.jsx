import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { cadastroUsuario } from '../api/apisRotas';

function Cadastro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/livros', { replace: true });
        }
    }, [navigate]);

    const mutation = useMutation({
        mutationFn: (dados) => cadastroUsuario(dados),
        onSuccess: () => {
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            console.error('Erro no cadastro:', error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, senha, nome });
    };

    return (
        <div className="min-h-screen bg-[#050516] flex items-center justify-center">
            <div className="bg-[#0b1220] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Cadastro de Bibliotecário</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            autoComplete="name"
                            placeholder="Seu nome completo"
                            className="w-full p-2.5 rounded bg-[#050516] text-white border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            placeholder="seu@email.com"
                            className="w-full p-2.5 rounded bg-[#050516] text-white border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="new-password"
                            placeholder="Crie uma senha"
                            className="w-full p-2.5 rounded bg-[#050516] text-white border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-cyan-400 text-[#050516] p-2.5 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
                    >
                        {mutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                    {mutation.isError && (
                        <p className="text-pink-500 text-sm text-center">
                            {(mutation.error?.response?.data?.erro) || 'Erro no cadastro'}
                        </p>
                    )}
                    {mutation.isSuccess && (
                        <p className="text-green-500 text-sm text-center">
                            Cadastro realizado com sucesso! Faça login.
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-cyan-400 text-sm hover:underline mt-2"
                    >
                        Já tem conta? Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;