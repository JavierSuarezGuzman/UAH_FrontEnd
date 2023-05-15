/* Javier Suárez Guzmán
    Mayo 2023 */

import { React, useEffect, useState } from 'react'; // Se importan componentes de react que se usarán para el consumo de la API
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const App = () => {

    // Hook useState para recibir el arreglo de objetos que se encuentra en la bbdd
    const [lista, setLista] = useState([]);

    // Hooks useState para poder trabajar con la data del objeto
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fecha_Nacimiento, setFecha_Nacimiento] = useState("");
    const [carrera, setCarrera] = useState("");

    // Hook useState para poblar el formulario y poder editar un alumno
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

    // Constante con la url de la API base para trabajar con ella en los distintos endpoints
    const url = "https://localhost:7126/api/";

    // Función para traer los datos de la lista en forma de notación de objeto javascript
    const apiList = async () => {
        const response = await fetch(url + "alumnos");
        //console.log(response);
        //console.log(response.status);
        const responseJSON = await response.json();
        setLista(responseJSON);
        //console.log(responseJSON);
    }

    // Hook useEffect para mostrar la lista que viene del backend
    useEffect(() => {
        apiList();
    }, []);

    // Función para crear un nuevo objeto alumno en la base de datos usando el botón submit del formulario en pantalla
    function handleSubmit(event) {
        event.preventDefault();

        const alumno = { nombre, apellido, fecha_Nacimiento, carrera};

        fetch(url + "alumnos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alumno),
        })
            .then((response) => response.json())
            .then((data) => setLista([...lista, data])) // Esta línea permite que se actualice la página automáticamente, gracias a React

        // Limpiar el formulario
        setNombre("");
        setApellido("");
        setFecha_Nacimiento("");
        setCarrera("");
    }

    // Función de eliminar
    function handleDelete(nombre) {
        console.log(`Deleting student: ${nombre}`);

        fetch(url + `alumnos/${nombre}`, { method: "DELETE" })
            .then(() => {apiList()}); // Solución para actualizar la vista luego de eliminar un registro
    }

    // Función de editar
    function handleEdit(nombre, apellido, fecha_Nacimiento, carrera) { // Se reciben los datos del alumno seleccionado

        const alumnoEditar = { nombre, apellido, fecha_Nacimiento, carrera };

        fetch(url + `alumnos/${nombre}`, {
            //method: "PUT",
            //headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(alumnoEditar),
 })
            //.then((response) => response.json())
            .then(console.log(alumnoEditar))
            //.then((data) => setLista([...lista, data])) // Esta línea permite que se actualice la página automáticamente

        // Limpiar el formulario
        /*setNombre("");
        setApellido("");
        setFecha_Nacimiento("");
        setCarrera("");*/
    }   

    return (
        <>
            <h1>Bienvenid@ a la API de Alumnos de la Universidad Alberto Hurtado</h1>

            <h2>Listado de Alumnos:</h2>
            <table style={{ width: '80%'}}>
                <tr>
                    <th>Apellido</th>
                    <th>Nombre</th>
                    <th>Fecha de nacimiento</th>
                    <th>Carrera</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
                {lista.map((lista, index) => {
                    return <tr>
                        <td key={index}> {lista.apellido}</td>
                        <td>{lista.nombre}</td>
                        <td>{lista.fecha_Nacimiento}</td>
                        <td>{lista.carrera}</td>
                        <td><button type="button" onClick={() => handleEdit(lista.nombre, lista.apellido, lista.fecha_Nacimiento, lista.carrera)}>✏</button></td>
                        <td><button type="button" onClick={() => handleDelete(lista.nombre)} >X</button></td>
                    </tr>
                }) }
                
            </table>

            <br/><br/><br/>

            <h3> Crear o editar un Alumno</h3>

            <form onSubmit={handleSubmit}>

                <p>Nombre: &nbsp;
                    <input type="text"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        placeholder="Ej: Juan">
                    </input>
                </p>

                <p>Apellido: &nbsp;
                    <input type="text"
                        value={apellido}
                        onChange={(event) => setApellido(event.target.value)}
                        placeholder="Ej: Perez">
                    </input>
                </p>

                <p>Fecha de nacimiento: &nbsp;
                    <input type="text"
                        value={fecha_Nacimiento}
                        onChange={(event) => setFecha_Nacimiento(event.target.value)}
                        placeholder="Ej: 1998-05-13">
                    </input>
                </p>

                <p>Carrera: &nbsp;
                    <input type="text"
                        value={carrera}
                        onChange={(event) => setCarrera(event.target.value)}
                        placeholder="Ej: Ciberseguridad">
                    </input>
                </p>

                <button type="submit">Crear o editar</button>

            </form>
        </>
  );
}

export default App;
