

const URL_API = 'https://api.airtable.com/v0/appWF4L4R9ZFDTnwQ/Productos?maxRecords=4&view=Grid%20view&=';
const AUTHORIZATION = 'Bearer keyOzTSqIJ6LUp99l';


new Vue({
    el: '#app',
    data: {
        productos: []
    },
    mounted: function () {

    },
    methods: {
        obtenerProductos: function () {
            fetch(URL_API_PRODUCTOS, {
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
        }
    }
})