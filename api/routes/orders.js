const express = require('express');
const router = express.Router();
const convert = require('convert-units');

const models = require('../models');
const settings = require("../Settings/settings");

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCU6xhwy9D9dSriH_20MCz3_bGzgccOiRk',
    Promise: Promise
});

router.post('/', async (req, res, next) => {
    const {
        service,
        name: customer_name,
        notes,
        customer_address,
        our_address,
        bins,
        cases,
        Vflats,
        additional,
        date_time
    } = req.body.order;
    const { pricing } = settings;

    const pBins = pricing.bins[Number(bins.type)] * bins.quantity;
    const pCases = pricing.cases[Number(cases.type)] * cases.quantity;
    const pVflats = pricing.Vflats[Number(Vflats.type)] * Vflats.quantity;
    const pAdditional = pricing.additional_fees[Number(additional.type)] * additional.quantity;

    const basePrice = pBins + pCases + pVflats + pAdditional;

    let distance;

    try {
        const distances = await googleMapsClient.distanceMatrix({
            origins: [our_address],
            destinations: [customer_address],
            units: 'imperial',
        }).asPromise();
        distance = convert(distances.json.rows[0].elements[0].distance.value)
            .from('m').to('mi');
    } catch (e) {
        return res.status(500).send({
            status: 'fail',
            message: 'internal server error'
        })
    }
    const price = basePrice + (distance * settings.pricePerMile);

    console.log(price);

    try {
        const newOrder = await models.Order.create({
            customer_id: "5b879b9bf608ece831231182",
            customer_name,
            customer_address,
            our_address,
            notes,
            date_time,
            bins,
            cases,
            Vflats,
            additional,
            price,
            service
        });
        res.send({
            status: 'success',
            order: newOrder,
            message: "Order created successfully!"
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            status: "fail",
            message: 'Order could not be created, try again!'
        })
    }
});


router.patch('/confirm', async (req, res, next) => {
    try {
        const {orderID, userID} = req.body;
        const order = await models.Order.findById(orderID);
        if (!order) throw new Error();
        order.set({payed: true});
        order.save((err, updatedOrder) => {
            if (err) throw new Error();
            res.send(updatedOrder);
        })
    }
    catch (err) {
        next(Err);
    }
})

module.exports = router;
