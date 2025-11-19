import React, { useContext, useEffect, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const PatientsList = () => {
  const {
    aToken,
    patients,
    getAllPatients,
    appointments,
    getAllAppointments,
  } = useContext(AdminContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllPatients();
      getAllAppointments();
    }
  }, [aToken]);

  // Calcular estadísticas usando useMemo para eficiencia
  const stats = useMemo(() => {
    const totalPatients = patients.length;
    const totalRejected = appointments.filter(a => a.cancelled).length;
    const totalApproved = appointments.filter(a => a.isCompleted).length;
    return { totalPatients, totalRejected, totalApproved };
  }, [patients, appointments]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-4 text-lg font-medium">Gestión de Pacientes</p>

      {/* --- Tarjetas de Estadísticas --- */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100">
          <img className="w-12" src={assets.patients_icon} alt="Pacientes" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{stats.totalPatients}</p>
            <p className="text-gray-400">Pacientes Totales</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100">
          <img className="w-12" src={assets.cancel_icon} alt="Rechazadas" /> {/* Asumiendo ícono */}
          <div>
            <p className="text-xl font-semibold text-gray-600">{stats.totalRejected}</p>
            <p className="text-gray-400">Reservas Rechazadas</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100">
          <img className="w-12" src={assets.tick_icon} alt="Aprobadas" /> {/* Asumiendo ícono */}
          <div>
            <p className="text-xl font-semibold text-gray-600">{stats.totalApproved}</p>
            <p className="text-gray-400">Reservas Aprobadas</p>
          </div>
        </div>
      </div>

      {/* --- Tabla de Pacientes --- */}
      <div className="bg-white border border-slate-300/50 rounded text-sm max-h-[70vh] min-h-[50vh] overflow-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_1fr_3fr_2fr_2fr_1.5fr] grid-flow-col py-3 px-6 border-b border-slate-300">
          <p>#</p>
          <p>Foto</p>
          <p>Nombre</p>
          <p>Email</p>
          <p>Teléfono</p>
          <p>Acción</p>
        </div>
        {patients.map((patient, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_1fr_3fr_2fr_2fr_1.5fr] items-center text-gray-500 py-3 px-6 border-b border-slate-300 hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <img
              className="w-10 h-10 rounded-full"
              src={patient.image}
              alt={patient.name}
            />
            <p>{patient.name}</p>
            <p>{patient.email}</p>
            <p>{patient.phone}</p>
            <button
              onClick={() => navigate(`/patient/${patient._id}`)}
              className="bg-primary/10 text-primary text-xs font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white"
            >
              Consultar Paciente
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;