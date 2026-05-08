# Support Ticket System - Technical Test

Sistema interno de tickets para soporte técnico. Prueba técnica realista para desarrollador web fullstack junior/intermedio.

## Stack

- **Frontend**: Vue 3 (Composition API), Vite
- **Backend**: Node.js, Express
- **Base de datos**: SQLite
- **Requisitos**: Node.js 18+ (sin Docker)

## Quick Start

### 1. Backend

```bash
cd backend
npm install
npm run seed
npm start
```

**URL**: http://localhost:3001

### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

**URL**: http://localhost:5173

## Funcionalidad

- ✅ Listar tickets (con filtro por estado)
- ✅ Crear tickets
- ✅ Editar tickets
- ✅ Eliminar tickets
- ✅ Estados: pending, in_progress, completed
- ✅ 16 registros de ejemplo seed

## Estructura

```
.
├── backend/
│   ├── controllers/        # Lógica de tickets
│   ├── middleware/         # Error handler, logger
│   ├── routes/             # Rutas de API
│   ├── lib/                # Database setup
│   ├── scripts/            # Seed inicial
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── composables/    # useTickets hook
│   │   ├── App.vue
│   │   └── main.js
│   └── index.html
└── database/
    └── tickets.db         # SQLite (creado al seed)
```

## API

### GET /api/tickets
Lista tickets. Parámetros opcionales:
- `status`: pending | in_progress | completed

Respuesta: `[{ id, title, description, status, created_at, updated_at }, ...]`

### POST /api/tickets
Crear ticket.

Body:
```json
{
  "title": "Bug en login",
  "description": "Usuarios no pueden hacer login"
}
```

### PUT /api/tickets/:id
Editar ticket.

Body:
```json
{
  "title": "...",
  "description": "...",
  "status": "in_progress"
}
```

### DELETE /api/tickets/:id
Eliminar ticket.

## Notas Importantes

- Sin autenticación
- Sin TypeScript
- Sin Docker
- Base de datos SQLite local
- Incluye datos seed ejemplo
- Sistema ya usable (pero con detalles por pulir)

## Lo que observarás

El sistema es funcional pero tiene algunos detalles por revisar/mejorar durante la prueba técnica. Es un proyecto real de alguien más que necesita mantenimiento.
