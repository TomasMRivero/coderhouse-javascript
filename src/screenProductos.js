import Cartitem from "./CartItem.js";
import Producto from "./Producto.js";

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

let showProductos = vProductos;

let vCarrito = [];
let cartPayload = localStorage.getItem("carrito");
if (cartPayload)
JSON.parse(cartPayload).forEach(e => vCarrito.push(new Cartitem(e)));

function mostrarVectorProductos(){
    showProductos.forEach((p) => {
        const content = `
            <h2>${p.mapearTipo()} ${p.estampa}</h2>
            <h4>${p.color}</h3>
            <h4>Cantidad: ${p.stock} </h5>
            <h3>$${p.mostrarPrecioConIva()}(IVA incl.)</h3>
            <button type="button" id="btn${p.id}">Agregar al carrito</button>            
        `;
        let cardNode = document.createElement("div");
        cardNode.classList.add("card");
        cardNode.innerHTML= content;
        $('#productos').append(cardNode);
        p.stock
            ?   $(`#btn${p.id}`).on('click', () => {
                vCarrito.push(p);
                localStorage.setItem("carrito", JSON.stringify(vCarrito));
                $('#cartCount').show();
                $('#cartCount').html(`${vCarrito.length}`);
                })
            :   $(`#btn${p.id}`).attr('disabled','disabled')
    });
    if (!showProductos.length)
        $('#productos').append(`<h3>No se encontraron productos</h3>`)
}
function barraDeBusqueda(){
    let term = '';
    $('#busqueda').prepend(`
        <form class="busqueda__container" id="searchForm">
            <input class="busqueda__field" type="text" placeholder="Buscar por..." id="searchTerm">
            <select class="busqueda__filter" id="filtro">
                <option value="1">Estampa</option>
                <option value="2">Colección</option>
            </select>
            <button class="busqueda__submit" type="submit" id="search">Buscar</button>
        </form>
    `).append(`
        <div class="busqueda__checkbox" id="tipo">
            <p>Mostrar:
            <input type="checkbox" id="remera" value="1" name="remera" checked="true">
            <label for="remera">remeras</label>
            <input type="checkbox" id="buzo" value="2" name="buzo" checked="true">
            <label for="buzo">buzos</label>
            <input type="checkbox" id="otros" value="3" name="otros" checked="true">
            <label for="otros">otros</label>
            </p>
    `);
    $('#busqueda :checkbox').on("change", e => {
        if(e.target.checked)
            showProductos = showProductos.concat(vProductos.filter(p => p.tipo === parseInt(e.target.value)));
        else
            showProductos = showProductos.filter(p => p.tipo != parseInt(e.target.value));
        showProductos.sort((a,b)=>{return a.id>b.id?1:-1});
        $('#productos').empty();  
        mostrarVectorProductos();
    });

    $('#filtro').on('search', e => {
        switch(parseInt(e.target.value)){
            case 1:
                showProductos = vProductos.filter(e => e.estampa.includes(term));
                break;
            case 2:
                showProductos = vProductos.filter(e => e.coleccion.includes(term));
                break;
        }
    })    
    $('#searchTerm').on("search", e => {
        term = e.target.value;
        e.target.value = ''
    });
    $('#searchForm').on("submit", e=>{
        e.preventDefault();
        $('#searchTerm').trigger('search');
    
        if(!term){
            showProductos = vProductos;
        }
        else{
            $('#filtro').trigger('search');
        }
        
        $('#productos').empty();  
        mostrarVectorProductos();
    });
}
$('#cartCount').hide();

$('body').append('<div class="busqueda" id="busqueda"></div>');

$('body').append('<div class="container" id="productos"></div>');

barraDeBusqueda();
mostrarVectorProductos();
if(vCarrito.length){
    $('#cartCount').show()
    $('#cartCount').html(`${vCarrito.length}`);
}