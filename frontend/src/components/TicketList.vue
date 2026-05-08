<template>
  <div class="ticket-list">
    <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card" @click="$emit('ticket-click', ticket)">
      <div class="ticket-header">
        <h3>{{ ticket.title }}</h3>
        <span :class="['badge', ticket.status]">{{ formatStatus(ticket.status) }}</span>
      </div>
      <p class="ticket-desc">{{ ticket.description }}</p>
      <div class="ticket-footer">
        <span class="ticket-id">#{{ ticket.id }}</span>
        <span class="ticket-date">{{ formatDate(ticket.created_at) }}</span>
        <button class="btn-delete" @click.stop="$emit('delete', ticket.id)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ tickets: Array });
defineEmits(['ticket-click', 'delete']);

function formatStatus(status) {
  const map = {
    pending: 'Pendiente',
    in_progress: 'En Progreso',
    completed: 'Completado'
  };
  return map[status] || status;
}

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-ES', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>

<style scoped>
.ticket-list {
  display: grid;
  gap: 1rem;
}

.ticket-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.ticket-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.ticket-card.pending {
  border-left-color: #f39c12;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.ticket-header h3 {
  font-size: 1.1rem;
  color: #333;
  flex: 1;
}

.badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  color: white;
}

.badge.pending {
  background: #f39c12;
}

.badge.in_progress {
  background: #3498db;
}

.badge.completed {
  background: #2ecc71;
}

.ticket-desc {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #999;
  padding-top: 0.8rem;
  border-top: 1px solid #eee;
}

.ticket-id {
  font-weight: 600;
  color: #667eea;
}

.btn-delete {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.btn-delete:hover {
  background: #b71c1c;
}
</style>
