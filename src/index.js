import express from "express";
import conexion from "./db.js";
import router from "./routes/usuario.routes.js";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());

app.use(router);

app.use((req, res, next) => {
  res.json({
    mensaje: "Ruta no disponible",
  });
});

app.listen(3000, () => {
  console.log("sever on port: 3000");
});

conexion();
