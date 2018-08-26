var express = require('express');
var router = express.Router();
var models = require('../models');
const settings = require("../Settings/settings");


router.post('/', async (req, res, next) => {
    const {
        service,
        name,
        notes,
        customer_address,
        our_address,
        bins,
        cases,
        Vflats,
        additional,
        date_time
    } = req.body;

    let respObj = {msg:"hi"};

    try {

        // console.log("CUST ADDR: " + customer_address);
        // console.log("OUR ADDR: " + our_address);
        

        const googleMapsClient = require('@google/maps').createClient({
            key: 'AIzaSyCU6xhwy9D9dSriH_20MCz3_bGzgccOiRk',
            Promise: Promise
          });
          
        const googleDistanceMatrix = require('google-distance-matrix');
        googleDistanceMatrix.units('imperial')

        googleDistanceMatrix.matrix(
            [our_address], [customer_address],
            (err, res) => {
                console.log(err, res)
                let distance;
                const {pricing} = settings;

                if(!err) {
                    console.log("DIST: ");
                    distance = res.rows[0].elements[0].distance.text;
                }



                const pBins = pricing.bins[Number(bins.type)] * bins.quantity;
                const pCases = pricing.cases[Number(cases.type)] * cases.quantity;
                const pVflats = pricing.Vflats[Number(Vflats.type)] * Vflats.quantity;
                const pAdditional = pricing.additional_fees[Number(additional.type)] * additional.quantity

                
        
                //const price = pBins + pCases + pVflats + pAdditional + (distance * settings.pricePerMile);
                console.log(pAdditional);
            }
        )
        // googleDistanceMatrix.matrix(
        //     [our_adress], [customer_adress],
    
        //     async (err, distances) => {

        //         var distance = 1;

        //         if(!err) {
        //             console.log("DIST: ");
        //             console.dir(distances.rows[0].elements[0].distance);
        //             distance = distances.rows[0].elements[0].distance.value * 0.000621371192;
        //         }

        //         console.log("SERVICE: ", service);
        //         console.log("Name: ", name);
        //         console.log("Notes: ", notes);
        //         console.log(bins, cases, Vflats, Vflats_select, 'this is stuff')
        //         const pricing = settings.pricing;
        //         console.log(pricing, 'this is pricing')

        //         var ibins = Math.min(Math.max(bins, 0), 2);
        //         var icases = Math.min(Math.max(cases, 0), 2);
        //         var Vflats_price = 0;
        //         if (Vflats > 0) {
        //             Vflats_price = pricing.Vflat[Vflats_select];
        //         }
        //         var additional_price = 0;
        //         if (additional > 0) {
        //             additional_price = pricing.additional_fees[additional_select];
        //         }
        
        //         const price = pricing.bin[ibins] + pricing.cases[icases] + Vflats_price + additional_price + distance * settings.pricePerMile;
        //         console.log("price: " + price);
                
                
        //         console.log(price, 'this is price')
        //         const newOrder = await models.Order.create({
        //             //customerID: user._id, // TODO: FIX THIS
        //             //customerID: 0,
        //             customer_adress,
        //             our_adress,
        //             notes,
        //             date_time,
        //             bins,
        //             cases,
        //             Vflats,
        //             Vflats_select,
        //             additional,
        //             additional_select,
        //             price,
        //             type
        //         });
        //         res.send(newOrder);
        //     }
        // );
    
    }
    catch (err) {next(err);}
    
    //res.json(respObj)
})


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


/*
          googleMapsClient. geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
            .asPromise()
            .then((response) => {
              console.log(response.json.results);
            })
            .catch((err) => {
              console.log(err);
            });
  */  