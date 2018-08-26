import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../constants/actions';
import { withRouter } from 'react-router-dom';

import {TextField} from '@material-ui/core'

import {createOrder} from '../actions/order';

import moment from 'moment'



const mainBGColor = '#024fa2'

const StoreLocation = ({background, name, address, onSelect, selected}) => {
    return <div
        onClick={() => onSelect(address)}
        style={{
            
            display: 'inline-block',
            width: 200,
            marginRight: 10,
            cursor: 'pointer'
        }}
    >
        <div
            style={{
                padding: 10,
                background: selected ? '#01366f' : mainBGColor,
                color: 'white',
                fontSize: 18,
            }}
            
        >{name}</div>
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                color: 'red',
                padding: '20px 10px', 
                fontSize: 20,

            }}
        >{address}</div>

    </div>
}

const FormItem = ({name, onChangeOption, onChange, label, index, options =[], formData}) => {
    //console.log(formData[name], `formData.${name}`)
    const { quantity, type } = formData[name];
    // console.log(quantity);
    return (<div>
        <div 
            style={{
                display: 'inline-block',
                width: '49%',
                padding: 5,
                textAlign: 'right',
                boxSizing: 'border-box',
                marginRight: 6,
            }}
        >{label}</div>
        <select
            style={{
                border: '1px solid black',
                marginRight: 8,
                maxWidth: 138,
            }}
            name={name}
            onChange={onChangeOption}
        >
            {/* <option disabled selected value="default">Select a {label}</option> */}
            {options.map(({label, value}, i) => <option value={value} selected={value === type}>{label}</option>)}
            
        </select>
        <input
            type={'number'}
            style={{
                border: '1px solid black',
                float: 'right',
                marginTop: 7,
            }}
            name={name}
            onChange={onChange}
            defaultValue={quantity}
        />
    </div>)
}

const formItemProps = [
    {
        name:'bins',
        label: 'Bins',
        options: [
            {
                value: "0",
                label: "One bin - $30"
            },
            {
                value: "1",
                label: "Two Bins - $40"
            },
            {
                value: "2",
                label: "Three Bins and over Truck jobs - $130/hr"
            }
        ]
    },
    {
        name:'cases',
        label: 'Cases',
        options: [
            {
                value: "0",
                label: "One Case - $35"
            },
            {
                value: "1",
                label: "Two Cases - $40"
            },
            {
                value: "2",
                label: "Three Cases - $50"
            }
        ]
    },
    {
        name:'Vflats',
        label: 'Vflats',
        options: [
            {
                value: "0",
                label: "VFlats, magliners, bead boards, flags - $5"
            },
            {
                value: "1",
                label: "Anything too long - $5"
            },
        ]
    },
    {
        name:'additional',
        label: 'Additional Fees',
        options: [
            {
                value: "0",
                label: "Rush NYC - $15'"
            },
            {
                value: "1",
                label: "Rush BK - $25',"
            },
            {
                value: "2",
                label: "Super Rush NYC - $30',"
            },
            {
                value: "3",
                label: "Super Rush BK - $40'"
            },
            {
                value: "4",
                label: "No pick up fee - $12"
            },
            {
                value: "5",
                label: "Waiting time per hr - $40"
            },
        ]
    },          
]

class FormComponent extends Component {
    formData = {
        service: "delivery",
        name: "John Smith ",
        notes: "",
        customer_address: "370 19th Street Brookly NY 11215",
        our_address: "50 West 17th Street New York 10011",
        bins:  {
            type: "0",
            quantity: 0
        },
        cases: {
            type: "1",
            quantity: 0
        },
        Vflats: {
            type: "1",
            quantity: 0
        },
        additional: {
            type: "3",
            quantity: 0
        },
        date_time: "08/31/2018"
    }
    constructor(props) {
        super(props);

        this.state = {
            ...this.formData,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.submit = this.submit.bind(this);
    }


    submit(ev) {
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
            date_time,
        } = this.state

        ev.preventDefault()
        
        const formData = {
            service,
            name,
            notes,
            customer_address,
            our_address,
            bins,
            cases,
            Vflats,
            additional,
            date_time,
        };
        console.log("FormComponent.submit(): formdata=", formData)
        //this.props.createOrder(formData)
            // .then(() => {
            //     this.props.history.push("/order");
            // })
        axios.post("/orders", {...formData})
            .then(data => {
                const orderInfo = data.data;

                console.log("FormComponent.sumbit: returned data = ", data)
            })
            .catch(err => {
                //do something with error. Show it or something
                console.log("FormComponent.sumbit: returned error = ", err)
            })

        
    }

    /*
    1. Pending request
    2. a) Success
        b) Fail
    */

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleChangeOption(e) {
        this.setState({
            [e.target.name]: {...this.state[e.target.name], type: e.target.value}
        })
    }

