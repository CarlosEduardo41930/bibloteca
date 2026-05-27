import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const mutation = useMutation({
        mutationFn: (dados)=>{
            return axios.post('http://localhost:418/login', dados);
        },
        onSuccess: (response) => {
            console.log('Login bem-sucedido:', response.data);
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}

export default Login;