'use strict';

const author = {
    name: 'Emmanuel',
    lastname: 'Seoane'
};

const productResume = (data) => {
    // TODO 
    // no termino de entender si amount tiene que ser el monto redondeado o solo el monto sin decimales
    const price = data.price.toString().split('.');

    return {
        id: data.id,
        title: data.title,
        price: {
            currency: data.currency_id,
            amount: parseInt(price[0]),
            decimals: parseInt(price[1]) || 0
        },
        picture: data.thumbnail,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        address: data.address ? data.address.state_name : data.seller_address.state.name
    };
};

const productCategories = (data) => {
    let categories = [];
    if (data.filters) {
        const categoriesFilter = data.filters.find((filter) => {
            return filter.id === 'category';
        });

        if (categoriesFilter) {
            categoriesFilter.values[0].path_from_root.map((category) => {
                categories.push(category.name);
            });
        }
    }

    return categories;
};

const parseItemsArray = (data) => {
    const categories = productCategories(data);
    const items = data.results.map((item) => {
        return productResume(item);
    });

    return {
        author,
        categories,
        items
    };
};

const parseItem = (data) => {
    let item = productResume(data);
    item.picture = data.pictures[0] && data.pictures[0].url ? data.pictures[0].url : data.thumbnail;
    item.sold_quantity = data.sold_quantity;
    item.description = data.plain_text;

    let categories = [];
    if (data.path_from_root) {
        data.path_from_root.map((category) => {
            categories.push(category.name);
        });
    }

    return {
        author,
        item,
        categories
    };
};

module.exports = {
    parseItemsArray,
    parseItem
};
