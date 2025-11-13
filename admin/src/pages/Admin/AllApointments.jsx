import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllApointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    adminCancelAppointment,
    adminCompleteAppointment
  } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getAllAppointments();
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Todas las Reservas</p>

      <div className="bg-white border border-slate-300/50 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-slate-300">
          <p>#</p>
          <p>Paciente</p>
          <p>Edad</p>
          <p>Fecha y Hora</p>
          <p>Doctores</p>
          <p>Precio</p>
          <p>Acciones</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-slate-300 hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt=""
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelado</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completado</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => adminCancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => adminCompleteAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;
