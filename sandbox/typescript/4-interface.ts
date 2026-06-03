interface Componente{

    render():string;
}

class Header implements Componente{
    render():string{
        return"<header>Pie de pagina</header>";
    }
}

class Footer implements Componente {
    render():string{
        return"<footer>Pie de pagina</footer>";
    }
}



interface Figura{
    calcularArea(): number;
}

class Cuadrado{
    calcularArea(): number{
        return 0;
    }
}

class Circulo{
    calcularArea(): number{
        return 0;
    }
}