export interface Perfume {
    id: string,
    nombre: string,
    marca: string,
    precio: number,
    descripcion: string,
    ml: number,
    imagen:string,
    categoria: 'floral' | 'amaderado' | 'citrico' | 'oriental'
    stock: number
}

//DETERMINAMOS LAS CARACTERÍSTICAS ELEMENTALES PARA CADA OBJETO QUE UTILIZAREMOS
//UTILIZAMOS INTERFACE PORQUE DE ESA MANERA ESTABLECEMOS LAS CARACTERISTICAS LUEGO LO EXPORTAMOS PARA PODER UTILIZARLOS EN OTROS ARCHIVOS