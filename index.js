class Producto {
    constructor(tipo, coleccion, estampa, color, stock, precio){
        const generarId = () => {
            let id = "";
            const t = () => {
                switch(tipo){
                    case 1:
                        return "REM-";
                    case 2:
                        return "BUZO-";
                    default:
                        return "OTRO-";
                }
            }
            id += t();
            id += `${coleccion.toUpperCase()}:${estampa}-${color}`;
            return id;
        }
        this.id = generarId();
        this.tipo = tipo;
        this.coleccion = coleccion;
        this.estampa = estampa;
        this.color = color;
        this.stock = stock;
        this.precio = precio;
    }
    agregarStock(cant){
        this.stock += cant;
    }
    comprar(){
        this.stock --;
    }
    actualizarStock(stockNuevo){
        this.stock = stockNuevo;
    }
    mostrarPrecioConIva(){
        return this.precio * 1.21;
    }
}

let vProductos = [];
let vCarrito = [];

vProductos.push(new Producto(1, "simpsons", "homeroArbusto", "verde", 200, 1500));
vProductos.push(new Producto(1, "simpsons", "hombreRadioactivo", "blanco", 100, 1500));
vProductos.push(new Producto(1, "simpsons", "hombreRadioactivo", "negro", 150, 1500));
vProductos.push(new Producto(2, "naruto", "akatsukiLogo", "negro", 79, 3000));


function agregarProducto(){
    const tipo = () => {
        let tipo = 0;
        do{
            tipo = prompt("Ingrese el tipo de producto\n(1: remera, 2: buzo, 3: otro)");
        }while(!parseInt(tipo) || parseInt(tipo) < 1 || parseInt(tipo) > 3);
        return parseInt(tipo);
    }
    const stock = () => {
        let stock = 0;
        do{
            stock = prompt("Ingrese el stock");
        }while(!parseInt(stock) || parseInt(stock) < 0);
        return parseInt(stock);
    }
    const precio = () => {
        let precio = 0;
        do{
            precio = prompt("Ingrese el precio");
        }while(!parseFloat(precio) || parseFloat(precio) <= 0);
        return parseFloat(precio);
    }
    vProductos.push(new Producto(
        tipo()
        ,prompt("Ingrese la colección")
        ,prompt("Ingrese la estampa")
        ,prompt("Ingrese el color")
        ,stock()
        ,precio()
    ));
}

function cargarProductos(){
    let cargar;
    do{
        agregarProducto();
        cargar = confirm("Desea cargar un otro producto?");
    }while(cargar)
}

function mostrarVector(vec){
    vec.forEach(p => {
        console.log(p);
    })
}

function buscarPorId(callback){ 
    let id;
    do{
        id = prompt("Ingrese ID del producto");
    }while(!id);
    let resu = vProductos.find(e => e.id == id);
    !resu ? alert("No se encontró el producto") : callback(resu);
}

function inputGenerico(){ 
    let input;
    do{
        input = prompt("Ingrese cantidad");
    }while(!parseInt(input) || parseInt(input) < 1);
    return input;
}

function filtrarPor(filtro, criterio){
    let vec = vProductos.filter(e => criterio(e, filtro));
    vec.length ? mostrarVector(vec) : alert("No hay resultados para ese criterio");
}

const obtenerTotal = () => {
    let total = 0;
    vCarrito.forEach(prod => total += prod.mostrarPrecioConIva());
    return total;
}

const confirmarCompra = () => {
    if (confirm(`El precio final es de ${obtenerTotal()}.\nDesea confirmar?`)){
        vCarrito.forEach(p => p.comprar());
        vCarrito = []
    }
}

function adminMenu(){
    let input;
    do{
        do{
            input = prompt("Qué desea hacer?:\n1-Ver productos (por consola)\n2-Cargar productos\n3-Agregar stock\n4-Actualizar stock\n\n5-Volver atrás");
        }while(!parseInt(input) || parseInt(input) < 1 || parseInt(input) > 5);
        switch(parseInt(input)){
            case 1:
                mostrarVector(vProductos);
                break;
            case 2:
                cargarProductos();
                break;
            case 3:
                buscarPorId(r => r.agregarStock(inputGenerico()));
                break;
            case 4:
                buscarPorId(r => r.actualizarStock(inputGenerico()));
                break;            
        }
    }while(parseInt(input)!=5);
}

function clienteMenu(){
    let input;
    do{
        do{
            input = prompt("Qué desea hacer?:\n1-Ver productos (por consola)\n2-Buscar por colección\n3-Buscar por tipo\n4-Agregar al carrito\n5-Ver Carrito\n6-Comprar\n\n7-Volver atrás");
        }while(!parseInt(input) || parseInt(input) < 1 || parseInt(input) > 7);
        switch(parseInt(input)){
            case 1:
                mostrarVector(vProductos);
                break;
            case 2:
                let categoria;
                do{
                    categoria = prompt("Ingrese categoria");
                }while(!categoria);
                filtrarPor(categoria, (e, i) => e.coleccion == i);
                break;
            case 3:
                let tipo;
                do{
                    tipo = prompt("Ingrese tipo\n(1: remera, 2: buzo, 3: otro)");
                }while(!parseInt(tipo) || parseInt(tipo) < 1 || parseInt(tipo) > 3);
                filtrarPor(tipo, (e, i) => e.tipo == i);
                break;
            case 4:
                buscarPorId(r => vCarrito.push(r));
                break;   
            case 5:
                vCarrito.length ? mostrarVector(vCarrito) : alert("El carrito está vacío!")
                break;
            case 6:
                vCarrito.length ? confirmarCompra() : alert("El carrito está vacío!");
                break;        
        }
    }while(parseInt(input)!=7);
}

function menu(){
    let input;
    do{
        do{
            input = prompt("Seleccione un usuario:\n1-Cliente\n2-Admin\n\n3-Salir");
        }while(!parseInt(input) || parseInt(input) < 1 || parseInt(input) > 3);
        switch(parseInt(input)){
            case 1:
                clienteMenu();
                break;
            case 2:
                adminMenu();
                break;
        }
    }while(parseInt(input)!=3);
}

menu();