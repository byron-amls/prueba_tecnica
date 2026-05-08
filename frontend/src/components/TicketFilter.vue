<template>
  <div class="filter-panel">
    <h3>Filtrar</h3>
    
    <div class="filter-group">
      <label>Estado</label>
      <select v-model="localStatus" @change="updateFilter">
        <option value="">Todos</option>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En Progreso</option>
        <option value="completed">Completado</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ status: String });
const emit = defineEmits(['update:status']);
const localStatus = ref(props.status || '');

function updateFilter() {
  emit('update:status', localStatus.value);
}

watch(() => props.status, (newVal) => {
  localStatus.value = newVal || '';
});
</script>

<style scoped>
.filter-panel {
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.filter-panel h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
}

.filter-group select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
</style>
