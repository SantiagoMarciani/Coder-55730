
// tabla de variables iniciales 

let ahora3 = 1.10;
let ahora6 = 1.13;
let ahora12 = 1.18;
let montoVenta = 0;

let nombre = "";
let producto = "";
let cuotas = 0;

const productos = [{codigo: 1, descripcion: 'producto #1', precio: 2550}, {codigo: 2, descripcion: 'producto #2', precio: 4590}, {codigo: 3, descripcion: 'producto #3', precio: 565}]
const planes = [{codigo: 1, plan: 'Ahora 3', coeficiente: 1.10}, {codigo: 2, plan: 'Ahora 6', coeficiente: 1.13}, {codigo: 3, plan: 'Ahora 12', coeficiente: 1.18}];

/*Mensaje de Bienvenida*/

console.log(planes[0].id);

function SimularCuotas() {
    let valorcuota = 0; 
    let totalventa = 0;

    let montoVenta = buscarEnMatriz(productos, producto);
    let coeficiente = buscarEnMatriz(planes, cuotas);

    totalventa = productos[montoVenta].precio*planes[coeficiente].coeficiente;
    console.log(totalventa);
    valorcuota = totalventa/3;   
    
    alert(nombre + " aca esta la simulación por siguiente producto: \n\nProducto: " + productos[montoVenta].codigo + "\nDescripción: " + productos[montoVenta].descripcion + "\n" + "Precio del producto $ " + productos[montoVenta].precio + "\n\n" + "El valor de cada cuota es de $ "+valorcuota.toFixed(2)+" \npagando en total $ "+totalventa.toFixed(2));
}


function PedirPlanFinanciacion() {
    let plancuotas = "";
    for(let item=0; item<planes.length; item++ ) {
        plancuotas += planes[item].id + ". " + planes[item].plan + "\n";
    }

    cuotas = prompt("Cuantas cuotas necesita: \n\n"+plancuotas);

    if (cuotas.length>0) { 
        SimularCuotas();
    }
}


function PedirIdentidad() {
    nombre = prompt("Ingrese su nombre");

    if (nombre.length > 3) {
        PedirDatos();
    } else {
        let continuar = confirm("Su nombre no puede ser tan corto, \ndesea reintentar ?");
        if (continuar) {
            PedirIdentidad();
        }
        
    }
}


function PedirDatos() {
    let catalogo = ""
    for(let item=0; item<productos.length; item++ ) {
        catalogo += productos[item].codigo + ". " + productos[item].descripcion + "\n";
    }

    producto = prompt("Que producto desea simular: \n\n"+catalogo);
    
    PedirPlanFinanciacion();
}


function buscarEnMatriz(matriz, valor) {
    for(let item=0; item<matriz.length; item++ ) {
        if(matriz[item].codigo == valor) {
            return item;
        }
    }
}


alert("Calculadora de importe de cuotas con tarjeta de credito \nSegunda entrega Coderhouse" );
PedirIdentidad();

