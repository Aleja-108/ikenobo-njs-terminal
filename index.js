import express from "express";
import cors from "cors";
import rutasProductos from "./src/routes/products.routes.js";
import rutasLog from "./src/routes/auth.routes.js";
import { authentication } from "./src/middleware/authentication.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://midominio.com",
    "https://ikenobo-njs-terminal-production.up.railway.app",
    "https://ikenoboterminal.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length"],
  credentials: true,
  maxAge: 600,
  optionsSuccessStatus: 204
};

app.use(cors(corsConfig));
app.use(express.json());

// FRONTEND estático (Netlify no lo usa, pero si corrés local sí)
app.use(express.static("public"));

// LOGIN (sin token) → debe existir en auth.routes.js como router.post("/")
app.use("/api/login", rutasLog);

// PRODUCTOS (con token)
app.use("/api/products", authentication, rutasProductos);

// LOG de requests
app.use((req, res, next) => {
  console.log(`Datos received at: ${req.method} ${req.url}`);
  next();
});

// Middleware de 404 (si ninguna ruta coincide)
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado o ruta inválida" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});