<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" placeholder="Título" required />
    <input v-model="description" placeholder="Descripción" />
    <select v-model="status" required>
      <option value="pendiente">Pendiente</option>
      <option value="en progreso">En progreso</option>
      <option value="completada">Completada</option>
    </select>
    <button type="submit">Guardar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['task-created']);
const title = ref('');
const description = ref('');
const status = ref('pendiente');

async function handleSubmit() {
  await fetch('http://localhost:3001/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.value, description: description.value, status: status.value })
  });
  title.value = '';
  description.value = '';
  status.value = 'pendiente';
  emit('task-created');
}
</script>
