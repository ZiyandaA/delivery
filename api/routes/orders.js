const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const convert = require('convert-units');

const models = require('../models');
const settings = require("../Settings/settings");

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCU6xhwy9D9dSriH_20MCz3_bGzgccOiRk',
    Promise: Promise
});

router.get('/:orderId', async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const order = await models.Order.findById(orderId);

        if (order === null) {
            throw new Error(`An order with with orderId: ${orderId} does not exists`);
        }

        res.status(200).send({ order, status: 'success' })
    } catch (e) {
        return res.status(404).send({
            status: 'fail',
            message: `An order with with orderId: ${orderId} does not exists`
        })
    }
});

router.delete('/:orderId', async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await models.Order.findByIdAndDelete(orderId);

        if (order === null) {
            throw new Error(`An order with with orderId: ${orderId} does not exists`);
        }

        res.status(200).send({
            message: 'Order deleted successfully!',
            status: 'success'
        });
    } catch (e) {
        res.status(400).send({
            message: `An order with with orderId: ${orderId} does not exists`,
            status: 'fail'
        });
    }
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
    const price = (basePrice + (distance * settings.pricePerMile)).toFixed(2);

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

router.put('/:orderId/confirm', async (req, res, next) => {
    const { orderId } = req.params;
    const { email } = req.body;
    const { EMAIL_ADDR, EMAIL_PWD, EMAIL_FROM } = process.env;

    // EMAIL TRANSPORT
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ADDR,
            pass: EMAIL_PWD
        }
    });

    if (!email) {
        return res.status(403).send({
            message: 'Recipient email is required',
            status: 'fail'
        })
    }

    try {
        const order = await models.Order.findById(orderId);

        if (order === null) {
            throw new Error(`An order with with orderId: ${orderId} does not exists`);
        }

        const packages = {
            bins: ['One bin($30)', 'Two Bins($40)', 'Three Bins and over Truck jobs($130/hr)'],
            cases: ['One Case($35)', 'Two Cases($40)', 'Three Cases($50)'],
            Vflats: ['VFlats, magliners, bead boards, flags($5)', 'Anything too long($5)'],
            additional: ['Rush NYC($15)', 'Rush BK($25)', 'Super Rush NYC($30)', 'Super Rush BK($40)', 'No pick up fee($12)', 'Waiting time per hr($40)']
        };

        let mailOptions = {
            from: `"${EMAIL_FROM}" <${EMAIL_ADDR}>`,
            to: email,
            subject: 'Order Confirmed',
            text: `
                Order Confirmed
                
                Dear ${order.customer_name},
                Order reference number is: ${order._id}
                Your order has been confirmed. Please find below the order summary.
                
                Price: $${order.price}
                Your Address: ${order.customer_address}
                Our Address: ${order.our_address}
                Service: ${order.service}
                    
                Packages:
                Bins: ${packages.bins[order.bins.type]} – ${order.bins.quantity}
                Cases: ${packages.cases[order.cases.type]} – ${order.cases.quantity}
                Vflats: ${packages.Vflats[order.Vflats.type]} – ${order.Vflats.quantity}
                Aditional: ${packages.additional[order.additional.type]} – ${order.additional.quantity}
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({
                    message: `Confirmation email could not be sent! order not confirmed`,
                    status: 'fail'
                });
            } else {
                res.status(200).send({
                    status: 'success',
                    message: 'Order confirmed successfully, email sent!'
                });
            }
        });
    } catch (e) {
        res.status(400).send({
            message: `An order with with orderId: ${orderId} does not exists`,
            status: 'fail'
        });
    }
});

module.exports = router;
