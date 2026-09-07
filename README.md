# 🚀 Enterprise Cloud-Native Boilerplate

Arquetipo de producción diseñado para acelerar la migración de sistemas legacy hacia una arquitectura moderna, desacoplada y cloud-native. Todo el ciclo de vida está encapsulado en contenedores para garantizar un entorno Zero-Setup.

## 1. Stack Tecnológico y Arquitectura
* **Backend:** Java 17 LTS, Quarkus, Hibernate Panache, API REST, Seguridad JWT RSA256.
* **Frontend:** Node 24 LTS, Next.js (App Router), Server Actions, Tailwind CSS.
* **Infraestructura:** PostgreSQL 15, Docker, Docker Compose (Multi-stage builds).
* **CI/CD:** GitHub Actions configurado para pruebas y validación continua.

## 2. Inicio Rápido (Zero-Setup)
No necesitas tener instalados Java, Maven, Node.js ni bases de datos en tu máquina host. El único requisito es tener **Docker Desktop** (o Docker Engine con Compose v2) en ejecución.

Ejecuta el siguiente comando en la raíz del proyecto:
`docker compose up -d --build`

## 3. Puertos y Endpoints
* **Frontend (Next.js):** http://localhost:3000
* **Backend (Quarkus):** http://localhost:8080
* **Base de Datos (PostgreSQL):** localhost:5433 (Usuario: `archetype_user`, Password: `archetype_pwd`)

## 4. Flujo de Autenticación (JWT)
Puedes probar la seguridad de la API directamente:
1. **Registrar:** `POST /api/auth/register`
2. **Login:** `POST /api/auth/login`
3. **Validar Sesión:** `GET /api/users/me` (Requiere Header: `Authorization: Bearer <token>`)
