'use strict';

var React = require('react');
//require('./counter.scss');

/**
 * @class Fibonacci
 * @extends ReactComponent
 */
class Fibonacci extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            n: 0,
            f: 1,
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);        
    }

    render () {
        return (
            <div className='Counter'>

                <h1 className='-text'>Fibonacci</h1>
                <p className='-text'>Increment N to get the next fibonacci number in the sequence.</p>
                <span className='-text'>
                    n = {this.state.n}
                    <br />
                    Fibonacci Number At N = {this.state.f}
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

    _requestData (newN) {
        if(newN >= 0){
            var oReq = new XMLHttpRequest();        
            oReq.addEventListener("load", function(e){
                this.setState({n: newN});
                console.log(e.currentTarget.response);
                this.setState({f: e.currentTarget.response});
            }.bind(this));
            oReq.open("GET", global.API_PATH + "/fibonacci/getNth/" + newN);
            oReq.send();
        }
    }
}


module.exports = Fibonacci;
