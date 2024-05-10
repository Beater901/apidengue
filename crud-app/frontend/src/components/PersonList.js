import React, { useState, useEffect } from 'react';

function PersonList({onDeleteClick, onEditClick}) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []); // Se ejecuta una vez al cargar el componente

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/people');
      if (!response.ok) {
        throw new Error('Error al obtener la lista de personas');
      }
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Personas Infectadas de Dengue</h2>
      <ul className="list-group">
      {people.map(person => (
        <li key={person._id} className="list-group-item">
          <strong>Nombre:</strong> {person.name}<br />
          <strong>Edad:</strong> {person.age}<br />
          <strong>DNI:</strong> {person.dni}<br />
          <strong>Dirección:</strong> {person.address}<br />
          <strong>Síntomas:</strong> {person.symptoms}<br />
          <button className="btn btn-primary" onClick={() => onEditClick(person)}>Modificar</button>
          <button className="btn btn-danger" onClick={() => onDeleteClick(person._id)}>Eliminar</button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default PersonList;

//<button className="btn btn-primary" onClick={() => onEditClick(person)}>Modificar</button>

