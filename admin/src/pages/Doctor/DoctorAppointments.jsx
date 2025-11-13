import React from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment, } = useContext(DoctorContext);

  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

  useEffect(() => {

    if (dToken) {
      getAppointments();
    }

  }, [dToken]);



  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>Todas las reservas</p>
      <div className='bg-white border border-slate-100 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-scroll '>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-slate-100 '>
          <p>#</p>
          <p>Paciente</p>
          <p>Pago</p>
          <p>Edad</p>
          <p>Fecha y Hora</p>
          <p>Precio</p>
          <p>Acción</p>
        </div>

        {
          appointments.reverse().map((item,index)=>(
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-slate-100 hover:bg-green-50' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <div >
                <p className='text-xs inline border border-primary px-2 rounded-full '>
                  {item.payment ? 'Online' : 'Efectivo'}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency} {item.amount}</p>
              {
                item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelado</p>
                : item.isCompleted
                ? <p className='text-green-500 text-xs'>Completado</p>
                : <div className='flex'>
                <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
              }
              
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default DoctorAppointments