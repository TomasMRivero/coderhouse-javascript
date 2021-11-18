let prodId = 0;

export default class Producto {
    constructor(tipo, coleccion, estampa, color, stock, precio){
        this.id = this.setId()
        this.tipo = tipo;
        this.coleccion = coleccion;
        this.estampa = estampa;
        this.color = color;
        this.stock = stock;
        this.precio = precio;
    }
    setId(){
        sessionStorage.setItem("prodId", `${prodId}`)
        return prodId++;
    }
    mapearTipo(){
        switch (this.tipo){
            case 1:
                return "Remera";
            case 2:
                return "Buzo";
            default:
                return "";
        }
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