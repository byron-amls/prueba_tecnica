<template>
  <div>
    <label>Filtrar por estado:</label>
    <select v-model="selected" @change="$emit('update:status', selected)">
      <option value="">Todos</option>
      <option value="pendiente">Pendiente</option>
      <option value="en progreso">En progreso</option>
      <option value="completada">Completada</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({ status: String });
const selected = ref(props.status || '');
watch(() => props.status, v => selected.value = v);
</script>
