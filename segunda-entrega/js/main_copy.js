
// tabla de variables iniciales 

let ahora3 = 1.10;
let ahora6 = 1.13;
let ahora12 = 1.18;
let montoVenta = 0;
let cuotas = 0;

let nombre = "";

const productos = [{codigo: 1, descripcion: 'producto #1', precio: 2550}, {codigo: 2, descripcion: 'producto #2', precio: 4590}, {codigo: 3, descripcion: 'producto #3', precio: 565}]
const planes = [{id: 1, plan: 'Ahora 3', coeficiente: 1.10}, {id: 2, Plan: 'Ahora 6', coeficiente: 1.13}, {id: 3, Plan: 'Ahora 12', coeficiente: 1.18}];

/*Mensaje de Bienvenida*/

console.log(planes[0].id);

alert("Calculadora de importe de cuotas con tarjeta de credito - Segunda entrega Coderhouse" );
PedirIdentidad();

function PedirDatos() {
    // Ingreso de montos y cuotas solicitadas
    
    montoVenta = prompt("Ingrese el valor total de la venta (venta minima $ 9999), para cancelar calculo ingrese 0");

    if (montoVenta>9999) { 
        cuotas = prompt("Ingrese la cantidad de cuotas (3, 6 o 12)");
        return true; 
    } else if (montoVenta == 0)  {
        return true;
    } else {
        return false;
    }
}

function PedirIdentidad() {
    nombre = prompt("Ingrese su nombre");

    if (nombre.length > 3) {
        PedirDatos();
    } else {
        let continuar = confirm("Su nombre no puede ser tan corto, desea reintentar ?");
        if (continuar) {
            PedirIdentidad();
        }   
    }
}


function RealizarCalculo() {
    let valorcuota = 0; 
    let totalventa = 0;
    console.log(cuotas);
    switch (cuotas) {
        case '3':
            totalventa = montoVenta*ahora3;
            console.log(totalventa);
            valorcuota = totalventa/3; 
            break;
        case '6':
            totalventa = montoVenta*ahora6;
            console.log(totalventa);
            valorcuota = totalventa/6;
            break;
        case '12':
            totalventa = montoVenta*ahora12;
            console.log(totalventa);
            valorcuota = totalventa/12;
            break;
    }
    
    alert("El valor de cada cuota es de $ "+valorcuota.toFixed(2)+" pagando en total $ "+totalventa.toFixed(2));
}

function VerificarDatos() {
    let correcto = confirm("¿Es correcto "+montoVenta+" en "+cuotas+" cuotas?");
    if (correcto) {
        RealizarCalculo();
        alert("Muchas gracias por utilizar la calculadora")
    }
}


while ( PedirDatos() === false ) {
    alert("La venta no supera el limite mínimo, reintente nuevamente");
};
