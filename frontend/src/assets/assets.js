import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.jpg";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import Medicina_General from "./Medicina_General.svg";
import Ginecologia from "./Ginecologia.svg";
import Obstetricia from "./Obstetricia.svg";
import Fisioterapia from "./Fisioterapia.svg";
import Quiropraxia from "./Quiropraxia.svg";
import Nutricion from "./Nutricion.svg";
import Pediatria from "./Pediatria.svg";
import Cirugia_Plastica from "./Cirugia_Plastica.svg";
import Psicologia from "./Psicologia.svg";
import Odontologia from "./Odontologia.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "Medicina General",
    name: "Medicina General",
    image: Medicina_General,
  },
  {
    speciality: "Ginecologia",
    name: "Ginecología",
    image: Ginecologia,
  },
  {
    speciality: "Obstetricia",
    name: "Obstetricia",
    image: Obstetricia,
  },
  {
    speciality: "Fisioterapia",
    name: "Fisioterapia",
    image: Fisioterapia,
  },
  {
    speciality: "Quiropraxia",
    name: "Quiropraxia",
    image: Quiropraxia,
  },
  {
    speciality: "Nutricion",
    name: "Nutrición",
    image: Nutricion,
  },
  {
    speciality: "Pediatria",
    name: "Pediatría",
    image: Pediatria,
  },
  {
    speciality: "Cirugia",
    name: "Cirugía",
    image: Cirugia_Plastica,
  },
  {
    speciality: "Psicologia",
    name: "Psicología",
    image: Psicologia,
  },
  {
    speciality: "Odontologia",
    name: "Odontología",
    image: Odontologia,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Ramiro Ruíz",
    image: doc1, 
    speciality: "Medicina General",
    degree: "Médico Cirujano, Esp. en Medicina Familiar",
    experience: "+ 10 años",
    about:
      "Profesional con +10 años de experiencia en medicina familiar, enfocado en la atención integral y preventiva para pacientes de todas las edades. Comprometido con un diagnóstico preciso y un trato humano.",
    fees: 30, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Kevin Ruiz",
    image: doc2,
    speciality: "Medicina General",
    degree: "Médico General",
    experience: "+3 Años",
    about:
      "Médico general dedicado a la atención primaria, con +3 años de experiencia. Enfocado en el diagnóstico y tratamiento de patologías comunes y en la promoción de un estilo de vida saludable.",
    fees: 25, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc3",
    name: "Dra. Anabel Lopez",
    image: doc3,
    speciality: "Medicina General",
    degree: "Médico General",
    experience: "+3 Años",
    about:
      "Profesional de la medicina general con +3 años de experiencia, brindando atención médica de calidad y personalizada. Habilidad en el manejo de pacientes crónicos y agudos.",
    fees: 25, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc4",
    name: "Dra. Leonela Urdaneta",
    image: doc4,
    speciality: ["Ginecologia", "Obstetricia"], 
    degree: "Médico Especialista en Ginecología y Obstetricia",
    experience: "+8 Años",
    about:
      "Especialista con +8 años de experiencia en la salud integral de la mujer. Dedicada al cuidado ginecológico, control prenatal y atención de partos, con un enfoque respetuoso y profesional.",
    fees: 35, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc5",
    name: "Obs. Sandro Calán",
    image: doc5,
    speciality: ["Ginecologia", "Obstetricia"],
    degree: "Obstetra",
    experience: "+9 Años", 
    about:
      "Obstetra con +9 años de experiencia, especializado en el acompañamiento integral durante el embarazo, parto y postparto. Enfocado en la salud materna y el bienestar fetal.",
    fees: 35, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Victor Rojas",
    image: doc6,
    speciality: "Cirugia",
    degree: "Médico Cirujano General",
    experience: "+10 Años",
    about:
      "Cirujano general con +10 años de trayectoria, especializado en procedimientos quirúrgicos. Comprometido con la seguridad del paciente y la aplicación de técnicas avanzadas.",
    fees: 40, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc7",
    name: "Msc. Ingrid Ruiz",
    image: doc7,
    speciality: "Nutricion",
    degree: "Magíster en Nutrición y Dietética",
    experience: "+5 Años",
    about:
      "Nutricionista con +5 años de experiencia, enfocada en la creación de planes alimenticios personalizados para la prevención y tratamiento de enfermedades. Promotora de una alimentación saludable.",
    fees: 30, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc8",
    name: "Dra. Ana Lucia Gomez",
    image: doc8,
    speciality: "Pediatria",
    degree: "Médico Pediatra, Subespecialista en Neonatología",
    experience: "+10 Años",
    about:
      "Especialista con +10 años de experiencia en el cuidado de la salud infantil, desde recién nacidos hasta adolescentes. Dedicada a la neonatología y al desarrollo saludable del niño.",
    fees: 35, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Sebastian Salazar",
    image: doc9,
    speciality: "Cirugia",
    degree: "Médico Especialista en Cirugía Cardiovascular",
    experience: "+ 10 Años",
    about:
      "Cirujano cardiovascular con +10 de experiencia en el diagnóstico y tratamiento de enfermedades del corazón y vasos sanguíneos. Comprometido con la excelencia quirúrgica.",
    fees: 50, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc10",
    name: "Psc. Ivonne Anrango",
    image: doc10,
    speciality: "Psicologia",
    degree: "Psicóloga Clínica",
    experience: "+5 Años",
    about:
      "Psicóloga clínica con +5 años de experiencia en evaluación, diagnóstico y tratamiento de trastornos psicológicos. Ofrece terapia individual y de pareja con un enfoque empático.",
    fees: 30, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc11",
    name: "Dr. William Cuasatar",
    image: doc11,
    speciality: "Odontologia",
    degree: "Odontólogo",
    experience: "+ 10 Años",
    about:
      "Odontólogo general con +10 años de práctica, dedicado a la salud bucodental integral. Experto en diagnósticos, tratamientos preventivos y restaurativos para una sonrisa saludable.",
    fees: 25, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc12",
    name: "Qrx. Aldrin Vela",
    image: doc12,
    speciality: "Quiropraxia",
    degree: "Quiropráctico",
    experience: "+ 5 Años",
    about:
      "Quiropráctico con +5 años de experiencia, especializado en el diagnóstico y tratamiento de trastornos neuromusculoesqueléticos. Enfocado en el alivio del dolor y la restauración de la movilidad.",
    fees: 30, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
  {
    _id: "doc13",
    name: "Lic. Liseth Carvajal",
    image: doc13,
    speciality: "Fisioterapia",
    degree: "Licenciada in Fisioterapia",
    experience: "+5 Años",
    about:
      "Fisioterapeuta con +5 años de experiencia en la rehabilitación física y funcional. Dedicada a diseñar planes de tratamiento personalizados para la recuperación de lesiones y la mejora de la calidad de vida.",
    fees: 30, 
    address: {
      line1: "MediSalud",
      line2:
        "MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y, Ulpiano Navarro, Otavalo 100450, Ecuador",
    },
  },
];
