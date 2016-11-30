'use strict';

import React from 'react';
import css from './fibonacci.less';

/**
 * @class Fibonacci
 * @extends ReactComponent
 */
class Fibonacci extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            n: parseInt(this.props.initial_N),
            f: 1,
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);  
        this.reset = this.reset.bind(this); 

        this.reset();     
    }

    render () {
        return (
            <div className='Fibonacci'>

                <h1 className='-text'>Fibonacci</h1>
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>
                <span className='-text'>
                    n = <span className='-number n'>{this.state.n}</span>
                    <br />
                    Fibonacci Number At N = <span className='-number f'>{this.state.f}</span>
                </span>                
                <button className='-button' type='button' onClick={this.increment.bind(this)}>+</button>
                <button className='-button' type='button' onClick={this.decrement.bind(this)}>–</button>

            </div>
        );
    }

    increment () {
        this._requestData(this.state.n + 1)
    }

    decrement () {
        this._requestData(this.state.n - 1)
    }

    reset () {
        this._requestData(this.state.n);
    }

    _requestData (newN) {
        if(newN >= 0){
            var oReq = new XMLHttpRequest();        
            oReq.addEventListener("load", function(e){
                this.setState({n: newN});
                this.setState({f: parseInt(e.target.response)});
                this.props.requestComplete();
            }.bind(this));
            oReq.open("GET", global.API_PATH + "/fibonacci/getNth/" + newN);
            oReq.send();
        }
    }
}


Fibonacci.defaultProps = {
    initial_N: 0,
    requestComplete: function(){ /* default empty request complete harness */ }
};

Fibonacci.propTypes = {
    initial_N: React.PropTypes.number.isRequired,
    requestComplete: React.PropTypes.func.isRequired
};

module.exports = Fibonacci;
