import Producto from "./Producto.js";

let vCarrito = [];
let precioFinal = 0;
let payload = localStorage.getItem("carrito");
if (payload)
    JSON.parse(payload).forEach(e => vCarrito.push(new Producto(e)));

console.log(vCarrito);

function mostrarVectorCarrito(){
    $('body').append('<div id="carrito"></div>');
    vCarrito.forEach((p) => {
        const content = `
            <h2>${p.mapearTipo()} ${p.estampa}</h2>
            <h4>${p.color}</h3>
            <h3>$${p.mostrarPrecioConIva()}(IVA incl.)</h3>      
        `;
        let cardNode = document.createElement("div");
        cardNode.classList.add("card");
        cardNode.innerHTML= content;
        $('#carrito').append(cardNode)
    });
    if (!vCarrito.length)
        $('#carrito').append(`<h3>Tu carrito está vacío!</h3>`)
    else {
        $('#carrito').append(`<button type="button" id="buybtn">Realizar Compra</button>`);
    }
}

mostrarVectorCarrito();

$(`#buybtn`).on('click', () => {
    vCarrito.forEach(p => precioFinal += p.mostrarPrecioConIva())
    if (confirm(`El precio final es ${precioFinal}. Desea confirmar?`)){
        $.each(vCarrito, () => {
            vCarrito.shift();
            //cuando se haga la conexion con una api va a restar del stock total a los productos.
        })
        localStorage.removeItem("carrito");
    }
    $('#carrito').empty();  
    mostrarVectorCarrito();
});