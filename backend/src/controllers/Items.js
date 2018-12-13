'use strict';

const MeliApiService = require('../service/MeliApiService');
const MeliResponseParser = require('../helpers/MeliResponseParser');

module.exports.find = (req, res, next) => {
    const search = req.swagger.params['q'].value;

    MeliApiService.find(search)
        .then(response => {
            res.status(200);
            res.send(MeliResponseParser.parseItemsArray(response));
        })
        .catch(error => {
            res.status(400);
            res.json({error: error.message});
        });
};

module.exports.findById = (req, res, next) => {
    const id = req.swagger.params['id'].value;

    MeliApiService.findById(id)
        .then(response => {
            res.status(200);
            res.send(MeliResponseParser.parseItem(response));
        })
        .catch(error => {
            res.status(400);
            res.json({error: error.message});
        });
};
