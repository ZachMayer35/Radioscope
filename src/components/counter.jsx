'use strict';

var React = require('react');
require('./counter.scss');

/**
 * @class Counter
 * @extends ReactComponent
 */
class Counter extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            counter: 0
        };

        this.increment = this.increment.bind(this);
        this.remove = this.remove.bind(this);

        setInterval(this.increment.bind(this), this.props.interval);
    }

    render () {
        return (
            <div className='Counter'>

                <h1 className='-text'>Counter</h1>

                <span className='-number'>{this.state.counter}</span>
                <button className='-button' type='button' onClick={this.increment.bind(this)}>+</button>
                <button className='-button' type='button' onClick={this.remove.bind(this)}>–</button>

            </div>
        );
    }

    increment () {
        super.setState({counter: this.state.counter + 1});
    }

    remove () {
        super.setState({counter: this.state.counter - 1});
    }
}


Counter.defaultProps = {
    interval: 2000
};

Counter.propTypes = {
    interval: React.PropTypes.number.isRequired
};


module.exports = Counter;
