import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { MaterialReactTable } from 'material-react-table';
import axios from "axios";

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cargos, setCargos] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [resEmpleados, resCargos, resAreas] = await Promise.all([
        axios.get("http://localhost:3000/api/empleados"),
        axios.get("http://localhost:3000/api/cargos"),
        axios.get("http://localhost:3000/api/areas"),
      ]);
      setCargos(resCargos.data);
      setAreas(resAreas.data);

      // Normalizamos el dataset con los textos reales
      const empleadosConTexto = resEmpleados.data.map((emp) => {
        const cargo = resCargos.data.find(c => c.id === emp.cargo);
        const area = resAreas.data.find(a => a.id === emp.area);
        return {
          ...emp,
          cargoTexto: cargo ? cargo.cargo : "—",
          areaTexto: area ? area.area_ : "—"
        };
      });

      setEmpleados(empleadosConTexto);
    } catch (error) {
      console.error("Error al cargar datos", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async ({ values }) => {
    const datos = {
      ...values,
      cargo: Number(values.cargo),
      area: Number(values.area),
    };
    try {
      await axios.post("http://localhost:3000/api/empleados", datos);
      fetchData();
    } catch (error) {
      console.error("Error al crear empleado", error);
    }
  };

  const handleUpdate = async ({ values, row }) => {
    try {
      const id = values.id || row?.original?.id;
      if (!id) throw new Error("ID no definido para actualizar");

      const datos = {
        ...values,
        cargo: cargos.find(c => c.cargo === values.cargoTexto || c.id === values.cargo)?.id ?? values.cargo,
        area: areas.find(a => a.area_ === values.areaTexto || a.id === values.area)?.id ?? values.area,
      };

      await axios.put(`http://localhost:3000/api/empleados/${id}`, datos);
      fetchData();
    } catch (error) {
      console.error("🛑 Error al actualizar empleado:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://localhost:3000/api/empleados/${row.original.id}`);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar empleado", error);
    }
  };

  const columns = useMemo(() => [
    { accessorKey: "nombres", header: "Nombres" },
    { accessorKey: "apellidos", header: "Apellidos" },
    { accessorKey: "cedula", header: "Cédula" },
    { accessorKey: "telefono", header: "Teléfono" },
    {
      accessorKey: "cargoTexto",
      header: "Cargo",
      editVariant: "select",
      editSelectOptions: cargos.map(c => ({ value: c.cargo, label: c.cargo })),
    },
    {
      accessorKey: "areaTexto",
      header: "Área",
      editVariant: "select",
      editSelectOptions: areas.map(a => ({ value: a.area_, label: a.area_ })),
    },
    { accessorKey: "ciudad", header: "Ciudad" },
  ], [cargos, areas]);

  return (
    <MaterialReactTable
      columns={columns}
      data={empleados}
      enableEditing
      editingMode="modal"
      enableRowActions
      enableTopToolbar
      createDisplayMode="modal"
      onCreatingRowSave={handleCreate}
      onEditingRowSave={handleUpdate}
      muiTableProps={{ sx: { tableLayout: "auto" } }}
      renderRowActions={({ row, table }) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => table.setEditingRow(row)}>
            <Pencil size={18} />
          </button>
          <button onClick={() => handleDelete(row)}>
            <Trash2 size={18} color="red" />
          </button>
        </div>
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <button
          onClick={() => table.setCreatingRow(true)}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          Crear nuevo empleado
        </button>
      )}
      state={{ isLoading }}
    />
  );
}
