import Producto from "./Producto.js";

let vProductos = [];
let showProductos = vProductos;

let vCarrito = [];
let payload = localStorage.getItem("carrito");
if (localStorage.getItem("carrito"))
    vCarrito = vCarrito.concat(JSON.parse(payload))

vProductos.push(new Producto({tipo: 1, coleccion: "simpsons", estampa: "homero arbusto", color: "verde", stock: 200, precio: 1500}));
vProductos.push(new Producto({tipo: 1, coleccion: "simpsons", estampa: "hombre radioactivo", color: "blanco", stock: 100, precio: 1500}));
vProductos.push(new Producto({tipo: 1, coleccion: "simpsons", estampa: "hombre radioactivo", color: "negro", stock: 150, precio: 1500}));
vProductos.push(new Producto({tipo: 2, coleccion: "naruto", estampa: "akatsuki", color: "negro", stock: 79, precio: 3000}));

function mostrarVectorProductos(){
    $('body').append('<div id="productos"></div>');
    showProductos.forEach((p) => {
        const content = `
            <h2>${p.mapearTipo()} ${p.estampa}</h2>
            <h4>${p.color}</h3>
            <h3>$${p.mostrarPrecioConIva()}(IVA incl.)</h3>
            <h5>Cantidad: ${p.stock} </h5>
            <button type="button" id="btn${p.id}">Agregar al carrito</button>            
        `;
        let cardNode = document.createElement("div");
        cardNode.classList.add("card");
        cardNode.innerHTML= content;
        $('#productos').append(cardNode)
        $(`#btn${p.id}`).on('click', () => {
            vCarrito.push(p);
            localStorage.setItem("carrito", JSON.stringify(vCarrito));
        });
    });
    if (!showProductos.length)
        $('#productos').append(`<h3>No se encontraron productos</h3>`)
}
function barraDeBusqueda(){
    $('body').append('<div id="busqueda"></div>');
    let term = '';
    $('#busqueda').prepend(`
        <form id="searchForm">
            <input type="text" placeholder="Buscar por..." id="searchTerm">
            <select id="filtro">
                <option value="1">Estampa</option>
                <option value="2">Colección</option>
            </select>
            <button type="submit" id="search">Buscar</button>
        </form>
    `).append(`
        <div id="tipo">
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


barraDeBusqueda();
mostrarVectorProductos();