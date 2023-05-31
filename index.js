const express = require("express");
const { dbConnection } = require("./database/config.js");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const {Server} = require("socket.io")
const http = require("http")


const app = express();

//base de datos
dbConnection();

const headers = {
  origin: "*",
  METHOD: ["GET", "POST"],
};
//Middlewares
app.use(cors(headers));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Creamos el servidor con el módulo http de node
const server = http.createServer(app);
//Utilizamos como servidor el proporcionado por socket.io. Configuramos cors indicando que cualquier servidor se puede conectar
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //console.log('user connected')
  //console.log(socket.id)

  socket.on("message", (message, nickname) => {
    console.log(message);
    //Envio al resto de clientes con broadcast.emit
    socket.broadcast.emit("message", {
      body: message,
      from: nickname
    });
  });
});

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/message"));
app.use("/api", require("./routes/usuarios"));

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto", process.env.PORT);
});
