import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { getOrdersAction } from "../store/modules/orders";

class OrdersComponent extends Component {
    componentDidMount() {
        const { orders, getOrders } = this.props;

        if (orders.length === 0) {
            getOrders();
        }
    };

    render() {
        const { orders, isLoadingOrders } = this.props;

        if(orders.length === 0 && isLoadingOrders) {
            return <p>Loading...</p>
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer name</th>
                            <th>Order Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <Link to={`/orders/${order._id}`}>{order._id}</Link>
                                    </td>
                                    <td>{order.customer_name}</td>
                                    <td>{order.price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = ({ orders }) => ({
    orders: orders.list,
    isLoadingOrders: orders.isLoadingList,
});

const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch(getOrdersAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
