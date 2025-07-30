import { useEffect, useState } from "react";
import type { IColegio } from "../../../types/models";
import { getColegio } from "../../colegio/services/colegio-service";

const ColegioList = () => {
  const [colegios, setColegios] = useState<IColegio[]>([]);

  const loadData = async () => {
    try {
      const response = await getColegio();
      setColegios(response.data);
    } catch (err) {
      console.log("Error: ", err);
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ColegioList;
