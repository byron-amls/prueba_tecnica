import { ref, computed } from 'vue';

const API_URL = 'http://localhost:3001/api';

export function useTickets() {
  const tickets = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedStatus = ref('');

  async function fetchTickets() {
    loading.value = true;
    error.value = null;
    
    try {
      let url = `${API_URL}/tickets`;
      if (selectedStatus.value) {
        url += `?status=${selectedStatus.value}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener');
      
      const data = await response.json();
      tickets.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createTicket(title, description) {
    try {
      console.log('Enviando:', { title, description });
      const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.message || 'Error al crear';
        throw new Error(errorMsg);
      }
      
      return data.ticket;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  }

  async function updateTicket(id, updates) {
    try {
      const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.message || 'Error al actualizar';
        throw new Error(errorMsg);
      }
      
      const index = tickets.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tickets.value[index] = data;
      }
      
      return data;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  }

  async function deleteTicket(id) {
    try {
      const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar');
      
      tickets.value = tickets.value.filter(t => t.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  }

  const filteredTickets = computed(() => {
    if (!selectedStatus.value) return tickets.value;
    return tickets.value.filter(t => t.status === selectedStatus.value);
  });

  return {
    tickets,
    loading,
    error,
    selectedStatus,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    filteredTickets
  };
}
