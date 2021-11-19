let prodId = 0;

export default class Producto {
    //recibe obj con tipo, coleccion, estampa, color, stock, precio
    constructor(obj){
        this.id = this.setId()
        this.tipo = obj.tipo;
        this.coleccion = obj.coleccion;
        this.estampa = obj.estampa;
        this.color = obj.color;
        this.stock = obj.stock;
        this.precio = obj.precio;
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