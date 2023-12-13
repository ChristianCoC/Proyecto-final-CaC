// Función para mostrar el menu
function toggleMenu() {
    var userMenu = document.getElementById("userMenu");
    userMenu.style.display = (userMenu.style.display === "flex") ? "none" : "flex";
}

// Función para cerrar el menu al hacer clic fuera de el
function closeMenuOutsideClick(event) {
    const userMenu = document.getElementById('userMenu');
    const userImage = document.querySelector('.user-image');

    if (!userMenu.contains(event.target) && event.target !== userImage) {
        userMenu.style.display = 'none';
    }
}

document.body.addEventListener('click', closeMenuOutsideClick);