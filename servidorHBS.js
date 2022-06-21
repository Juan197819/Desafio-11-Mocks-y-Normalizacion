import express from 'express';
import exphbs from 'express-handlebars';
import {Server as HttpServer} from "http";
import {Server as IOServer} from "socket.io";
import lista from './prodAleatorios.js'
import {daoMensaje } from './src/index.js';
import normalizado from './normalizado.js'

const app= express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.engine('handlebars',exphbs.engine())
app.use(express.static('views'))

app.set('view engine','handlebars')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true})) 

//-----------------------GET-----------------------

app.get('/',(req, res) => {
    
  console.log('peticion GET');
  res.render("formulario");
})

app.get('/api/productos-test',(req, res) => {
    
  let tablaProductos=lista()
  console.log('peticion GET');
  res.render("tablaAleatoria", {tablaProductos});
})

//------------------WEBSOCKETS------------------------------

let mensajes1=[]
let productos1=[]
let mensajesNormalizados;

io.on("connection", (socket) => { 
  console.log("Usuario Conectado");

  if (!mensajes1.length) {
    mensajesNormalizados=[]
  } else {
    mensajesNormalizados= normalizado(mensajes1)
  }
  socket.emit("mensajes",mensajesNormalizados);
  
  socket.on("mensajeNuevo", (newMessage) => {
    mensajes1.push(newMessage);
    mensajesNormalizados= normalizado(mensajes1)

    daoMensaje.guardar(newMessage)
    io.sockets.emit("mensajes", mensajesNormalizados);
  });
});

//---------------SERVER LISTEN------------------------------

const PORT=process.env.PORT || 8080; 

const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor con Websockets en el puerto ${connectedServer.address().port}`);
});

connectedServer.on("error", (error) =>
  console.log(`El error fue el siguiente ${error}`)
);
