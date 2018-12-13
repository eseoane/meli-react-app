'use strict';

const axios = require('axios');


const API = 'https://api.mercadolibre.com/';
const LIMIT = 4; // no se si estaria bien, por lo menos asi se ve en la maquena y el json de ejmeplo

class MeliApiService {
    /**
     * Find all instances of the model matched by filter from the data source.
     *
     * @param filter String
     * @return item array
     **/
    static async find(filter) {
        const params = {
            q: filter,
            limit: LIMIT
        };

        try {
            const request = await axios.get(API + 'sites/MLA/search', {params});
            return request.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Find a model instance by {{id}} from the data source.
     *
     * @param id String Model id
     * @return item
     **/
    static async findById(id) {
        // segun entiendo aunque no esta pedido faltaban las categorias para el breadcrumb
        try {
            const response = await Promise.all([
                axios.get(API + 'items/​' + id),
                axios.get(API + 'items/' + id + '/description')
            ]);

            if (response[0].data && response[1].data) {
                try {
                    const categories = await axios.get(API + 'categories/' + response[0].data.category_id);
                    return Object.assign(response[0].data, response[1].data, categories.data);
                } catch (error) {
                    return Object.assign(response[0].data, response[1].data);
                }
            } else {
                throw new Error('Missing product information');
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = MeliApiService;
