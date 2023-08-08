
// tabla de variables iniciales 

let ahora3 = 1.10;
let ahora6 = 1.13;
let ahora12 = 1.18;
let montoVenta = 0;
let cuotas = 0;

/*Mensaje de Bienvenida*/

alert ("Calculadora de importe de cuotas con tarjeta de credito")

function PedirDatos() {
    /* Ingreso de montos y cuotas solicitadas */

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

VerificarDatos();
