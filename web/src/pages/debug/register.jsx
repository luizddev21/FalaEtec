import { useState, useEffect } from 'react';
import api from '../../js/api.js'

export default function Register() {

    // Pegar todos os usuários

    const [allUserData, setAllUserData] = useState([]);

    useEffect(() => {
        async function loadAllUserData() {
            const response = await api.apiFetch("/user/all-profile");

            if (!response.ok) {
                console.log(await response.json())
                return;
            }

            const data = await response.json();

            setAllUserData(data);
        }

        loadAllUserData();
    }, []);

    // Armazena os dados preenchidos pelo usuário.
    const [formData, setFormData] = useState({
        rm: '',
        password: '',
        name: '',
        turma_id: '',
        type: ''
    });

    const [newPasswords, setNewPasswords] = useState({});

    // Armazena a mensagem retornada pela API.
    const [message, setMessage] = useState('');

    // Atualiza os valores do formulário conforme o usuário digita ou seleciona.
    function handleChangeRegisterForm(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleChangeNewPasswordForm(event, userKey) {
        const { value } = event.target;

        setNewPasswords(prev => ({
            ...prev,
            [userKey]: value
        }));
    }

    // Envia os dados do formulário para a API.
    async function handleSubmitRegisterForm(event) {
        event.preventDefault();

        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/user/create', {
                method: 'POST',
                credentials: 'include',
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

    async function handleSubmitNewPasswordForm(event, rm, type, userKey) {
        event.preventDefault();

        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/user/change-password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rm: rm,
                    newPassword: newPasswords[userKey],
                    type: type
                })
            });

            const data = await response.json();

            setMessage(JSON.stringify(data, null, 2));

        } catch (error) {
            console.error(error);
            setMessage('Erro ao conectar com o servidor.');
        }
    }

    async function handleSubmitDeleteUserForm(event, rm, type) {
        event.preventDefault();

        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/user/delete', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rm: rm,
                    type: type
                })
            });

            const data = await response.json();

            setMessage(JSON.stringify(data, null, 2));

        } catch (error) {
            console.error(error);
            setMessage('Erro ao conectar com o servidor.');
        }
    }

    return (
        <>
            <div>
                <h1>Cadastro de Usuário</h1>

                <form onSubmit={handleSubmitRegisterForm}>

                    {/* Campo para informar o RM do usuário. */}
                    <div>
                        <label htmlFor="rm">RM:</label>

                        <input
                            type="number"
                            id="rm"
                            name="rm"
                            value={formData.rm}
                            onChange={handleChangeRegisterForm}
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
                            onChange={handleChangeRegisterForm}
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
                            onChange={handleChangeRegisterForm}
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
                            onChange={handleChangeRegisterForm}
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
                            onChange={handleChangeRegisterForm}
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
            <div>
                <h1>Todos os usuários</h1>

                <ul className="usuarios">
                    {
                        allUserData.map((user) => {
                            const idKey = Object.keys(user).find(key => key.endsWith("_id"));
                            const type = idKey.replace("_id", "");
                            const rm = user[idKey];

                            const userKey = `${type}-${rm}`;

                            return (
                                <li key={userKey}>
                                    <span className="rm">{rm}</span>
                                    <span>{user.nome}</span>
                                    <span>{type}</span>

                                    <button 
                                        className="delete-user"
                                        onClick={(event) =>
                                            handleSubmitDeleteUserForm(
                                                event,
                                                rm,
                                                type
                                            )
                                        }
                                    >
                                        APAGAR
                                    </button>

                                    <input
                                        type="password"
                                        id={`new-password-${userKey}`}
                                        name={`new-password-${userKey}`}
                                        className="new-password"
                                        value={newPasswords[userKey] || ""}
                                        onChange={(event) =>
                                            handleChangeNewPasswordForm(event, userKey)
                                        }
                                        placeholder="Nova senha"
                                        required
                                    />

                                    <button
                                        className="change-password"
                                        onClick={(event) =>
                                            handleSubmitNewPasswordForm(
                                                event,
                                                rm,
                                                type,
                                                userKey
                                            )
                                        }
                                    >
                                        ALTERAR SENHA
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </>
    );
}