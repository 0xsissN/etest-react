import { useEffect, useState } from "react";
import type { IColegio } from "../../../types/models";
import ColegioPutForm from "./form-put";
import { deleteColegio, getColegio } from "../services/colegio-service";
import ColegioPostForm from "./form-post";

const ColegioList = () => {
  const [colegios, setColegios] = useState<IColegio[]>([]);
  const [colegio, setColegio] = useState<IColegio | null>(null);

  const [open, setOpen] = useState(false);
  const [registroOpen, setRegistroOpen] = useState(false);

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
            <th colSpan={2}>
              <button
                className="boton-registro"
                onClick={() => setRegistroOpen(true)}
              >
                Agregar Colegio
              </button>
            </th>
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
              <>
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
              </>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <ColegioPutForm
          data={colegio}
          onClose={() => setOpen(false)}
          onLoad={loadData}
        />
      )}

      {registroOpen && (
        <ColegioPostForm
          onClose={() => setRegistroOpen(false)}
          onLoad={loadData}
        />
      )}
    </>
  );
};

export default ColegioList;
