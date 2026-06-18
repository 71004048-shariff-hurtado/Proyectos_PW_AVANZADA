async function ObtenerPersonajes(id) {
    try {
        const respuesta = await fetch("https://dragonball-api.com/api/characters");
        const datos = await respuesta.json();

        console.log("Primer personaje de Dragon ball es:", datos.items[id].name);
    } catch (error) {
        console.log("Error en la consulta", error);
        
    }
    
}

ObtenerPersonajes(1);