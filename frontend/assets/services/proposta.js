const baseUrl = 'http://localhost:8000/api/proposta';

const propostaService = {
    // Função para criar uma proposta
    createProposta: async (proposta) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proposta),
            });
            return response.ok ? await response.json() : console.log(proposta);
        } catch (error) {
            console.error("Erro na criação da proposta:", error);
            throw error;
        }
    },

    // Função para obter todas as propostas
    getPropostas: async () => {
        try {
            const response = await fetch(baseUrl, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao listar propostas");
        } catch (error) {
            console.error("Erro ao obter propostas:", error);
            throw error;
        }
    },

    // Função para obter uma proposta específica
    getProposta: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao obter a proposta");
        } catch (error) {
            console.error("Erro ao obter a proposta:", error);
            throw error;
        }
    },

    // Função para atualizar uma proposta específica
    updateProposta: async (id, proposta) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proposta),
            });
            return response.ok ? await response.json() : Promise.reject("Erro ao editar proposta");
        } catch (error) {
            console.error("Erro ao editar a proposta:", error);
            throw error;
        }
    },

    // Função para deletar uma proposta específica
    deleteProposta: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    
            if (!response.ok) {
                throw new Error("Erro ao deletar proposta");
            }

            const isJson = response.headers.get('content-type')?.includes('application/json');
            return isJson ? await response.json() : null;
        } catch (error) {
            console.error("Erro ao deletar a proposta:", error);
            throw error;
        }
    }    
};

export default propostaService;