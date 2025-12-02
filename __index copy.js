import express from "express"
import cors from "cors"
import rutasProductos from "./src/routes/products.routes.js"
import rutasLog from "./src/routes/auth.routes.js"
import { authentication} from "./src/middleware/authentication.js"


const app = express()
const PORT = process.env.PORT || 3000;

const corsConfig = {
    origin: [
        'http://localhost:3000', 
        'https://midominio.com' , 
        'https://ikenobo-njs-terminal-production.up.railway.app',
        'https://ikenoboterminal.netlify.app'], // dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                  // métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],          // cabeceras permitidas
    exposedHeaders: ['Content-Length'],                         // cabeceras visibles al cliente
    credentials: true,                                          // habilitar credenciales
    maxAge: 600,                                                // cache preflight
    optionsSuccessStatus: 204                                   // respuesta preflight exitosa
}

//const objeto = {
//    clave : "valor"
//}
app.use(cors(corsConfig))
app.use(express.json());

// FRONT
app.use(express.static("public"));

// LOGIN (sin token)
app.use("/api/login", rutasLog);

//app.use(authentication);
// PRODUCTOS q necesitan token
app.use("/api/products", authentication, rutasProductos);

// LOG DE REQUESTS
app.use((req, res, next) => {
    console.log(`Datos received at:  ${req.method} ${req.url}`);
    next();
});

//app.use("/api", rutasProductos)
// 404
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida');
});

// start server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

