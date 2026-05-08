<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id" :style="{ opacity: task.status === 'completada' ? 0.6 : 1 }">
        <span :class="['status', task.status]">{{ task.status }}</span>
        <strong>{{ task.title }}</strong> - {{ task.description }}
        <button @click="$emit('edit-task', task)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  tasks: Array
});
</script>

<style scoped>
.status {
  display: inline-block;
  width: 80px;
  text-align: center;
  border-radius: 4px;
  margin-right: 8px;
  color: #fff;
}
.status.pendiente {
  background: #f39c12;
}
.status[.en\ progreso], .status.en\ progreso {
  background: #3498db;
}
.status.completada {
  background: #2ecc71;
}
</style>
