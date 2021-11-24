export default class Producto {
    //recibe obj con tipo, coleccion, estampa, color, stock, precio
    constructor(obj){
        this.id = obj.id
        this.tipo = obj.tipo;
        this.coleccion = obj.coleccion;
        this.estampa = obj.estampa;
        this.color = obj.color;
        this.stock = obj.stock;
        this.precio = obj.precio;
    }
    setId(dest, n){
        sessionStorage.setItem(dest, `${n}`)
        return n;
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