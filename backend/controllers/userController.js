import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";


// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "ingrese un correo válido" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "ingrese una contraseña fuerte",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "El usuario no existe" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {  name, phone, dob, gender, address } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender || !address) {
      return res.json({ success: false, message: "Faltan detalles de texto" });
    }

    const updateData = {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address), // Parsear el string 'address'
    };

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      updateData.image = imageUpload.secure_url;
     

      
    }
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true, // Para que devuelva el documento actualizado
    }).select("-password");

    res.json({
      success: true,
      message: "Perfil actualizado con éxito",
      userData: updatedUser, // Enviar datos actualizados al frontend
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to Book appointment
const bookAppointment = async (req,res) => {

  try {

    const {  docId, slotDate, slotTime} = req.body
    const userId = req.userId;
    const docData = await doctorModel.findById(docId).select("-password")

    if (!docData.available) {
      return res.json({success:false, message:"El doctor no está disponible en este momento"})
    }

    let slots_booked = docData.slots_booked 

    // cheking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({success:false, message:"El espacio ya está reservado, elija otro espacio"})
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password")

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success:true, message:"Cita reservada con éxito"})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
try {
  
  const userId = req.userId;
  const appointments = await appointmentModel.find({userId});

  res.json({success:true, appointments})


} catch (error) {
  console.log(error);
    res.json({ success: false, message: error.message });
}
}

// API to cancel appointment
const cancelAppointment = async (req,res) => {

  try {
    
    const { appointmentId} = req.body;
    const userId = req.userId;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointments existence
    if (!appointmentData) {
      return res.json({ success: false, message: "Cita no encontrada" });
    }

    // verify appointments user
    if (appointmentData.userId.toString() !== userId) {
      return res.json({success:false, message:"No autorizado a cancelar esta cita"})
      
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

    // releasing doctor slot

    const {docId, slotDate, slotTime} = appointmentData;
    const doctorData = await doctorModel.findById(docId)
    
    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success:true, message:"Cita cancelada con éxito"})



  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};




export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment};
