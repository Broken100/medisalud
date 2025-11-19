import React, { useContext, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext'; // Importar el AppContext global
import { assets } from '../../assets/assets';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Contexto del Admin para datos
  const { selectedPatient, getPatientById, appointments, getAllAppointments } = useContext(AdminContext);
  
  // Contexto de App para formateo
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    // Cargar datos si no están
    getPatientById(id);
    if (appointments.length === 0) getAllAppointments();
  }, [id]);

  // Encontrar las reservas del paciente
  const patientAppointments = useMemo(() => {
    return appointments.filter(a => a.userId === id).reverse(); // .reverse() para mostrar las más nuevas primero
  }, [id, appointments]);

  if (!selectedPatient) {
    return <div className="m-5">Cargando paciente...</div>;
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <img src={assets.arrow_left} alt="Volver" className="w-8 h-8 transform " /> {/* Asumiendo ícono de flecha */}
        Volver a la lista
      </button>

      {/* --- Perfil del Paciente --- */}
      <div className="bg-white p-6 rounded-lg border border-slate-300/50 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img src={selectedPatient.image} alt={selectedPatient.name} className="w-32 h-32 rounded-full" />
          <div className="text-gray-700">
            <p className="text-3xl font-semibold">{selectedPatient.name}</p>
            <p className="text-lg text-primary">{selectedPatient.email}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm">
              <div>
                <p className="font-medium">Teléfono:</p>
                <p>{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="font-medium">Nacimiento:</p>
                <p>{selectedPatient.dob} ({calculateAge(selectedPatient.dob)} años)</p>
              </div>
              <div>
                <p className="font-medium">Género:</p>
                <p>{selectedPatient.gender}</p>
              </div>
              <div>
                <p className="font-medium">Dirección:</p>
                <p>{selectedPatient.address.line1}, {selectedPatient.address.line2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Historial de Reservas del Paciente --- */}
      <p className="mb-3 text-lg font-medium">Historial de Reservas ({patientAppointments.length})</p>
      <div className="bg-white border border-slate-300/50 rounded text-sm max-h-[60vh] overflow-scroll">
        <div className="hidden sm:grid grid-cols-[3fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-slate-300">
          <p>Doctor</p>
          <p>Fecha y Hora</p>
          <p>Estado</p>
          <p>Precio</p>
        </div>
        {patientAppointments.map((app, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-[3fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-slate-300 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <img src={app.docData.image} alt={app.docData.name} className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-gray-800 font-medium">{app.docData.name}</p>
                <p className="text-xs">{app.docData.speciality}</p>
              </div>
            </div>
            <p>{slotDateFormat(app.slotDate)} | {app.slotTime}</p>
            <div>
              {app.cancelled ? (
                <p className="text-red-500 font-medium">Cancelada</p>
              ) : app.isCompleted ? (
                <p className="text-green-500 font-medium">Completada</p>
              ) : (
                <p className="text-blue-500 font-medium">Pendiente</p>
              )}
            </div>
            <p>{currency}{app.amount}</p>
          </div>
        ))}
        {patientAppointments.length === 0 && (
          <p className="text-center text-gray-500 p-10">Este paciente aún no tiene reservas.</p>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;