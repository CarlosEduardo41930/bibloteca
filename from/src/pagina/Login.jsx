import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../api/apisRotas';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/livros', { replace: true });
        }
    }, [navigate]);

    const mutation = useMutation({
        mutationFn: (dados) => loginUsuario(dados),
        onSuccess: (response) => {
            localStorage.setItem('token', response.data.token);
            navigate('/livros', { replace: true });
        },
        onError: (error) => {
            console.error('Erro no login:', error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, senha });
    };

    return (
        <div className="min-h-screen bg-[#050516] flex items-center justify-center">
            <div className="bg-[#0b1220] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Login do Bibliotecário</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                            autoComplete="current-password"
                            placeholder="Sua senha"
                            className="w-full p-2.5 rounded bg-[#050516] text-white border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-cyan-400 text-[#050516] p-2.5 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
                    >
                        {mutation.isPending ? 'Entrando...' : 'Entrar'}
                    </button>
                    {mutation.isError && (
                        <p className="text-pink-500 text-sm text-center">
                            {(mutation.error?.response?.data?.erro) || 'Erro no login'}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={() => navigate('/cadastro')}
                        className="text-cyan-400 text-sm hover:underline mt-2"
                    >
                        Não tem conta? Cadastre-se
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;