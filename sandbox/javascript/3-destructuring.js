const producto = {
    id: 101,
    nombre: "Smartphone",
    precio: 1200,
    detalles: {
        marca: "Samsung",
        garantia: "1 año"
 }
};

const {nombre,precio, detalles:{marca}} = producto;

console.log(`Producto: ${nombre}`);
console.log(`Precio: ${precio}`);
console.log(`Marca: ${marca}`);