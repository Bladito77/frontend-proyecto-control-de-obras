import React, { useEffect, useState } from "react";
import {
  UserPlus,
  Trash2,
  Edit,
} from "lucide-react";
import axios from "axios";

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    telefono: "",
    cargo: "",
    area: "",
    ciudad: "",
  });

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/empleados");
      setEmpleados(res.data);
    } catch (error) {
      console.error("Error al cargar empleados", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Empleado a guardar:", form);
    // Aquí iría la lógica para guardar con axios
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Gestión de Empleados</h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4 text-sm mb-6"
      >
        <input
          name="nombres"
          type="text"
          placeholder="Nombres"
          value={form.nombres}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="apellidos"
          type="text"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="cedula"
          type="text"
          placeholder="Cédula"
          value={form.cedula}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="telefono"
          type="text"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <select
          name="cargo"
          value={form.cargo}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione cargo</option>
          <option value="5">Ingeniero</option>
          <option value="6">Técnico</option>
        </select>
        <select
          name="area"
          value={form.area}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione área</option>
          <option value="10">Mecánica</option>
          <option value="11">Eléctrica</option>
        </select>
        <input
          name="ciudad"
          type="text"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
          className="border p-2 rounded w-full md:col-span-2"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          <UserPlus className="mr-2" size={16} /> Guardar
        </button>
      </form>

      <table className="w-full text-sm text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Cédula</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Ciudad</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id} className="border-b">
              <td className="p-2">{emp.id}</td>
              <td className="p-2">
                {emp.nombres} {emp.apellidos}
              </td>
              <td className="p-2">{emp.cedula}</td>
              <td className="p-2">{emp.telefono}</td>
              <td className="p-2">{emp.ciudad}</td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
