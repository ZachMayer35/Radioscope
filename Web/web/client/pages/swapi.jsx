'use strict';

import React from 'react';

import FilterList from '../app/components/common/filterList';
import HierarchyList from '../app/components/common/hierarchyList';

class SWAPIPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            currentPerson: {}
        }
        this.getPerson = this.getPerson.bind(this);
        this.getPerson(1);
    }
    render () {
        const { currentPerson } = this.state;
        const getPerson = this.getPerson;
        return (
            <div className='col-xs-12'>
                <p className='-text'>SWAPI Playground</p>
                <input className='form-control' type='text' onChange={(e) => { getPerson(e.target.value); }} ></input>
                <hr />
                <div className='row'>                    
                    <div className='col-xs-12'>
                        <pre>
                            {JSON.stringify(currentPerson, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
    getPerson (id) {
        fetch('http://swapi.co/api/people/' + id)
            .then((response) => response.json())
            .then((response) => { this.setState({currentPerson: response}); this.forceUpdate(); });
    }

}
SWAPIPage.pageName = 'SWAPI';

export default SWAPIPage;
