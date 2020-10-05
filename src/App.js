import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formularios';
import Cita from './components/Cita';

function App() {

  //Citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }
  
  //Arreglo de citas
  const [citas, guardarCitas] = useState([]);

  //Use Effect para realizar ciertas operaciones cuando el state de citas cambia
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales] );

  //Funcion que tome las citas actuales y pase las nuevas 
  const crearCita = cita => {
    guardarCitas([
      ...citas, 
      cita
    ]);
  };

  //Metodo condicional para titulo de citas
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  //Funcion que elimina una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
            crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
