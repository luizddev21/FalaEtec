import { useState } from 'react';

export default function Register() {
    // Armazena os dados preenchidos pelo usuário.
    const [formData, setFormData] = useState({
        rm: '',
        password: '',
        name: '',
        turma_id: '',
        type: ''
    });

    // Armazena a mensagem retornada pela API.
    const [message, setMessage] = useState('');

    // Atualiza os valores do formulário conforme o usuário digita ou seleciona.
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Envia os dados do formulário para a API.
    async function handleSubmit(event) {
        event.preventDefault();

        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            // Exibe a resposta recebida do servidor.
            setMessage(JSON.stringify(data, null, 2));

        } catch (error) {
            console.error(error);

            setMessage('Erro ao conectar com o servidor.');
        }
    }

    return (
        <div>
            <h1>Cadastro de Usuário</h1>

            <form onSubmit={handleSubmit}>

                {/* Campo para informar o RM do usuário. */}
                <div>
                    <label htmlFor="rm">RM:</label>

                    <input
                        type="number"
                        id="rm"
                        name="rm"
                        value={formData.rm}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Campo para informar o nome do usuário. */}
                <div>
                    <label htmlFor="name">Nome:</label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Campo para informar a senha do usuário. */}
                <div>
                    <label htmlFor="password">Senha:</label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Select responsável pela escolha da sala/turma. */}
                <div>
                    <label htmlFor="turma_id">Sala:</label>

                    <select
                        id="turma_id"
                        name="turma_id"
                        value={formData.turma_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione uma sala</option>

                        <option value="1">3B1</option>
                        <option value="2">3B2</option>
                        <option value="3">3B3</option>
                    </select>
                </div>

                {/* Select responsável pela escolha do tipo de usuário. */}
                <div>
                    <label htmlFor="type">Tipo de usuário:</label>

                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o tipo</option>

                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                        <option value="gestor">Gestor</option>
                    </select>
                </div>

                {/* Botão responsável pelo envio do formulário. */}
                <button type="submit">
                    Cadastrar
                </button>
            </form>

            {/* Exibe a resposta retornada pela API após o cadastro. */}
            {message && (
                <pre>
                    {message}
                </pre>
            )}
        </div>
    );
}