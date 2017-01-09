'use strict';

import React from 'react';

import FilterList from '../app/components/common/filterList';
import HierarchyList from '../app/components/common/hierarchyList';

class SWAPIPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            currentPerson: {},
            loading: false,
            currentId: 1
        }
        this.getPerson = this.getPerson.bind(this);
        this.setCurrentId = this.setCurrentId.bind(this);    
        this.trySubmit = this.trySubmit.bind(this);        
    }
    componentDidMount () { 
        this.getPerson();
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
            this.getPerson();
        }
    }
    setCurrentId (id) {
        this.setState({ currentId: id });
    }
    getPerson () {
        if(!this.state.loading) {            
            if( this.state.currentId && parseInt(this.state.currentId) > 0 ){
                this.setState({ loading: true });
                fetch('http://swapi.co/api/people/' + this.state.currentId)
                    .then((response) => response.json())
                    .then((response) => { this.setState({ currentPerson: response, loading: false }); });
            }
        }
    }

}
SWAPIPage.pageName = 'SWAPI';

export default SWAPIPage;
