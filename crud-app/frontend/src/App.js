import React, { useState, useEffect   } from 'react';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import StatisticsChart from './components/StatisticsChart';

function App(person, onPersonAdded) {
  const [refreshList, setRefreshList] = useState(false);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dni, setDni] = useState('');
  const [address, setAddress] = useState(''); 
  const [symptoms, setSymptoms] = useState(''); 

  useEffect(() => {
    fetchPeople();
    if (person) {
      setName(person.name || ''); // Inicializa el campo 'name' con el nombre de la persona seleccionada
      setAge(person.age || '');
      setDni(person.dni || '');
      setAddress(person.address || '');
      setSymptoms(person.symptoms || '');
      
      const intervalId = setInterval(fetchPeople, 5000); // Actualizar cada 5 segundos
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }  
  }, [person]);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/people');
      if (!response.ok) {
        throw new Error('Error al cargar la lista de personas');
      }
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar la lista de personas');
    }
  };


  const handlePersonAdded = () => {
    setRefreshList(!refreshList); // Cambia el estado para forzar una actualización de la lista
  };

   // Función para obtener datos de estadísticas por dirección
   const getAddressStatistics = () => {
    const addressCount = {};
    people.forEach(person => {
      if (addressCount[person.address]) {
        addressCount[person.address]++;
      } else {
        addressCount[person.address] = 1;
      }
    });

    return {
      labels: Object.keys(addressCount),
      datasets: [{
        label: 'Infectados según su Dirección',
        data: Object.values(addressCount)
      }]
    };
  };

  const handleSubmit = async () => {

    try {
      const response = await fetch('http://localhost:3001/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, dni, address, symptoms })
      });

      if (!response.ok) {
        throw new Error('Error al agregar persona JAJA');
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

  const handleDeleteClick = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta persona?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/people/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la persona');
        }

        await fetchPeople();
        await handlePersonAdded();

        alert('Persona eliminada correctamente');
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la persona');
      }
    }
  };

  const handleEditClick = (person) => {
    setSelectedPerson(person);
  };

  const handleUpdatePerson = async (updatedPerson) => {
    try {
      const response = await fetch(`http://localhost:3001/api/people/${updatedPerson._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPerson)
      });

      if (!response.ok) {
        throw new Error('Error al modificar la persona');
      }

      await fetchPeople();
      setSelectedPerson(null);

      alert('Persona modificada correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al modificar la personaSS');
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#675cb0', color: '#fff', minHeight: '100vh' }}>
      <h1>Aplicación para el Dengue</h1>
      <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2>Formulario</h2>
              <PersonForm onPersonAdded={handlePersonAdded} person={selectedPerson} onSubmit={handleSubmit} onUpdate={handleUpdatePerson}/>
              <div ><StatisticsChart data={getAddressStatistics()} /></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <PersonList key={refreshList} people={people} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick}/>
        </div>
    </div>
  );
}

export default App;