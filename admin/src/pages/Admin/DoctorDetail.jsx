import React, { useContext, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedDoctor, getDoctorById, appointments, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getDoctorById(id);
    if (appointments.length === 0) getAllAppointments();
  }, [id]);

  const doctorAppointments = useMemo(() => {
    return appointments.filter(a => a.docId === id).reverse();
  }, [id, appointments]);

  if (!selectedDoctor) {
    return <div className="m-5">Cargando doctor...</div>;
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <img src={assets.arrow_left} alt="Volver" className="w-8 h-8 transform " />
        Volver a la lista
      </button>

      <div className="bg-white p-6 rounded-lg border border-slate-300/50 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-32 h-32 rounded-full" />
          <div className="text-gray-700">
            <p className="text-3xl font-semibold">{selectedDoctor.name}</p>
            <p className="text-lg text-primary">{selectedDoctor.email}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm">
              <div>
                <p className="font-medium">Especialidad:</p>
                <p>{selectedDoctor.speciality}</p>
              </div>
              <div>
                <p className="font-medium">Grado:</p>
                <p>{selectedDoctor.degree}</p>
              </div>
              <div>
                <p className="font-medium">Experiencia:</p>
                <p>{selectedDoctor.experience} años</p>
              </div>
              <div>
                <p className="font-medium">Tarifas:</p>
                <p>{currency}{selectedDoctor.fees}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
            <p className="font-medium">Sobre el Doctor:</p>
            <p>{selectedDoctor.about}</p>
        </div>
      </div>

      <p className="mb-3 text-lg font-medium">Historial de Reservas ({doctorAppointments.length})</p>
      <div className="bg-white border border-slate-300/50 rounded text-sm max-h-[60vh] overflow-scroll">
        <div className="hidden sm:grid grid-cols-[3fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-slate-300">
          <p>Paciente</p>
          <p>Fecha y Hora</p>
          <p>Estado</p>
          <p>Precio</p>
        </div>
        {doctorAppointments.map((app, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-[3fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-slate-300 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <img src={app.userData.image} alt={app.userData.name} className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-gray-800 font-medium">{app.userData.name}</p>
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
        {doctorAppointments.length === 0 && (
          <p className="text-center text-gray-500 p-10">Este doctor aún no tiene reservas.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;
