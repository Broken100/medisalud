import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // cheking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      if (!imageFile) {
        return res.json({ success: false, message: "La imagen es requerida" });
      }
      return res.json({ success: false, message: "Faltan detalles" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Ingrese un correo válido" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Ingrese una contraseña fuerte",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPasword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Añadido" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API For admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ id: email }, process.env.JWT_SECRET);
      res.json({ success: true, token: token }); // Envía el token con el prefijo
    } else {
      res.json({ success: false, message: "Credenciales Incorrectos" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for appointment cancellation
// API to cancel appointment
const appointmentCancel = async (req,res) => {

  try {
    
    const { appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointments existence
    if (!appointmentData) {
      return res.json({ success: false, message: "Cita no encontrada" });
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

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {

  try {
    
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }

    res.json({ success: true, dashData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

} ;

// API for admin management appointments
const adminCancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // 1. Marcar la cita como cancelada
    const appointmentData = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { cancelled: true },
      { new: true } // Devuelve el documento actualizado
    );

    if (!appointmentData) {
      return res.json({ success: false, message: "Cita no encontrada" });
    }

    // 2. Liberar el espacio del doctor (igual que en tu otra función)
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
    
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Cita cancelada por el Admin" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// NUEVA API para que el Admin COMPLETE cualquier cita
const adminCompleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // 1. Marcar la cita como completada
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });

    res.json({ success: true, message: "Cita completada por el Admin" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, adminCancelAppointment, adminCompleteAppointment };
