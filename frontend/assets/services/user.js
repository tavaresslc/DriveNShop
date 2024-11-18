const baseUrl = 'http://localhost:8000/api/usuario';

const userService = {
    // Função para criar um usuario
    createUser: async (user) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            return response.ok ? await response.json() : Promise.reject("Erro ao criar usuário");
        } catch (error) {
            console.error("Erro na criação do usuario:", error);
            throw error;
        }
    },

    // Função para obter todos os usuarios
    getUsers: async () => {
        try {
            const response = await fetch(baseUrl, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao listar usuarios");
        } catch (error) {
            console.error("Erro ao obter usuarios:", error);
            throw error;
        }
    },

    // Função para obter um usuario
    getUser: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao obter usuario");
        } catch (error) {
            console.error("Erro ao obter usuario:", error);
            throw error;
        }
    },

    // Função para atualizar um usuario
    updateUser: async (user, id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            return response.ok ? await response.json() : Promise.reject("Erro ao atualizar usuario");
        } catch (error) {
            console.error("Erro na atualização do usuario:", error);
            throw error;
        }
    },

    // Função para deletar um usuario
    deleteUser: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error("Erro ao deletar veiculo");
            }

            const isJson = response.headers.get('content-type')?.includes('application/json');
            return isJson ? await response.json() : null;
        } catch (error) {
            console.error("Erro ao deletar usuario:", error);
            throw error;
        }
    }

}

export default userService;