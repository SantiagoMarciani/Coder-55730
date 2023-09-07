let carrito = [];
let cuotas = 0;

const totalPagarElement = document.getElementById('totalPagar');
const totalPagarCuotas = document.getElementById('totalPagarCuotas');

// tabla de variables iniciales 
const planes = [
    {codigo: 0, plan: 'Sin cuotas', coeficiente: 1, cuotas: 1}, 
    {codigo: 1, plan: 'Ahora 3', coeficiente: 1.10, cuotas: 3}, 
    {codigo: 2, plan: 'Ahora 6', coeficiente: 1.13, cuotas: 6}, 
    {codigo: 3, plan: 'Ahora 12', coeficiente: 1.18, cuotas: 12}];

CargarProductos();
MostrarPromociones();

function CargarProductos() {
    const contenedor = document.getElementById('listaProductos');

    $.ajax({
        url:'data.json',
        type: 'POST',
        data: {},
        
        success: function(data){
            for(let i=0; i<data.length; i++) {
                console.log(data[i].nombre);

                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';

                const addButton = document.createElement('button');
                addButton.className = 'btn btn-primary btn-sm float-right';
                addButton.innerText = ' Agregar al carrito ';

                listItem.innerText = data[i].nombre + '\n Precio por unidad: $ ' + data[i].precio.toFixed(2);
                listItem.appendChild(addButton);

                addButton.addEventListener('click', function() {
                    carrito.push(data[i]);
                    actualizarCarrito();
                });
                contenedor.appendChild(listItem);
            }
        }
    });
}

function MostrarPromociones() {
    let container   = $('#divpromociones-op');
    let plancuotas = "";
    
    console.log(planes);

    const contenedor = document.getElementById('divpromociones');

    const select = document.createElement('select');
    select.id = "planfinanciacion";
    select.className = 'form-control form-control-sm';

    for(let item=0; item<planes.length; item++ ) {
        const option = document.createElement('option');
        option.text = planes[item].plan;
        option.value = planes[item].codigo;
        option.onclick = actualizarCarrito;

        select.add(option);

        plancuotas += planes[item].codigo + ". " + planes[item].plan + " Coeficiente interés: " + planes[item].coeficiente + "<br>";
    }

    container.html('PLanes de financiación: <br><br>'+plancuotas);
    contenedor.appendChild(select);
}

function actualizarCarrito() {
    carritoLista.innerHTML = '';

    let totalPagar = 0;

    cuotas = $('#planfinanciacion').val();

    carrito.forEach(function(producto, index) {
        totalPagar += producto.precio;

        const carritoItem = document.createElement('li');
        carritoItem.className = 'list-group-item';
        carritoItem.innerText = producto.nombre + '\n Precio: ' + producto.precio.toFixed(2);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger float-right ml-2';
        deleteButton.innerText = 'Quitar';

        deleteButton.addEventListener('click', function() {
            carrito.splice(index, 1);
            actualizarCarrito();
        });

        carritoItem.appendChild(deleteButton);

        carritoLista.appendChild(carritoItem);
    });

    totalPagarElement.innerText = totalPagar.toFixed(2);
    totalPagarCuotas.innerText = SimularCuotas(cuotas, totalPagar);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    const mensajeCarrito = $('#divcarrito');
    const cantidad = carrito.length;

    mensajeCarrito.html('Ver carrito (' + cantidad + ')');
}

function buscarEnMatriz(matriz, valor) {
    for(let item=0; item<matriz.length; item++ ) {
        if(matriz[item].codigo == valor) {
            return item;
        }
    }
}

function SimularCuotas(plan, total) {
    let totalventa = 0;
    let cuotasde = 0;
    let coeficiente = buscarEnMatriz(planes, plan);
    
    totalventa = total*planes[coeficiente].coeficiente;
    cuotasde = (totalventa/planes[cuotas].cuotas).toFixed(2);
    return totalventa.toFixed(2) + ' (' + planes[cuotas].cuotas + ' cuota/s de $ ' + cuotasde + ')';
}

function IniciarCompra() {
    Swal.fire({
        title: 'Bienvenido',
        html: '<p>Ingrese su nombre</p> <input id="nombreIngresado" class="swal2-input" style="text-align: center; border: 1px solid black; font-size: 12pt">',                    
        showCancelButton: true,
        
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        background: '#fff',
        backdrop: 'rgba(0,0,0,0.6)',
 
        onOpen: function () {
            $('#nombreIngresado').focus()
        } 
    }).then((result) => {
        const nombre = document.getElementById('nombre');
        nombre.innerText = $('#nombreIngresado').val();
    });
}

function FinalizarCompra() {
    swal.fire({
        html: "<small>Muchas gracias por su compra</small><hr>",
        type:'success',
        icon: 'success',
        title: 'Finalizando compra',
        showConfirmButton: false,
        timer: 3500    
    })
}



const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
}
