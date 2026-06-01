import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');


    const mutation = useMutation({
        mutationFn: (dados) => {
            return axios.post('http://localhost:418/cadastro', dados);
        },
        onSuccess: (response) => {
            console.log('Cadastro bem-sucedido:', response.data);
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
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Cadastro</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full p-2 rounded bg-[#050516] text-white border border-gray-700 focus:border-cyan-400 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded bg-[#050516] text-white border border-gray-700 focus:border-cyan-400 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Senha:</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full p-2 rounded bg-[#050516] text-white border border-gray-700 focus:border-cyan-400 outline-none"
                            required
                        />
                    </div>
                    
                    <button type="submit" disabled={mutation.isLoading}
                        className="w-full bg-cyan-400 text-[#050516] p-2 rounded font-semibold hover:bg-cyan-300 transition disabled:opacity-50">
                        {mutation.isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                    {mutation.isError && (
                        <p className="text-pink-500 text-sm text-center">
                            {(mutation.error && mutation.error.response && mutation.error.response.data && mutation.error.response.data.erro) || 'Erro no cadastro'}
                        </p>
                    )}
                    {mutation.isSuccess && (
                        <p className="text-green-500 text-sm text-center">
                            Cadastro realizado com sucesso!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Cadastro;