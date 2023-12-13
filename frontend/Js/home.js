// Menu
function expandirMenu() {
    let userMenu = document.getElementById('userMenu');
    userMenu.style.display = (userMenu.style.display === 'flex') ? 'none' : 'flex';
}

// Funciones para abrir y cerrar el modal de carrito
function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

let cart = [];
let total = 0;

function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice
    };

    cart.push(product);
    total += product.price;

    updateCartUI();

    showAddedMessage();
}

function showAddedMessage() {
    const addedMessageElement = document.getElementById('addedMessage');
    addedMessageElement.style.display = 'block';

    // Ocultar el mensaje después de 2 segundos (ajustable según sea necesario)
    setTimeout(() => {
        addedMessageElement.style.display = 'none';
    }, 2000);
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Limpiar la lista de elementos del carrito
    cartItemsElement.innerHTML = '';

    // Agregar elementos del carrito
    cart.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        cartItemsElement.appendChild(listItem);
    });

    // Actualizar el total
    cartTotalElement.textContent = total.toFixed(2);
}

function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    updateCartUI();
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function clearCart() {
    cart = [];
    total = 0;
    updateCartUI();
}

// Función para cerrar el modal al hacer clic fuera de él
function closeCartModalOutsideClick(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        closeCartModal();
    }
}

document.getElementById('cartModal').addEventListener('click', closeCartModalOutsideClick);

// Función para cerrar el menu al hacer clic fuera de el
function closeMenuOutsideClick(event) {
    const userMenu = document.getElementById('userMenu');
    const userImage = document.querySelector('.user-image');

    if (!userMenu.contains(event.target) && event.target !== userImage) {
        userMenu.style.display = 'none';
    }
}

document.body.addEventListener('click', closeMenuOutsideClick);

// Paginación
const itemsPerPage = 6; // Número de productos por página
let currentPage = 1; // Página actual
let products; // Declaramos products a nivel global

function changePage(page) {
    const nextPage = currentPage + page;
    const start = (nextPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (start >= 0 && end <= products.length) {
        currentPage = nextPage;
        renderProducts();
        updatePaginationButtons();
    }
}

function renderProducts() {
    products = document.querySelectorAll('.product'); // Actualizamos products aquí
    products.forEach((product, index) => {
        const isVisible = index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage;
        product.style.display = isVisible ? 'block' : 'none';
    });
}

function updatePaginationButtons() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(products.length / itemsPerPage);
}

// Al cargar la página, inicializa la paginación
window.onload = function () {
    renderProducts();
    updatePaginationButtons();
};

