/**
 * Script de migración — Hashear contraseñas existentes en texto plano
 * 
 * EJECUCIÓN (una sola vez):
 *   node scripts/migrar-passwords.js
 *
 * Qué hace:
 *  1. Conecta a MongoDB usando el .env del directorio padre
 *  2. Busca todos los usuarios en usuario_estudiante con contraseña en texto plano
 *  3. Hashea cada contraseña con bcrypt y la actualiza en la BD
 *  4. Hace lo mismo para el administrador
 *  5. Muestra un resumen al final
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

// ── Modelos ligeros (solo para la migración) ─────────────────────
const UsuarioEstudiante = mongoose.model(
  'UsuarioEstudiante',
  new mongoose.Schema({ correo_electronico: String, contraseña: String }, { collection: 'usuario_estudiante' })
);

const Administrador = mongoose.model(
  'Administrador',
  new mongoose.Schema({ correo_electronico: String, contraseña: String }, { collection: 'administrador' })
);

// Detecta si una cadena ya es hash bcrypt (empieza con $2a$, $2b$, $2y$)
function esHashBcrypt(str) {
  return /^\$2[aby]\$\d{2}\$/.test(str);
}

async function migrar() {
  console.log('🔄 Conectando a MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Conectado.\n');

  let migradosEstudiantes = 0;
  let omitidosEstudiantes = 0;
  let migradosAdmin = 0;
  let omitidosAdmin = 0;

  // ── Migrar estudiantes ─────────────────────────────────────────
  console.log('👨‍🎓 Procesando usuarios estudiantes...');
  const estudiantes = await UsuarioEstudiante.find({});

  for (const est of estudiantes) {
    if (!est.contraseña) continue;

    if (esHashBcrypt(est.contraseña)) {
      console.log(`  ⏭️  [${est.correo_electronico}] — Ya tiene hash, omitiendo.`);
      omitidosEstudiantes++;
      continue;
    }

    const hash = await bcrypt.hash(est.contraseña, SALT_ROUNDS);
    await UsuarioEstudiante.findByIdAndUpdate(est._id, { contraseña: hash });
    console.log(`  ✅ [${est.correo_electronico}] — Contraseña hasheada.`);
    migradosEstudiantes++;
  }

  // ── Migrar administradores ─────────────────────────────────────
  console.log('\n🛡️  Procesando administradores...');
  const admins = await Administrador.find({});

  for (const admin of admins) {
    if (!admin.contraseña) continue;

    if (esHashBcrypt(admin.contraseña)) {
      console.log(`  ⏭️  [${admin.correo_electronico}] — Ya tiene hash, omitiendo.`);
      omitidosAdmin++;
      continue;
    }

    const hash = await bcrypt.hash(admin.contraseña, SALT_ROUNDS);
    await Administrador.findByIdAndUpdate(admin._id, { contraseña: hash });
    console.log(`  ✅ [${admin.correo_electronico}] — Contraseña hasheada.`);
    migradosAdmin++;
  }

  // ── Resumen ────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════');
  console.log('📊 Resumen de migración:');
  console.log(`   Estudiantes migrados: ${migradosEstudiantes}`);
  console.log(`   Estudiantes omitidos (ya hasheados): ${omitidosEstudiantes}`);
  console.log(`   Admins migrados:      ${migradosAdmin}`);
  console.log(`   Admins omitidos (ya hasheados):      ${omitidosAdmin}`);
  console.log('══════════════════════════════════════════');
  console.log('\n🎉 Migración completada. ¡Ya puedes hacer login normalmente!');

  await mongoose.disconnect();
}

migrar().catch((err) => {
  console.error('❌ Error durante la migración:', err.message);
  process.exit(1);
});
