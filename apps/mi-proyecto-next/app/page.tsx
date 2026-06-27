import Link  from "next/link";
import Saludo from "@/components/Saludo";


export default function Home(){
    return (
        <main>
            <h1>Bienvenido a mi primer proyecto en next.js</h1>
          
            <Saludo nombre="Aaron"></Saludo>
            <Link href="/contacto">Ir a contacto</Link>
        </main>
    );
}