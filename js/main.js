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

function obtenerDatos() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './json/data.json',
            type: 'GET',
            data: {},
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}


function CargarProductos() {
    const productosDiv = document.getElementById("productos");

    obtenerDatos() 
        .then(data => {
            console.log(data);
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                const productoDiv = document.createElement("div");
                productoDiv.innerHTML = "<h2>"+data[i].nombre+"</h2>";
                productoDiv.innerHTML = `
                <div class="card col-12 mb-2" >
                    
                    <div class="row">
                        <div class="card-body col-2">
                            <img src=`+data[i].imagen+` style="width: 100px;" alt=`+data[i].nombre+` class="card-img-top mx-auto">
                        </div>
                        <div class="card-body col-6">
                            <h5 class="text-primary semi-bold">`+data[i].nombre+`</h5>
                            <h6 class="">`+data[i].detalle+`</h6>
                            <h6 class=""><small>Categoria: `+data[i].categoria+`</small></h6>
                            <h6 class=""><small>Stock disponible: `+data[i].stock+`</small></h6>
                        </div>
                        <div class="card-body col-2">
                            <h5 class="text-primary semi-bold">$ `+data[i].precio.toFixed(2)+`</h5>
                            </div>
                            <div class="card-body col-2">
                                <button type="button" class="btn btn-primary col-12" onclick="agregaralcarrito(this);" 
                                data-producto='{"id": `+data[i].id+`, "nombre": "`+data[i].nombre+`", "precio": `+data[i].precio+`}'><i class="fa-solid fa-cart-plus"></i> &nbsp; Agregar
                                </button>
                            </div>
            
                        </div>                        
                    </div>
                </div>
                `;
                productosDiv.appendChild(productoDiv);
            }
        })
        .catch(error => {
            console.log("Error cargando los datos: "+error);
        });
}

function agregaralcarrito(btn) {
    const dataProducto = btn.getAttribute('data-producto');

    // Convertir la cadena JSON en un objeto JavaScript
    const producto = JSON.parse(dataProducto);

    console.log("agregado codigo: "+producto.id+producto.nombre);
    carrito.push(producto);
    actualizarCarrito()
}

function MostrarPromociones() {
    let container   = $('#divpromociones-op');
    let plancuotas = "";
    
    console.log(planes);

    const contenedor = document.getElementById('divpromociones');

    const select = document.createElement('select');
    select.id = "planfinanciacion";
    select.className = 'form-control form-control-sm';
    select.style = "text-align: right;";

    for(let item=0; item<planes.length; item++ ) {
        const option = document.createElement('option');
        option.text = planes[item].plan;
        option.value = planes[item].codigo;
        option.onclick = actualizarCarritoPromociones;

        select.add(option);

        plancuotas += planes[item].codigo + ". " + planes[item].plan + " Coeficiente interés: " + planes[item].coeficiente + "<br>";
    }

    container.html('PLanes de financiación: <br><br>'+plancuotas);
    contenedor.appendChild(select);
}

function actualizarCarritoPromociones() {
    actualizarCarrito();
    swal.fire({
        html: "<small>El plan de pago fue actualizado</small><hr>",
        type:'success',
        icon: 'success',
        title: 'Actualización carrito',
        showConfirmButton: false,
        timer: 1500    
    })
}
function actualizarCarrito() {
    carritoLista.innerHTML = '';

    let totalPagar = 0;

    cuotas = $('#planfinanciacion').val();

    carrito.forEach(function(producto, index) {
        totalPagar += producto.precio;

        const carritoItem = document.createElement('li');
        carritoItem.className = 'list-group-item';
        carritoItem.style = 'padding-bottom: 30px; vertical-align: middle';
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

    const totalcuotastemp = SimularCuotas(cuotas, totalPagar);

    totalPagarElement.innerText = totalPagar.toFixed(2);
    totalPagarCuotas.innerText = totalcuotastemp;

    valorcuota.innerText = (cuotas>0 ? planes[cuotas].cuotas+" cuotas de $ "+(totalcuotastemp / planes[cuotas].cuotas).toFixed(2) : "Compra sin cuotas");

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
    return totalventa.toFixed(2) ;
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
    if (carrito.length > 0) {
        swal.fire({
            html: "<small>Muchas gracias por su compra</small><hr>",
            type:'success',
            icon: 'success',
            title: 'Finalizando compra',
            showConfirmButton: false,
            timer: 3500    
        }).then(function() {
            swal.close();
            const contenedor = document.getElementById("DivContenedor");
            contenedor.innerHTML = `
                <div class="card col-12 mb-2" >
                    <div class="row">
                        <div class="card-body col-12 text-center">
                            <i class="fa-brands fa-opencart fa-5x"></i>
                            <h3>Muchas gracias por su compra</h3>
                            <hr>
                            <button type="button" class="btn btn-primary" id="FinalizarCompra" onclick="NuevaCompra()">Realizar otra compra</button>
                        
                        </div>                        
                    </div>
                </div>
            `;
        })
    } else {
        swal.fire({
            html: "<small>No hay productos en su carrito</small><hr>",
            type:'success',
            icon: 'error',
            title: 'Carrito vacio',
            showConfirmButton: false,
            timer: 3500    
        })
    }
}

function NuevaCompra() {
    window.location.href = "./";
    carrito.splice(0);
    actualizarCarrito();
}

const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
}

