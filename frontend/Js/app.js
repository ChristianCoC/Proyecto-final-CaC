// Vue.js

const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            url: 'https://christiancoc.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            descripcion: "",
            imagen: "",
            stock: 0,
            precio: 0,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload();
                })
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./producto_nuevo.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/" + location.search.substr(4), options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./dashboard.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')