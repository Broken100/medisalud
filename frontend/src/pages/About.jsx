import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          SOBRE <span className="text-gray-700 font-medium">NOSOTROS</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full h-64 object-cover md:h-auto md:shrink-0 md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            En Medisalud, vemos la salud como un bienestar integral. Nacimos
            para poner la 'Salud al Alcance de Todos' en nuestra comunidad.
            Nuestro modelo une <strong>excelencia médica</strong> y{" "}
            <strong>calidad profesional</strong> con un profundo{" "}
            <strong>humanismo</strong>.
          </p>
          <p>
            Nos centramos en el paciente como individuo, con dignidad y respeto.
            La <strong>empatía</strong> y el <strong>trato humano</strong> son
            tan vitales como la <strong>calidad profesional</strong>. Nuestro
            equipo de expertos dedica el tiempo necesario para escuchar y
            construir una relación de confianza.
          </p>
          <b className="text-gray-800">Nuestra Visión</b>
          <p>
            Ser el centro líder y de mayor confianza, un referente donde
            convergen la <strong>excelencia médica</strong> y la{" "}
            <strong>calidez humana</strong>. Aspiramos a ser la primera opción
            para las familias por nuestra <strong>calidad profesional</strong>,
            en un espacio seguro, accesible y respetuoso.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          POR QUÉ <span className="text-gray-700 font-semibold">ELEGIRNOS</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-6 md:gap-8">
        <div className="group flex-1 p-6 md:p-8 flex flex-col gap-4 rounded-lg shadow-lg text-sm text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b>Calidad Profesional:</b>
          <p>
            Contamos con especialistas de primer nivel en constante
            actualización. Expertos comprometidos con su diagnóstico.
          </p>
        </div>
        <div className="group flex-1 p-6 md:p-8 flex flex-col gap-4 rounded-lg shadow-lg text-sm text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b>Humanismo:</b>
          <p>
            Le ofrecemos un espacio seguro y empático. Dedicamos el tiempo
            necesario para escucharle y construir confianza.
          </p>
        </div>
        <div className="group flex-1 p-6 md:p-8 flex flex-col gap-4 rounded-lg shadow-lg text-sm text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b>Accesibilidad</b>
          <p>
            Ser accesibles es nuestra prioridad. Facilitamos su atención y
            eliminamos barreras para que reciba el cuidado que merece.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
