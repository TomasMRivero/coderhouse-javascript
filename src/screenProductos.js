import Producto from "./Producto.js";

let vProductos = [];
let showProductos = vProductos;

vProductos.push(new Producto(1, "simpsons", "homero arbusto", "verde", 200, 1500));
vProductos.push(new Producto(1, "simpsons", "hombre radioactivo", "blanco", 100, 1500));
vProductos.push(new Producto(1, "simpsons", "hombre radioactivo", "negro", 150, 1500));
vProductos.push(new Producto(2, "naruto", "akatsuki", "negro", 79, 3000));

function MostrarVectorProductos(){
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
        $(`#btn${p.id}`).on('click', () => {vCarrito.push(p)});
    });
    if (!showProductos.length)
        $('#productos').append(`<h3>No se encontraron productos</h3>`)
}

$('body').append(`
    <div id="busqueda"></div>
    <div id="productos"></div>
`);
$('#busqueda').prepend(`
    <form id="searchForm">
        <input type="text" placeholder="Buscar por..." id="searchTerm">
        <select id="filtro">
            <option value="1">Estampa</option>
            <option value="2">Colección</option>
        </select>
        <button type="submit" id="search">Buscar</button>
    </form>
`);
$('#busqueda').append(`
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


let i = 0;
$('#searchForm').on("submit", e=>{
    e.preventDefault();
    let term = '';

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
        console.log(++i)
        term = e.target.value;
    });
    $('#searchTerm').trigger('search');

    if(!term){
        showProductos = vProductos;
    }
    else{
        //$('#filtro').trigger('search');
    }
    
    $('#productos').empty();  
    MostrarVectorProductos();
});

MostrarVectorProductos();