    handleChangeQuantity(e) {
        console.log("FormComponent: handleChangeQuantity: ",
            "name=", e.target.name, ", value=", e.target.value)
        const quantity = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 0;
        this.setState({
            [e.target.name]: {...this.state[e.target.name], quantity }
        })
    }

    onLocationChange = (address) => {
        this.setState({
            our_address: address,
        })
    }

    render() {
        const {
            name, notes, cases, Vflats, bins, date_time, service,
            our_address,
            customer_address 
        } = this.state;

        const minDateStr = moment().format('YYYY-MM-DD')
        return(
                <form onSubmit={this.submit} style={{background: 'white', padding: 15,marginTop: 10}}>
                    <img src='/logo2.jpg' style={{width: '100%'}}/>

                    <div>
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '5px 0',
                                background: mainBGColor,
                                color: 'white',
                                marginBottom: 5,
                            }}
                        >
                            Select Service
                        </div>
                        <div style={{
                            textAlign: 'center',
                            paddingBottom: 15,
                        }}>
                        <select 
                            style={{
                                display: 'inline-block',
                            }} 
                            name={'service'} 
                            onChange={this.handleChange}
                            required
                        >
                            <option value="delivery" selected={service === "delivery"}>Delivery</option>
                            <option value="pick-up" selected={service === "pick-up"}>Pick Up</option>
                        </select>
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '5px 0',
                                background: mainBGColor,
                                color: 'white',
                                marginBottom: 5,
                            }}
                        >
                            Customer Name
                        </div>
                        <p>
                            <input
                                type="text"
                                defaultValue={name} 
                                //value={name} 
                                size='50' 
                                name='name' 
                                onChange={this.handleChange} 
                                required
                            />
                        </p>
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '5px 0',
                                background: mainBGColor,
                                color: 'white',
                                marginBottom: 5,
                            }}
                        >
                            Select Location
                        </div>
                        
                        <div style={{
                            padding: '15px 0'
                        }}>
                        <div
                         style={{
                            paddingBottom: 15,
                        }}
                        >
                            <StoreLocation
                                name={'Manhattan'}
                                address={'50 West 17th Street New York 10011'}
                                background={'http://www.yellowmaps.com/maps/img/US/political/Minnesota-political-map-796.jpg'}
                                onSelect={this.onLocationChange}
                                selected={our_address === '50 West 17th Street New York 10011'}
                            />
                            <StoreLocation
                                name={'Brooklyn'}
                                address={'370 19th Street Brookly NY 11215'}
                                background={'http://www.yellowmaps.com/maps/img/US/political/Minnesota-political-map-796.jpg'}
                                onSelect={this.onLocationChange}
                                selected={our_address === '370 19th Street Brookly NY 11215'}
                            />

                        </div>
                        <div>
                            <div>Customer Address {customer_address}</div>
                            <input
                                style={{
                                    width: 300.
                                }}
                                type="text"
                                defaultValue={customer_address} 
                                //value={customer_address}
                                name='customer_address' 
                                onChange={this.handleChange} 
                                required
                            />
                        </div>
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '5px 0',
                                background: mainBGColor,
                                color: 'white',
                                marginBottom: 5,
                            }}
                        >
                            Select Packages
                        </div>
                        <div
                            style={{
                                display: 'inline-block',
                                textAlign: 'right',
                                textTransform: 'uppercase',
                                padding: '3px 5px',
                                marginRight: 6,
                                marginLeft: 281,
                                boxSizing: 'border-box'
                            }}
                        >
                            Items
                        </div>
                        
                        <div
                            style={{
                                display: 'inline-block',
                                marginLeft: 91,
                                textTransform: 'uppercase',
                                padding: '3px 5px',
                                boxSizing: 'border-box'
                            }}
                        >
                            Quantity
                        </div>

                    </div>
                    {formItemProps.map(({label, name, options}, i) => {
                        return <FormItem
                            key={i}
                            label={label}
                            name={name}
                            onChange={this.handleChangeQuantity}
                            onChangeOption={this.handleChangeOption}
                            options={options}
                            index={i}
                            formData={this.formData}
                        />
                    })}

                
                    <input
                        type="date"
                        name="date_time"
                        //value={date_time}
                        defaultValue={date_time}
                        onChange={this.handleChange} 
                        min={minDateStr}
                        required
                    />

                    <div>
                        <div>Notes</div>
                        <textarea name="notes" value={notes} onChange={this.handleChange}  />
                    </div>

                    <button type="submit" style={{fontSize: 20}}>Submit</button>
                </form>

                
            
        )
    }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {
    return {
        createOrder: (orderInfo) => {
            return dispatch(createOrder(orderInfo));
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent));
