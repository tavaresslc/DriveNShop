const baseUrl = 'http://localhost:8000/api/veiculo';

const veiculoService = {
    // Função para criar um anuncio de veiculo
    createVeiculo: async (anuncio) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(anuncio),
            });
            return response.ok ? await response.json() : Promise.reject("Erro ao criar o anuncio");
        } catch (error) {
            console.error("Erro na criação do anuncio:", error);
            throw error;
        }
    },

    // Função para obter todos os veiculos
    getVeiculos: async () => {
        try {
            const response = await fetch(baseUrl, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao listar veiculos");
        } catch (error) {
            console.error("Erro ao obter veiculos:", error);
            throw error;
        }
    },

    // Função para obter um veiculo pelo id
    getVeiculo: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao obter veiculo");
        } catch (error) {
            console.error("Erro ao obter veiculo:", error);
            throw error;
        }
    },

    // Função para atualizar um veiculo
    updateVeiculo: async (anuncio, id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(anuncio),
            });
            return response.ok ? await response.json() : Promise.reject("Erro ao atualizar o anuncio");
        } catch (error) {
            console.error("Erro na atualização do anuncio:", error);
            throw error;
        }
    },

    // Função para deletar um veiculo pelo id
    deleteVeiculo: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error("Erro ao deletar veiculo");
            }

            const isJson = response.headers.get('content-type')?.includes('application/json');
            return isJson ? await response.json() : null;
        } catch (error) {
            console.error("Erro ao deletar veiculo:", error);
            throw error;
        }
    },
}

export default veiculoService;