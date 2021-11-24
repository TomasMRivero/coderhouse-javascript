import Producto from "./Producto.js";
let cartId = 0;

export default class Cartitem extends Producto{
    constructor(obj){
        super(obj);
        this.id = this.setId();
        this.prodId = obj.id;
    }
    setId(){
        sessionStorage.setItem("cartId", `${cartId}`)
        return cartId++;
    }
}