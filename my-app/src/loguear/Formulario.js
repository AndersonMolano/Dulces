import "./formulario.css"
import React, { useState } from 'react';

export function Formulario({ setUser }){
    const [nombre, setNombre] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(false)
    
    
    const handleSubmit = (e) =>{
            e.preventDefault()
        
            if (nombre === "" || contraseña === ""){
            setError(true)
            return
        }
            setError(false)
            setUser([nombre])
    }
    return(
        <section>
            <h1 className="Titulo">Login De Usuarios</h1>
            <form className="formulario"
                            onSubmit={handleSubmit}>

                <h1>Ingresa tu nombre</h1>
                <input type="text"
                 placeholder="Nombre:" 
                 value={nombre}
                 onChange={e => setNombre(e.target.value)}/>
                <h1>Ingresa tu contraseña</h1>
                <input type="password" 
                placeholder="Contraseña:" 
                value={contraseña}
                onChange={e => setContraseña(e.target.value)}
                />
                <button>Iniciar Sersion</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    );
}