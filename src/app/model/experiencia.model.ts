export class experiencia{
    id?: number;
    empresa: String;
    puesto: String;
    descripcion: String;
    fecha_inicio: String;
    fecha_finalizacion: String;
    img: String;

    constructor(empresa: String, puesto: String, descripcion: String, fecha_inicio: String, fecha_finalizacion: String, img: String){
        this.empresa = empresa;
        this.puesto = puesto;
        this.descripcion = descripcion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_finalizacion = fecha_finalizacion;
        this.img = img;
    }
}