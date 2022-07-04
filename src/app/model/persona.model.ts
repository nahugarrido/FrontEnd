export class persona{
    id?: number;
    nombre: String;
    apellido: String;
    img: String;
    puesto: String;
    descripcion: String;

    constructor(nombre: String, apellido: String, img: String, puesto: String, descripcion: String){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.puesto = puesto;
        this.descripcion = descripcion;
    }
}