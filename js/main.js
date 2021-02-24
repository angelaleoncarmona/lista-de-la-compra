

const URL_API = 'https://api.airtable.com/v0/appluKgCfgGUB5TbY/Productos?&view=Grid%20view';
const AUTHORIZATION = 'Bearer keyOzTSqIJ6LUp99l';
const URL_API_BORRAR = 'https://api.airtable.com/v0/appluKgCfgGUB5TbY/Productos?records[]=';
const URL_API_ACTUALIZAR = 'https://api.airtable.com/v0/appluKgCfgGUB5TbY/Productos';
const URL_API_ANYADIR = 'https://api.airtable.com/v0/appluKgCfgGUB5TbY/Productos';


new Vue({
    el: '#app',
    data: {
        productos: [],
        productoTextoActualizar: '',
        productoAnyadido: ''
    },
    mounted: function () {
        this.obtenerProductos();
    },
    methods: {
        obtenerProductos: function () {
            fetch(URL_API, {
                headers: {
                    'Authorization' : AUTHORIZATION
                }
            })
                .then(function(response) {
                    return response.json();
                })
                .then((json) => {
                    this.productos = json.records;
                });
        },
        borrarProducto: function (id) {
            // Borramos del API
            fetch(URL_API_BORRAR.concat(id), {
                headers: {
                    'Authorization' : AUTHORIZATION
                },
                method: 'DELETE'
            });
            // Borramos del LOCAL
            this.productos = this.productos.filter(producto => producto.id !== id)
        },
        actualizarProductoEnAPI: function(id, nuevoTexto) {
            fetch(URL_API_ACTUALIZAR, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : AUTHORIZATION
                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Nombre": nuevoTexto,
                            }
                        }
                    ]
                })
            })
        },
        actualizarAdquiridoEnAPI: function(id, checked) {
            fetch(URL_API_ACTUALIZAR, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : AUTHORIZATION
                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Comprado": checked,
                            }
                        }
                    ]
                })
            })
            // Actualizamos en Local
            this.productos = this.productos.map((producto) => {
                if (producto.id === id) {
                    let miProducto = producto;
                    miProducto.fields.Comprado = checked;
                    return miProducto;
                } else {
                    return producto;
                }
            });
        },
        // añadimos en AIRTABLE
        anyadirProductoDesdeWeb: function(nuevoElemento) {
            fetch(URL_API_ANYADIR, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : AUTHORIZATION
                },
                method: 'POST',
                body: JSON.stringify({
                    "records": [
                        {
                            "fields": {
                                "Nombre": nuevoElemento,
                                "Comprado": false
                            }
                        }
                    ]
                })
            })
            // Añadimos al html
             if(this.productoAnyadido !== '') {
                 this.productos.push(this.productoAnyadido);
             }
        }

    }
})