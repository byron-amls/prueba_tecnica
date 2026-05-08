<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2>Editar Ticket #{{ ticket.id }}</h2>
        <button class="btn-close" @click="closeModal">×</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label>Título</label>
          <input 
            v-model="form.title" 
            type="text"
          />
        </div>

        <div class="form-group">
          <label>Descripción</label>
          <textarea 
            v-model="form.description" 
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Estado</label>
          <select v-model="form.status">
            <option value="pending">Pendiente</option>
            <option value="in_progress">En Progreso</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="closeModal">
            Cancelar
          </button>
          <button type="submit" class="btn-save" :disabled="submitting">
            {{ submitting ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useTickets } from '../composables/useTickets.js';

const props = defineProps({ ticket: Object });
const emit = defineEmits(['close', 'updated']);
const { updateTicket } = useTickets();

const isOpen = ref(true);
const submitting = ref(false);
const error = ref(null);
const form = reactive({
  title: '',
  description: '',
  status: ''
});

watch(() => props.ticket, (ticket) => {
  if (ticket) {
    form.title = ticket.title;
    form.description = ticket.description;
    form.status = ticket.status;
  }
}, { immediate: true });

function closeModal() {
  isOpen.value = false;
  emit('close');
}

async function handleSubmit() {
  submitting.value = true;
  error.value = null;

  try {
    const updates = {};
    
    if (form.title !== props.ticket.title) {
      updates.title = form.title;
    }
    if (form.description !== props.ticket.description) {
      updates.description = form.description;
    }
    if (form.status !== props.ticket.status) {
      updates.status = form.status;
    }

    const result = await updateTicket(props.ticket.id, updates);
    emit('updated', result);
    closeModal();
  } catch (err) {
    error.value = err.message;
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  sticky: top;
  background: white;
}

.modal-header h2 {
  font-size: 1.2rem;
  color: #333;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
}

.btn-close:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  padding: 0.75rem;
  background: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: #f9f9f9;
}

.btn-cancel,
.btn-save {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #eee;
  color: #333;
}

.btn-cancel:hover {
  background: #ddd;
}

.btn-save {
  background: #667eea;
  color: white;
}

.btn-save:hover:not(:disabled) {
  background: #5568d3;
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
