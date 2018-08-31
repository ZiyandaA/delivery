import React, { Component } from 'react';
import {connect} from 'react-redux';

class PriceComponent extends Component {
    constructor(props) {
        super(props);
        this.displayOrderInfo = this.displayOrderInfo.bind(this);
    }

    displayOrderInfo() {
        let divElements = []
        Object.keys(this.props.order).forEach(key => {
            let elem = <div>{key}: {this.props.order[key]}</div>
            divElements.push(elem);
        })
        return <div>
            {divElements.map(item => {
                return item
            })}
        </div>
    }

    render() {

        return(
            <div>
               {/*{this.displayOrderInfo()}*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        order: state.orders.detail
    }
}


export default connect(mapStateToProps)(PriceComponent);
