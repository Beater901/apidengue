import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PersonForm({ person, onPersonAdded, onUpdate }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dni, setDni] = useState('');
  const [address, setAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');

  useEffect(() => {
    if (person) {
      setName(person.name || '');
      setAge(person.age || ''); 
      setDni(person.dni || '');
      setAddress(person.address || '');
      setSymptoms(person.symptoms || '');
    }
  }, [person]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, dni, address, symptoms })
      });

      if (!response.ok) {
        throw new Error('Error al agregar persona');
      }

      setName('');
      setAge('');
      setDni('');
      setAddress('');
      setSymptoms('');

      if (onPersonAdded) {
        onPersonAdded();
      }

      alert('Persona agregada correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar persona');
    }
  };

  const handleUpdatePerson = async (e) => {
    e.preventDefault();
     const updatedPerson = { ...person, name, age, dni, address, symptoms }; // Construye un objeto con los datos actualizados
     onUpdate(updatedPerson);
 
       setName('');
       setAge('');
       setDni('');
       setAddress('');
       setSymptoms('');

       if (onPersonAdded) {
        onPersonAdded();
      }
 };
 

  return (
    <div className="container ms-3">
      <h2 className="">Agregar Persona Infectada de Dengue</h2>
      <form onSubmit={handleSubmit} button= {handleUpdatePerson}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Edad:</label>
          <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI:</label>
          <input type="number" className="form-control" id="dni" value={dni} onChange={(e) => setDni(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección:</label>
          <select className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)}>
            <option value="">SELECCIONE UNA CIUDAD</option>
            <option value="Mendoza">Mendoza</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="San Juan">San Juan</option>
            <option value="Cordoba">Cordoba</option>
            <option value="Tierra del Fuego">Tierra del Fuego</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">Síntomas:</label>
          <input type="text" className="form-control" id="symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Persona</button>
        <button type="subnit" onClick={handleUpdatePerson} className="btn btn-success">Actualizar Persona</button>
      </form>
    </div>
  );
}

export default PersonForm;