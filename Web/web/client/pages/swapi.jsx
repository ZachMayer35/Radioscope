'use strict';

import React, { PropTypes } from 'react';
import store from '../app/store';
import { push } from 'react-router-redux';

class SWAPIPage extends React.Component {
    constructor (props) {
        super(props);
        console.log(`SWAPI PARAMS: ${JSON.stringify(props.params)}`)
        this.state = {
            currentPerson: {},
            loading: false,
            currentId: (props.params || {}).personId || 1
        }
        this.getPerson = this.getPerson.bind(this);
        this.setCurrentId = this.setCurrentId.bind(this);    
        this.trySubmit = this.trySubmit.bind(this);        
    }
    componentDidMount () { 
        this.getPerson();
    }    
    componentWillReceiveProps (nextProps) {
        console.log(JSON.stringify(nextProps));
        if ((nextProps.params || {}).personId !== this.state.currentId) {
            this.setState({ currentId: nextProps.params.personId });
            this.getPerson();
        }
    }
    render () {
        const { currentPerson } = this.state;
        const setCurrentId = this.setCurrentId;
        return (
            <div className='flex-container'>
                <p className='-text'>SWAPI Playground</p>
                <div className='input-group'>
                    <input className='form-control' type='text' value={this.state.currentId} onChange={(e) => { setCurrentId(e.target.value); }} onKeyUp={this.trySubmit}></input>
                    <div className='input-group-addon btn' onClick={this.getPerson}>Get Person...</div>
                </div>
                <hr />
                <div className='row'>                    
                    <div className='col-xs-12'>
                        <pre>
                            {this.state.loading ? 'Loading...' : JSON.stringify(currentPerson, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
    trySubmit (e) {
        if (e.key === 'Enter'){
            store.dispatch(push(`/Swapi/${this.state.currentId}`));
            this.getPerson();
        }
    }
    setCurrentId (id) {
        this.setState({ currentId: id });
    }
    getPerson () {
        if (!this.state.loading) {            
            if (this.state.currentId && parseInt(this.state.currentId) > 0) {
                this.setState({ loading: true });
                fetch(`/sw/api/people/${this.state.currentId}/?format=json`)
                    .then((response) => response.json())
                    .then((response) => { 
                        this.setState({ currentPerson: response, loading: false });                         
                    });
            }
        }
    }

}
SWAPIPage.pageName = 'SWAPI';

SWAPIPage.propTypes = {
    params: PropTypes.any
};

export default SWAPIPage;
