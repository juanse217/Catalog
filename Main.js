//Para esconder y mostrar nuestra lista de carrito de compras: 
const carBtn = document.querySelector('.icon-carrito');
const carrito = document.querySelector('.contenedor-carrito');

carBtn.addEventListener('click', () => {
    carrito.classList.toggle('hidden-carrito');
})


//Añadir elementos a nuestra lista de carrito: 

const infoCarrito = document.querySelector('.carrito-producto');
const row = document.querySelector('.producto-row');

//Lista de productos: 
const productList = document.querySelector('.contenedor-productos');

//Array elementos en crrito
let productosCarrito = [];

//total precio carrito:
let totalCarrito = document.querySelector('.total-pagar');

//contador productos en carrito:
const cantCarrito = document.querySelector('#contador');

productList.addEventListener('click', e => {
    
    if(e.target.classList.contains('anadir')){

        const product = e.target.parentElement; //Nos vamos al elemento padre del botón

        //Guardamos la información extraída del parent
        const info = {
            cantidad: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent
        }

        const existe = productosCarrito.some(product => product.title === info.title)
        
        if(existe){

            const products = productosCarrito.map(product => {
                if(product.title === info.title){
                    product.cantidad++; 
                    return product;
                }else{
                    return product;
                }
            })
            productosCarrito = [...products]
        }else{
            productosCarrito = [...productosCarrito, info] //arreglo que nos va a copiar los elementos que ya estaban y le agrega nuevos.
        }
       

        addHtml();
    }

    
})

row.addEventListener('click', (e) => {

    if(e.target.classList.contains('x-carrito')){
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent
        productosCarrito = productosCarrito.filter(product => product.title !== title);
        console.log(productosCarrito);
        addHtml();
    }
    

})

//Agregar al HTML: 

const addHtml = () => {
    row.innerHTML = '';
    let total = 0; 
    let totalProducts = 0;

    productosCarrito.forEach(p => {

        const container = document.createElement('div')
        container.classList.add('carrito-producto')

        container.innerHTML = `
            <div class="informacion-carrito">
                <span class="contador-producto-carrito">${p.cantidad}</span>
                <p class="descripcion-producto-carrito">${p.title}</p>
                <span class="precio-producto-carrito">${p.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="x-carrito">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
            </svg>
        
        `;

        row.append(container);
        total = parseInt(total + (p.cantidad * p.price)); 
        totalProducts = totalProducts + p.cantidad; 

    })
    totalCarrito.innerText = `${total}`;
    cantCarrito.innerText = `${totalProducts}`;
}


//MOSTRAR Especificaciones:

const specsBtn = document.querySelector(".specs-button")
const specs = document.querySelector('.specs')

specsBtn.addEventListener('click', ()=>{
    specs.classList.toggle('hidden-specs');
})