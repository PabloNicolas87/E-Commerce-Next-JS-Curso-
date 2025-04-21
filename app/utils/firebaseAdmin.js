const admin = require('firebase-admin');
const serviceAccount = require('./keys/serviceAccountKey.json'); // Asegúrate de que la ruta sea correcta

// Inicializa la app con tus credenciales de Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Usar el archivo de clave de servicio
});

// UID del usuario al que quieres otorgar el rol de admin
const uid = 'p87DwYfeMZgpkbuW9AuaxOuObyo1';  // Reemplaza con el UID del usuario específico

// Función para establecer el claim de administrador
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`El usuario ${uid} ahora tiene el rol de administrador.`);
  })
  .catch((error) => {
    console.error('Error al asignar el rol de administrador:', error);
  });

// Función para obtener y mostrar la lista de usuarios con el claim 'admin'
async function listAdmins() {
  try {
    const result = await admin.auth().listUsers();
    const admins = result.users.filter(user => user.customClaims && user.customClaims.admin);
    
    if (admins.length > 0) {
      console.log('Usuarios con rol de administrador:');
      admins.forEach(admin => {
        console.log(`UID: ${admin.uid}, Correo: ${admin.email}`);
      });
    } else {
      console.log('No hay usuarios con rol de administrador.');
    }
  } catch (error) {
    console.error('Error al listar los usuarios:', error);
  }
}

// Llamar a la función para listar los administradores
listAdmins();
