export const dynamic = "force-dynamic"

type Producto = {
    id: string
    nombre: string
    descripcion: string
}

const productos : Producto[] = [
    {id: "1", nombre: "Laptop", descripcion: "Equipo para trrabajar"},
    {id: "2", nombre: "Mouse", descripcion: "Sirve para movver el puntero"},
    {id: "3", nombre: "Monitor", descripcion: "Sirve para visualizar el contenido"}
]

type Props = {
    params: Promise<{id: string}>
}

export default async function ProductoPage({params}: Props){
    const {id} = await params
    const producto = productos.find((item) => item.id === id)
    const fechaConsulta = new Date().toLocaleString()

    if (!producto){
        return <h1>Producto no encontrado</h1>
    }

    return (
        <main>
            <h1>{producto.nombre}</h1>
            <p>{producto.descripcion}</p>
            <p>Consulta generada: {fechaConsulta}</p>
        </main>
    );
}