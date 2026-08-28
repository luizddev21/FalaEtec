async function login(rm, password, type) {
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rm,
            password,
            type
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar login");
    }

    return data;
}

export default login;