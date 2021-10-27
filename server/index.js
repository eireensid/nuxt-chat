require("dotenv").config();

// Подключаем бэкенд на Express.
const express = require("express");
const app = express();
const server = require('http').createServer(app)
app.use(express.json());

const io = require('socket.io')(server, {
  cors: {
      origin: process.env.BASE_URL,
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
})

io.on('connection', socket => {
  console.log('IO Connected')
})

// Подключаем Mongoose и делаем коннект к базе данных.
// Прописываем стандартные настройки Mongoose.
const mongoose = require("mongoose");
mongoose.Schema.Types.Boolean.convertToFalse.add("");
mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Подключаем маршруты для управления моделью Page.
const pageRoutes = require("./routes/page");
app.use("/api/page", pageRoutes);

// Подключаем Nuxt в режиме nuxt.render. В этом примере нет отдельного процесса с Nuxt.
// Nuxt работает в качестве middleware для Express без своего сервера на Connect.
const { loadNuxt, build } = require("nuxt");
const isDev = process.env.NODE_ENV !== "production";
async function start() {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");
  app.use(nuxt.render);
  if (isDev) {
    build(nuxt);
  }
  server.listen(process.env.PORT);
}

// Запуск приложения.
start();
