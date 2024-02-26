import  {React,useState} from 'react'
import TablaRecursos from './Tablas/TablaRecursos';
import PopupFormRecursos from './PopUps/PopUpAñadir/PopupFormRecursos'

function Recursos() {
  
  const [busqueda, setBusqueda] = useState("");

  const handleSave = (data) => {
    // Aquí podrías hacer algo con los datos, por ejemplo, enviarlos a través de una API
    console.log("Datos guardados:", data);
  };

  const handleBuscar = () => {
    // Lógica para manejar la acción de búsqueda
    console.log("Búsqueda:", busqueda);
    // Puedes realizar operaciones de búsqueda con el valor   en 'busqueda'
  };
  return (
    <div>
       
        
        {/* Puedes agregar una lista de usuarios u otras secciones relacionadas con usuarios */}

        <TablaRecursos />
      </div>
  );
}

export default Recursos