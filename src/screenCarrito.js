import Cartitem from "./CartItem.js";
import Producto from "./Producto.js";

let vCarrito = [];
let payload = localStorage.getItem("carrito");
if (payload)
JSON.parse(payload).forEach(e => vCarrito.push(new Cartitem(e)));

async function getProductos() {
    await $.get("./productos.json", (res, status) => {
        if(status === "success")
            res.forEach(e=> vProductos.push(new Producto(e)))
    });
    localStorage.setItem("productos", JSON.stringify(vProductos));
}

let vProductos = [];
let prodPayload = localStorage.getItem("productos");
if (prodPayload){
    JSON.parse(prodPayload).forEach(e => vProductos.push(new Producto(e)));
}
else
    await getProductos();

let precioFinal;


function mostrarVectorCarrito(){
    precioFinal = 0;
    vCarrito.forEach((p) => {
        precioFinal += p.mostrarPrecioConIva()
        const content = `
            <h2>${p.mapearTipo()} ${p.estampa}</h2>
            <h4>${p.color}</h3>
            <h3>$${p.mostrarPrecioConIva()}(IVA incl.)</h3>  
            <button type="button" class="removebtn" id="${p.id}">Quitar del carrito</button>     
        `;
        let cardNode = document.createElement("div");
        cardNode.classList.add("card");
        cardNode.innerHTML= content;
        $('#carrito').append(cardNode);
    });
    if (!vCarrito.length)
        $('#carrito').append(`<h3>Tu carrito está vacío!</h3>`)
    else {
        $('#carrito').append(`<h3>Precio final = $${precioFinal}`);
        $('#carrito').append(`<button type="button" id="buybtn">Realizar Compra</button>`);
        $('#carrito').append(`<button type="button" id="clearbtn">Vaciar Carrito</button>`);
    }

    $(`#buybtn`).on('click', () => {
        if (confirm(`El precio final es ${precioFinal}. Desea confirmar?`)){
            $.each(vCarrito, () => {
                const item = vCarrito.shift();
                let i = vProductos.findIndex(e => e.id === item.prodId);
                vProductos[i].comprar();
            })
            localStorage.removeItem("carrito");
            localStorage.setItem("productos", JSON.stringify(vProductos));
        }
        $('#carrito').empty();  
        mostrarVectorCarrito();
    });
    $('#clearbtn').on('click', () => {
        localStorage.removeItem("carrito");
        vCarrito = [];
        $('#carrito').empty();  
    });
    $(`.removebtn`).on('click', (e) => {
        vCarrito = vCarrito.filter(p => p.id != parseInt(e.target.id));
        localStorage.setItem("carrito", JSON.stringify(vCarrito));
        $('#carrito').empty();
        mostrarVectorCarrito();
    });
}


$('body').append('<div class="container" id="carrito"></div>');


mostrarVectorCarrito();