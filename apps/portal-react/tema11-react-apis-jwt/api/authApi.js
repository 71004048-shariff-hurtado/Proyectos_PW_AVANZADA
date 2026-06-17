const ACCESS_TOKEN_VALIDO = "jwt-querido-profesor-token-valido";
const ACCESS_TOKEN_RENOVADO = "jwt-querido-profesor-token-renovado";

export const loginSimulado = async({correo, clave}) =>{
    await esperar(300)
    if(correo === 'demo@lideratec.com' && clave ==='123456'){
        return{
            token: ACCESS_TOKEN_VALIDO,
            usuario:{
                nombre: "QUERIDO PROFESOR",
                correo,
            }
        };
    }

    throw new Error("Credenciales invalidar");
}

export const refrescarTokenSimulado = async () =>{
    await esperar(300);
    return{
        token: ACCESS_TOKEN_RENOVADO,
    }
}

const esperar = (ms) =>{
    return new Promise((resolve) => setTimeout(resolve, ms));
}