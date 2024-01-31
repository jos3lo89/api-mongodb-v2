import usuarioModelo from "../schemas/usuarioSchema.js";

export const mostrarUsuario = async (req, res) => {
  try {
    const mostrar = await usuarioModelo.find();
    if (mostrar.length === 0) {
      return res.json({ mensaje: "No hay usuario a mostrar" });
    }
    res.json(mostrar);
  } catch (error) {
    console.log("error consulta", error.message);
    res.json({ mensaje: error.message });
  }
};

export const mostrarUsuarioId = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const user = await usuarioModelo.findById(usuarioId);
    if (user === null) {
      return res.json({ mensaje: "usuario no econtrado" });
    }
    res.json(user);
  } catch (error) {
    console.log("error consulta", error.message);
    res.json({ mensaje: error.message });
  }
};

export const guardarUsuario = async (req, res) => {
  try {
    const datosUsuario = req.body;

    const consulta = await usuarioModelo.find({
      $or: [{ usuario: datosUsuario.usuario }, { correo: datosUsuario.correo }],
    });

    console.log(consulta);

    if (consulta.length > 0) {
      const mensajeError =
        consulta[0].usuario === datosUsuario.usuario
          ? "El usuario ya existe."
          : "El correo ya existe.";
      return res.status(400).json({ mensaje: mensajeError });
    }

    const guardar = await usuarioModelo.create(datosUsuario);
    res.json({ mensaje: "Usuario registrado correctamente." });
  } catch (error) {
    console.log("Error en la consulta", error.message);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const borrarUsuarioId = async (req, res) => {
  try {
    const getId = req.params.id;
    const borrar = await usuarioModelo.findByIdAndDelete(getId);
    if (borrar === null) {
      return res.json({ mensaje: "usuario ya fue borrado" });
    }
    res.json({ mensaje: "usuario borrado" });
  } catch (error) {
    console.log("error consulta", error.message);
    res.json({ mensaje: error.message });
  }
};

export const actualizarUsuarioId = async (req, res) => {
  try {
    const datos = req.body;
    const getId = req.params.id;
    const update = await usuarioModelo.findByIdAndUpdate(getId, datos);
    console.log(update);
    res.json(update);
  } catch (error) {
    console.log("error consulta", error.message);
    res.json({ mensaje: error.message });
  }
};

export const buscarUsuario = async (req, res) => {
  try {
    // http://localhost:3000/buscar?query=gamilcom
    const { query } = req.query;

    const consulta = await usuarioModelo.find({
      $or: [
        { usuario: { $regex: query, $options: "i" } },
        { nombre: { $regex: query, $options: "i" } },
        { apellido: { $regex: query, $options: "i" } },
        { correo: { $regex: query, $options: "i" } },
      ],
    });

    res.json(consulta);
  } catch (error) {
    console.log("Error en la consulta", error.message);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};
