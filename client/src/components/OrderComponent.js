import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {
    getOrderAction,
    deleteOrderAction,
    confirmOrderAction
} from '../store/modules/orders';

class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.displayOrderInfo = this.displayOrderInfo.bind(this);
    }

    componentDidMount() {
        const {
            order,
            match: { params }
        } = this.props;

        if (Object.keys(order).length === 0 || order._id !== params.orderId) {
            this.props.getOrder(params.orderId);
        }
    }

    handleConfirmOrder = () => {
        const {
            match: { params },
        } = this.props;
        let email;

        do {
            email = prompt("Enter the email address the confirmation mail should be sent to", "test@mail.com");
        } while (!email);

        this.props.confirmOrder(email, params.orderId);
    };

    handleUpdateOrder = () => {
        const {
            history: { push },
            match: { params }
        } = this.props;
        push(`/?mode=edit&orderId=${params.orderId}`);
    };

    handleDeleteOrder = async () => {
        const {
            match: { params },
        } = this.props;
        if (window.confirm('Are you sure you want to delete this order?')) {
            await this.props.deleteOrder(params.orderId);
        }
    };

    displayOrderInfo() {
        let divElements = [];
        Object.keys(this.props.order).forEach(key => {
            let elem = <div>{key}: {this.props.order[key]}</div>
            divElements.push(elem);
        });
        return <div>
            {divElements.map(item => {
                return item
            })}
        </div>
    }
    renderMain = () => {
        const { order } = this.props;
        const packages = {
            cases:[35, 40, 50],
            bins: [30, 40, 130],
            Vflats: [5, 5],
            additional: [15, 25, 30, 40, 12, 40]
        }
        console.log(order.bins)
        return (
            <div>
                <h1>Single order</h1>
                <Link to="/orders"> ≤≤ All Orders </Link>
                <ul>
                    <li>Customer  Name: {order.customer_name}</li>
                    <li>Service: {order.service}</li>
                    <li>Customer Address: {order.customer_address}</li>
                    <li>Our Address: {order.our_address}</li>
                    <li>Confirmed: {order.confirmed ? 'True': 'False'}</li>
                    <li>Price: {order.price}</li>
                    <li>Notes: {order.notes}</li>
                    <li>________Packages__________</li>
                    {
                        order.bins.quantity !== 0 &&
                        <li>Bins: ${(order.bins.quantity * packages.bins[order.bins.type])}</li>
                    }
                    {
                        order.cases.quantity !== 0 &&
                        <li>cases: ${(order.cases.quantity * packages.cases[order.cases.type])}</li>
                    }
                    {
                         order.Vflats.quantity !== 0 &&
                        <li>Vflats: ${(order.Vflats.quantity * packages.Vflats[order.Vflats.type])}</li>
                    }
                    {
                         order.additional.quantity !== 0 &&
                        <li>additional: ${(order.additional.quantity * packages.additional[order.additional.type])}</li>
                    }
                    <li>Distance: {order.distance}</li>
                </ul>

                <div>
                    <button onClick={this.handleConfirmOrder}>Confirm Order</button>
                    <button onClick={this.handleUpdateOrder}>Edit Order</button>
                    <button onClick={this.handleDeleteOrder}>Delete Order</button>
                </div>
            </div>
        );
    };

    renderBody = () => {
        const  {
            isLoadingDetail,
            loadingError,
            order
        } = this.props;

        switch (true) {
            case isLoadingDetail:
            case Object.keys(order).length === 0:
                return (<p>Loading....</p>);
            case loadingError.length !== 0:
                return <p>{loadingError}</p>;
            default:
                return this.renderMain();
        }
    };

    render() {
        return <div>{ this.renderBody() }</div>
    }
}

function mapStateToProps({ orders }) {
    return {
        order: orders.detail,
        isLoadingDetail: orders.isLoadingDetail,
        loadingError: orders.loadingDetailError,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrder: (id) => {
            return dispatch(getOrderAction(id));
        },
        deleteOrder: id => dispatch(deleteOrderAction(id)),
        confirmOrder: (email, id) => dispatch(confirmOrderAction(email, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent);
