import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          HABLE CON
          <span className="text-gray-700 font-semibold"> NOSOTROS</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full object-cover md:shrink-0 md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Nuestra Clínica</p>
          <p className="text-gray-500">
            MANUEL MARIA RUEDA ENTRE AGUSTIN HERRERA Y<br />
            Ulpiano Navarro, Otavalo.
          </p>
          <p className="text-gray-500">
            Tel: +593 990 230 102
            <br />
            Email: soporte@medisalud.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Trabaja con Nosotros
          </p>
          <p className="text-gray-500">
            Conoce más sobre nuestros equipos en Medisalud y las vacantes
            disponibles.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:text-white hover:bg-black transition-all duration-500 cursor-pointer">
            Contáctanos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
