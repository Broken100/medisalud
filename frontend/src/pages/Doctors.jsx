import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { specialityData } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doc) => {
          if (Array.isArray(doc.speciality)) {
            return doc.speciality.includes(speciality);
          }

          return doc.speciality === speciality;
        })
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Navega por nuestras especialidades.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 ">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev=> !prev)}>Filtros</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialityData.map((item) => (
            <p
              key={item.speciality}
              onClick={() =>
                speciality === item.speciality
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item.speciality}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
                speciality === item.speciality
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300"
              }`}
            >
              {item.name}
            </p>
          ))}
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[ -10px] transition-all duration-500"
              >
                <img
                  className="bg-blue-50 w-full"
                  src={item.image}
                  alt={item.name}
                />{" "}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Disponible</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.degree}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No se encontraron doctores para esta especialidad.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
