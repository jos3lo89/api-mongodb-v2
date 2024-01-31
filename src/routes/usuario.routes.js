import { Router } from "express";
import {
  mostrarUsuario,
  mostrarUsuarioId,
  guardarUsuario,
  actualizarUsuarioId,
  borrarUsuarioId,
  buscarUsuario
} from "../controllers/usuarioC.js";

const router = Router();

router.get("/ping", (req, res) => {
  res.json({ mensaje: "pong" });
});
router.get("/usuario", mostrarUsuario);
router.get("/usuario/:id", mostrarUsuarioId);
router.post("/usuario", guardarUsuario);
router.put("/usuario/:id", actualizarUsuarioId);
router.delete("/usuario/:id", borrarUsuarioId);
router.get("/buscar", buscarUsuario);


export default router