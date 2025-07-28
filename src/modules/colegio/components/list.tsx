import { useEffect, useState } from "react";
import type { IColegio } from "../../../types/models";
import { ColegioPutForm } from "./form-put";
import { deleteColegio, getColegio } from "../services/colegio-service";

export const ColegioList = () => {
  const [colegios, setColegios] = useState<IColegio[]>([]);
  const [open, setOpen] = useState(false);
  const [colegio, setColegio] = useState<IColegio | null>(null);

  const loadData = async () => {
    try {
      const response = await getColegio();
      setColegios(response.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleDeleteColegio = async (codigo: string) => {
    try {
      await deleteColegio(codigo);
      loadData();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Código</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {colegios.map((colegio) => (
            <tr key={colegio.id}>
              <td>{colegio.id}</td>
              <td>{colegio.nombre}</td>
              <td>{colegio.direccion}</td>
              <td>{colegio.codigo}</td>
              <td>{colegio.estado ? "Activo" : "Desactivado"}</td>
              <td>
                <button
                  className="boton-actualizado"
                  onClick={() => handleDeleteColegio(colegio.codigo)}
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  className="boton-actualizado"
                  onClick={() => {
                    setOpen(true);
                    setColegio(colegio);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && <ColegioPutForm data={colegio} onClose={() => setOpen(false)} />}
    </>
  );
};
