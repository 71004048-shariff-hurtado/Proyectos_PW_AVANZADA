/**
 * Script de SEED — Usuarios de prueba para evaluación
 *
 * Crea (o verifica) 3 usuarios de prueba:
 *  - 1 Administrador
 *  - 1 Estudiante
 *  - 1 Docente (colección usuario_docente, acceso vía portal Angular como estudiante con datos de docente)
 *
 * EJECUCIÓN:
 *   node scripts/seed-usuarios.js
 *
 * Es IDEMPOTENTE: si el usuario ya existe, lo omite.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/database_proyecto_final';

// ── Schemas ligeros ──────────────────────────────────────────────
const Administrador = mongoose.model(
  'Administrador',
  new mongoose.Schema({ correo_electronico: String, contraseña: String }, { collection: 'administrador' })
);

const UsuarioEstudiante = mongoose.model(
  'UsuarioEstudiante',
  new mongoose.Schema({
    nombre: String,
    apellidos: String,
    correo_electronico: String,
    programa_academico: String,
    contraseña: String,
  }, { collection: 'usuario_estudiante' })
);

// Docente usa colección separada pero misma estructura base
const UsuarioDocente = mongoose.model(
  'UsuarioDocente',
  new mongoose.Schema({
    nombre: String,
    apellidos: String,
    correo_electronico: String,
    especialidad: String,
    contraseña: String,
  }, { collection: 'usuario_docente' })
);

// ── Datos de los usuarios de prueba ─────────────────────────────
const USUARIOS_PRUEBA = {
  admin: {
    correo_electronico: 'admin_prueba@edutech.pe',
    contraseña: 'Admin123!',
    nombre: 'Administrador',
  },
  estudiante: {
    nombre: 'Juan',
    apellidos: 'Pérez García',
    correo_electronico: 'estudiante@edutech.pe',
    programa_academico: 'Ingeniería de Software',
    contraseña: 'Estudiante123!',
  },
  docente: {
    nombre: 'María',
    apellidos: 'Torres Vega',
    correo_electronico: 'docente@edutech.pe',
    especialidad: 'Desarrollo Web',
    contraseña: 'Docente123!',
  },
};

// ── Función principal ─────────────────────────────────────────────
async function seed() {
  console.log('🔄 Conectando a MongoDB:', MONGO_URI);
  await mongoose.connect(MONGO_URI);
  console.log('✅ Conectado.\n');

  // ── 1. Admin de prueba ───────────────────────────────────────
  console.log('🛡️  Procesando usuario admin...');
  const adminExiste = await Administrador.findOne({ correo_electronico: USUARIOS_PRUEBA.admin.correo_electronico });
  if (adminExiste) {
    console.log(`  ⏭️  Admin ya existe: ${USUARIOS_PRUEBA.admin.correo_electronico}`);
  } else {
    const hash = await bcrypt.hash(USUARIOS_PRUEBA.admin.contraseña, SALT_ROUNDS);
    await Administrador.create({ correo_electronico: USUARIOS_PRUEBA.admin.correo_electronico, contraseña: hash });
    console.log(`  ✅ Admin creado: ${USUARIOS_PRUEBA.admin.correo_electronico}`);
  }

  // ── 2. Estudiante de prueba ──────────────────────────────────
  console.log('\n👨‍🎓 Procesando usuario estudiante...');
  const estudianteExiste = await UsuarioEstudiante.findOne({ correo_electronico: USUARIOS_PRUEBA.estudiante.correo_electronico });
  if (estudianteExiste) {
    console.log(`  ⏭️  Estudiante ya existe: ${USUARIOS_PRUEBA.estudiante.correo_electronico}`);
  } else {
    const hash = await bcrypt.hash(USUARIOS_PRUEBA.estudiante.contraseña, SALT_ROUNDS);
    await UsuarioEstudiante.create({ ...USUARIOS_PRUEBA.estudiante, contraseña: hash });
    console.log(`  ✅ Estudiante creado: ${USUARIOS_PRUEBA.estudiante.correo_electronico}`);
  }

  // ── 3. Docente de prueba ─────────────────────────────────────
  console.log('\n👩‍🏫 Procesando usuario docente...');
  const docenteExiste = await UsuarioDocente.findOne({ correo_electronico: USUARIOS_PRUEBA.docente.correo_electronico });
  if (docenteExiste) {
    console.log(`  ⏭️  Docente ya existe: ${USUARIOS_PRUEBA.docente.correo_electronico}`);
  } else {
    const hash = await bcrypt.hash(USUARIOS_PRUEBA.docente.contraseña, SALT_ROUNDS);
    await UsuarioDocente.create({ ...USUARIOS_PRUEBA.docente, contraseña: hash });
    console.log(`  ✅ Docente creado: ${USUARIOS_PRUEBA.docente.correo_electronico}`);
  }

  // ── Resumen ──────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════════');
  console.log('📋 CREDENCIALES DE PRUEBA:');
  console.log('══════════════════════════════════════════════════════');
  console.log('');
  console.log('  🛡️  ADMINISTRADOR (Panel Angular → /admin-dashboard)');
  console.log(`      Email:      ${USUARIOS_PRUEBA.admin.correo_electronico}`);
  console.log(`      Contraseña: ${USUARIOS_PRUEBA.admin.contraseña}`);
  console.log('');
  console.log('  👨‍🎓 ESTUDIANTE (Panel Angular → /dashboard-estudiante | Portal React)');
  console.log(`      Email:      ${USUARIOS_PRUEBA.estudiante.correo_electronico}`);
  console.log(`      Contraseña: ${USUARIOS_PRUEBA.estudiante.contraseña}`);
  console.log('');
  console.log('  👩‍🏫 DOCENTE (colección usuario_docente — ver MongoDB Compass)');
  console.log(`      Email:      ${USUARIOS_PRUEBA.docente.correo_electronico}`);
  console.log(`      Contraseña: ${USUARIOS_PRUEBA.docente.contraseña}`);
  console.log('');
  console.log('══════════════════════════════════════════════════════');
  console.log('🎉 Seed completado. ¡Puedes iniciar el proyecto!');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('\n❌ Error en seed:', err.message);
  process.exit(1);
});
