const express = require('express');
const path = require('path');

const app = express();

// Middleware para evitar la advertencia de ngrok
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});

// Sirve los archivos estáticos de la build de Expo
app.use(express.static(path.join(__dirname, 'web-build')));

// Maneja todas las rutas y sirve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});