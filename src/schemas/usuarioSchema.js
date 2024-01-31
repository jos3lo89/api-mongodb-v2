import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    usuario: { type: String, required: true, minlength: 6 },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    clave: { type: String, required: true, minlength: 8 },
    foto: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const usuarioModelo = mongoose.model("usuario", usuarioSchema);

export default usuarioModelo;
