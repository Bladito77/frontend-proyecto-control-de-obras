import React from "react";

export default function Inicio() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Menú lateral */}
      <aside className="bg-blue-900 text-white w-full md:w-1/5 p-4">
        <h2 className="text-lg font-bold mb-4">Menú</h2>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Formulario 1</a></li>
          <li><a href="#" className="hover:underline">Formulario 2</a></li>
          <li><a href="#" className="hover:underline">Formulario 3</a></li>
        </ul>
      </aside>

      {/* Contenedor central con banner y formulario */}
      <main className="flex-1 flex flex-col p-4 space-y-4">
        {/* Banner */}
        <div className="bg-white shadow p-4 rounded text-center">
          <h1 className="text-2xl font-bold text-gray-700 uppercase">
            Bienvenido a Control de Obras
          </h1>
        </div>

        {/* Formulario o contenido central */}
        <section className="bg-white p-4 rounded shadow flex-1">
          <h2 className="text-lg font-semibold mb-2">Formulario de ejemplo</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nombre del proyecto"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </form>
        </section>
      </main>

      {/* Dashboard o columna derecha */}
      <aside className="bg-white md:w-1/4 p-4 shadow hidden md:block">
        <h2 className="text-md font-bold mb-2">Dashboard</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>Progreso: 70%</li>
          <li>Último reporte: ayer</li>
          <li>Total actividades: 12</li>
        </ul>
      </aside>
    </div>
  );
}
