import React, { use, useEffect, useState } from "react";
import "./Colegio.css";
import api from "../../services/api";
import type { IColegio } from "../../types/models";

const Colegio = () => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigo, setCodigo] = useState("");
  
  const [colegios, setColegios] = useState<IColegio[]>([])

  const getColegios = async () => {
    try{
        const response = await api.get("/Colegio")
        setColegios(response.data)
    }catch(err){
        console.log("Error: ", err);
    }
  }

  useEffect(() => {
    getColegios()
  }, [])

  return (
    <div className="colegio-contenedor">
      <h1>Lista de Colegios</h1>
      <button onClick={() => setOpen(true)}>Agregar Colegio</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {colegios.map((colegio) => (
            <tr key={colegio.id}>
              <td>{colegio.id}</td>
              <td>{colegio.nombre}</td>
              <td>{colegio.direccion}</td>
              <td>{colegio.codigo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Formulario de Colegio</h2>
            <button 
              className="modal-close" 
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            
            <form>
              <label htmlFor="nombre">
                Nombre:
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
              
              <label htmlFor="direccion">
                Dirección:
                <input
                  id="direccion"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </label>
              
              <label htmlFor="codigo">
                Código:
                <input
                  id="codigo"
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </label>
              
              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Colegio;
