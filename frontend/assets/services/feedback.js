const baseUrl = 'http://localhost:8000/api/feedback';

const feedbackService = {
    // Função para criar um feedback
    createFeedback: async (comentario, tipo_transacao, avaliacao, id_avaliador, id_avaliado) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comentario, tipo_transacao, avaliacao, id_avaliador, id_avaliado }),
            });
            return response.ok ? await response.json() : Promise.reject("Erro ao criar feedback");
        } catch (error) {
            console.error("Erro na criação do feedback:", error);
            throw error;
        }
    },

    // Função para obter todos os feedbacks
    getFeedbacks: async () => {
        try {
            const response = await fetch(baseUrl, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao listar feedbacks");
        } catch (error) {
            console.error("Erro ao obter feedbacks:", error);
            throw error;
        }
    },

    // Função para obter um feedback específico
    getFeedback: async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'GET' });
            return response.ok ? await response.json() : Promise.reject("Erro ao obter o feedback");
        } catch (error) {
            console.error("Erro ao obter o feedback:", error);
            throw error;
        }
    },

    // Função para atualizar um feedback específico
    updateFeedback: async (id, comentario, tipo_transacao, avaliacao, id_avaliador, id_avaliado) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comentario, tipo_transacao, avaliacao, id_avaliador, id_avaliado }),
            });
            return response.ok ? await response.json() : Promise.reject("Erro ao editar feedback");
        } catch (error) {
            console.error("Erro ao editar o feedback:", error);
            throw error;
        }
    },
};

export default feedbackService;