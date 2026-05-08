<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h2>Crear Nuevo Ticket</h2>
    
    <div class="form-group">
      <label>Título *</label>
      <input 
        v-model="form.title" 
        type="text" 
        placeholder="Descripción breve del problema"
        required
      />
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <textarea 
        v-model="form.description" 
        placeholder="Información detallada del problema"
        rows="4"
      ></textarea>
    </div>

    <button type="submit" class="btn-submit" :disabled="submitting">
      {{ submitting ? 'Creando...' : 'Crear Ticket' }}
    </button>

    <div v-if="error" class="error-message">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTickets } from '../composables/useTickets.js';

const { createTicket, fetchTickets } = useTickets();
const emit = defineEmits(['ticket-created']);

const form = ref({ title: '', description: '' });
const submitting = ref(false);
const error = ref(null);

async function handleSubmit() {
  submitting.value = true;
  error.value = null;

  try {
    await createTicket(form.value.title, form.value.description);
    form.value = { title: '', description: '' };
    
    emit('ticket-created');
  } catch (err) {
    error.value = err.message;
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.form-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.form-container h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-submit {
  background: #667eea;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}

.btn-submit:hover:not(:disabled) {
  background: #5568d3;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
