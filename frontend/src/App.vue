<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <h1>Sistema de Tickets</h1>
        <p class="subtitle">Sistema interno de seguimiento de tickets</p>
      </div>
    </header>

    <main class="main">
      <div class="sidebar">
        <TicketFilter 
          :status="selectedStatus" 
          @update:status="selectedStatus = $event"
        />
      </div>

      <div class="content">
        <TicketForm @ticket-created="handleTicketCreated" />
        
        <div v-if="loading" class="loading">Cargando tickets...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        
        <div v-if="filteredTickets.length === 0 && !loading" class="empty">
          No hay tickets
        </div>
        
        <TicketList 
          :tickets="filteredTickets"
          @ticket-click="selectTicket"
          @delete="handleDelete"
        />
      </div>
    </main>

    <TicketModal 
      v-if="selectedTicket"
      :ticket="selectedTicket"
      @close="selectedTicket = null"
      @updated="handleTicketUpdated"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useTickets } from './composables/useTickets.js';
import TicketList from './components/TicketList.vue';
import TicketForm from './components/TicketForm.vue';
import TicketFilter from './components/TicketFilter.vue';
import TicketModal from './components/TicketModal.vue';

const { 
  tickets, 
  loading, 
  error, 
  selectedStatus, 
  fetchTickets, 
  deleteTicket 
} = useTickets();

const selectedTicket = ref(null);

onMounted(() => {
  fetchTickets();
});

watch(selectedStatus, () => {
  fetchTickets();
  setTimeout(() => {
    fetchTickets();
  }, 100);
}, { immediate: false });


watch(() => tickets.value, () => {
  fetchTickets();
}, { deep: true, immediate: false });

const filteredTickets = computed(() => {
  if (!selectedStatus.value) return tickets.value;
  return tickets.value.filter(t => t.status === selectedStatus.value.toUpperCase());
});

async function handleTicketCreated(ticket) {
  try {
    fetchTickets();
    setTimeout(() => {
      fetchTickets();
    }, 150);
    setTimeout(() => {
      fetchTickets();
    }, 300);
  } catch (err) {
    console.error('Error al refrescar:', err);
  }
}

function selectTicket(ticket) {
  selectedTicket.value = ticket;
}

async function handleDelete(id) {
  try {
    await deleteTicket(id);
    selectedTicket.value = null;
  } catch (err) {
    console.error('Error al eliminar:', err);
  }
}

function handleTicketUpdated(updatedTicket) {
  const index = tickets.value.findIndex(t => t.id === updatedTicket.id);
  if (index !== -1) {
    tickets.value[index] = updatedTicket;
  }
  selectedTicket.value = null;
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.95rem;
  opacity: 0.9;
}

.main {
  display: flex;
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  gap: 2rem;
}

.sidebar {
  width: 200px;
  flex-shrink: 0;
}

.content {
  flex: 1;
}

.loading, .error, .empty {
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 8px;
  margin-top: 1rem;
}

.error {
  color: #d32f2f;
  background: #ffebee;
}

.empty {
  color: #666;
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
}

.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}
</style>
