import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ClipboardList,
  HardHat,
  Package,
  Building2,
  FolderCog,
  FilePlus2,
  LogOut,
} from "lucide-react";
import Empleados from "./Empleados";
import Actividades from "./Actividades";

export default function Inicio() {
  const navigate = useNavigate();
  const [formularioActivo, setFormularioActivo] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const rolUsuario = sessionStorage.getItem("Rol") || "No definido";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Botón menú hamburguesa */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="md:hidden p-4 bg-blue-900 text-white font-bold"
      >
        ☰ Menú
      </button>

      {/* Menú lateral con degradado */}
      <aside
        className={`bg-gradient-to-b from-blue-900 to-blue-600 text-white p-4 space-y-3 z-50 md:relative fixed top-0 left-0 h-full w-64 md:w-60 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${menuAbierto ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <h2 className="text-xl font-bold mb-4">Menú</h2>

        {[
          { label: "Empleados", icon: Users },
          { label: "Actividades", icon: ClipboardList },
          { label: "Máquinas y Equipos", icon: HardHat },
          { label: "Materiales", icon: Package },
          { label: "Proyectos", icon: Building2 },
          { label: "Áreas", icon: FolderCog },
          { label: "Cargos de empleados", icon: Users },
          { label: "Nuevo reporte de obra", icon: FilePlus2 },
        ].map(({ label, icon: Icon }, idx) => (
          <button
            key={idx}
            onClick={() => {
              setFormularioActivo(label);
              setMenuAbierto(false);
            }}
            className="flex items-center gap-2 w-full text-left px-2 py-1 bg-blue-800 hover:bg-blue-700 rounded"
          >
            <Icon size={6} /> {label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:ml-64">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-3/4 bg-white p-6 rounded shadow-md">
            {formularioActivo === "Empleados" ? (
              <Empleados />
            ) : formularioActivo ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">{formularioActivo}</h2>
                <input
                  type="text"
                  placeholder="Nombre del proyecto"
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  type="date"
                  className="w-full border p-2 mb-4 rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Guardar
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 font-bold mt-20">
                aca el dashboard
              </div>
            )}

            {/* {formularioActivo ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">{formularioActivo}</h2>
                <input
                  type="text"
                  placeholder="Nombre del proyecto"
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  type="date"
                  className="w-full border p-2 mb-4 rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Guardar
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 font-bold mt-20">
                aca el dashboard
              </div>
            )} */}
          </div>

          <div className="lg:w-1/4 w-full">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
              <p>Progreso: 70%</p>
              <p>Último reporte: ayer</p>
              <p>Total actividades: 12</p>
              <div className="mt-4 border-t pt-2">
                <h4 className="font-bold">Rol del usuario</h4>
                <p className="text-blue-700">{rolUsuario}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
