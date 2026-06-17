import { useEffect, useState } from "react";

export default function Usuarios(){

    const [usuarios, setUsuarios] = useState([]);

    useEffect(()=>{
        async function cargarDatos() {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await res.json();

            setUsuarios(data);
        }

        cargarDatos();
        
    }, []);

    return(
        <div>
            <h2>Lista de usuarios</h2>
            <ul>
                {usuarios.map((u)=>(
                    <li key={u.id}> {u.name}</li>
                ))}
            </ul>
        </div>
    );
}