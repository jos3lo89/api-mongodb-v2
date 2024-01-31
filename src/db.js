import mongoose from "mongoose";

const conexion = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/portafolio", {});
    console.log("DB is connected");
  } catch (error) {
    console.log("Error connected", error.message);
  }
};

export default conexion;
