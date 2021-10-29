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

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket => {

  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Данные некорректны')
    }

    socket.join(data.room)
    cb({userId: socket.id})
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))
    // for other users in the room
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел`))
  })
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
