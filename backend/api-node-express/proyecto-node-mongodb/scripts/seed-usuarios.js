/**
 * Script de SEED — Usuarios de prueba para evaluación
 *
 * Crea (o verifica) usuarios de prueba:
 *  - 1 Admin de prueba (nuevo)
 *  - Migra admin real (admin_321@hotmail.com) si su contraseña aún no está hasheada
 *  - 1 Estudiante de prueba
 *  - 1 Docente de prueba
 *
 * EJECUCIÓN:
 *   node scripts/seed-usuarios.js
 *
 * Es IDEMPOTENTE: si el usuario ya existe con hash, lo omite.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/database_proyecto_final';

// ── Schemas ──────────────────────────────────────────────────────
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

// ── Helper: detectar si una cadena ya es un hash bcrypt ──────────
function esHashBcrypt(str) {
  return str && str.startsWith('$2');
}

// ── Datos de prueba ───────────────────────────────────────────────
const ADMIN_REAL = {
  correo_electronico: 'admin_321@hotmail.com',
  contraseña_plana: 'qTg_!32$Wr',
};

const USUARIOS_PRUEBA = {
  admin: {
    correo_electronico: 'admin_prueba@edutech.pe',
    contraseña: 'Admin123!',
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

  // ── 0. Migrar admin real si su contraseña es texto plano ──────
  console.log('🔑 Verificando admin real (admin_321@hotmail.com)...');
  const adminReal = await Administrador.findOne({ correo_electronico: ADMIN_REAL.correo_electronico });
  if (!adminReal) {
    console.log('  ⚠️  Admin real no encontrado en la BD. Créalo manualmente o verifica la conexión.');
  } else if (esHashBcrypt(adminReal.contraseña)) {
    console.log('  ✅ Admin real ya tiene contraseña hasheada. Sin cambios.');
  } else {
    const hash = await bcrypt.hash(ADMIN_REAL.contraseña_plana, SALT_ROUNDS);
    adminReal.contraseña = hash;
    await adminReal.save();
    console.log('  🔐 Contraseña del admin real migrada a bcrypt.');
  }

  // ── 1. Admin de prueba ─────────────────────────────────────────
  console.log('\n🛡️  Procesando usuario admin de prueba...');
  const adminExiste = await Administrador.findOne({ correo_electronico: USUARIOS_PRUEBA.admin.correo_electronico });
  if (adminExiste) {
    console.log(`  ⏭️  Ya existe: ${USUARIOS_PRUEBA.admin.correo_electronico}`);
  } else {
    const hash = await bcrypt.hash(USUARIOS_PRUEBA.admin.contraseña, SALT_ROUNDS);
    await Administrador.create({ correo_electronico: USUARIOS_PRUEBA.admin.correo_electronico, contraseña: hash });
    console.log(`  ✅ Creado: ${USUARIOS_PRUEBA.admin.correo_electronico}`);
  }

  // ── 2. Estudiante de prueba ────────────────────────────────────
  console.log('\n👨‍🎓 Procesando usuario estudiante de prueba...');
  const estudianteExiste = await UsuarioEstudiante.findOne({ correo_electronico: USUARIOS_PRUEBA.estudiante.correo_electronico });
  if (estudianteExiste) {
    // Si ya existe pero sin hash, migrar
    if (!esHashBcrypt(estudianteExiste.contraseña)) {
      const hash = await bcrypt.hash(USUARIOS_PRUEBA.estudiante.contraseña, SALT_ROUNDS);
      estudianteExiste.contraseña = hash;
      await estudianteExiste.save();
      console.log(`  🔐 Contraseña del estudiante actualizada a bcrypt.`);
    } else {
      console.log(`  ⏭️  Ya existe: ${USUARIOS_PRUEBA.estudiante.correo_electronico}`);
    }
  } else {
    const hash = await bcrypt.hash(USUARIOS_PRUEBA.estudiante.contraseña, SALT_ROUNDS);
    await UsuarioEstudiante.create({ ...USUARIOS_PRUEBA.estudiante, contraseña: hash });
    console.log(`  ✅ Creado: ${USUARIOS_PRUEBA.estudiante.correo_electronico}`);
  }

  // ── 3. Docente de prueba ───────────────────────────────────────
  console.log('\n👩‍🏫 Procesando usuario docente de prueba...');
  const docenteExiste = await UsuarioDocente.findOne({ correo_electronico: USUARIOS_PRUEBA.docente.correo_electronico });
  if (docenteExiste) {
    if (!esHashBcrypt(docenteExiste.contraseña)) {
      const hash = await bcrypt.hash(USUARIOS_PRUEBA.docente.contraseña, SALT_ROUNDS);
      docenteExiste.contraseña = hash;
      await docenteExiste.save();
      console.log(`  🔐 Contraseña del docente actualizada a bcrypt.`);
    } else {
      console.log(`  ⏭️  Ya existe: ${USUARIOS_PRUEBA.docente.correo_electronico}`);
    }
  } else {
    const hash = await bcrypt.hash(USUARIOS_PRUEBA.docente.contraseña, SALT_ROUNDS);
    await UsuarioDocente.create({ ...USUARIOS_PRUEBA.docente, contraseña: hash });
    console.log(`  ✅ Creado: ${USUARIOS_PRUEBA.docente.correo_electronico}`);
  }

  // ── Resumen ────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════════');
  console.log('📋 CREDENCIALES LISTAS PARA USAR:');
  console.log('══════════════════════════════════════════════════════');
  console.log('');
  console.log('  🛡️  ADMINISTRADOR (Panel Angular → /admin-dashboard)');
  console.log('      Email:      admin_321@hotmail.com');
  console.log('      Contraseña: qTg_!32$Wr');
  console.log('');
  console.log('      Email:      admin_prueba@edutech.pe');
  console.log('      Contraseña: Admin123!');
  console.log('');
  console.log('  👨‍🎓 ESTUDIANTE (Angular → /dashboard-estudiante | React → /)');
  console.log(`      Email:      ${USUARIOS_PRUEBA.estudiante.correo_electronico}`);
  console.log(`      Contraseña: ${USUARIOS_PRUEBA.estudiante.contraseña}`);
  console.log('');
  console.log('  👩‍🏫 DOCENTE (Angular → /dashboard-estudiante)');
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
