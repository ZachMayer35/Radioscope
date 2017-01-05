'use strict';

import React from 'react';

import FilterList from '../app/components/common/filterList';
import HierarchyList from '../app/components/common/hierarchyList';

class MiscPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            listSelection: {},
            treeSelection: {}
        };

        this.selectListItem = this.selectListItem.bind(this);
        this.selectTreeItem = this.selectTreeItem.bind(this);
    }
    render () {
        return (
            <div className='flex-container'>
                <p className='-text'>Misc Control Playground</p>                
                <br/>
                <div className='row'>                    
                    <div className='col-xs-6'>
                        <h3>Filter List</h3>
                        <p className='-text'>A control for filtering and selecting in a list.</p>                        
                        <FilterList
                            onSelectionChanged={this.selectListItem}
                            list={[
                                { id: '1', name: 'Thing 1' },
                                { id: '2', name: 'Thing 2' },
                                { id: '3', name: 'Thing 3' },
                                { id: '4', name: 'Thing 4' },
                                { id: '5', name: 'Thing 5' },
                                { id: '6', name: 'Thing 6' },
                                { id: '7', name: 'Thing 7' },
                                { id: '8', name: 'Thing 8' },
                                { id: '9', name: 'Thing 9' },
                                { id: '10', name: 'Thing 10' }, 
                            ]}
                            />
                        <hr/>
                        <p className='-text'>
                            <strong>Current Selection: </strong>
                            <span>{this.state.listSelection.name}</span>
                        </p>
                        <pre>{JSON.stringify(this.state.listSelection, null, 2)}</pre>
                    </div>
                    <div className='col-xs-6'>
                        <h3>Filter Tree</h3>
                        <p className='-text'>A control for filtering and selecting in a tree.</p>    
                        <HierarchyList 
                            onSelectionChanged={this.selectTreeItem}
                            nodes={[
                                { id: '1', name: 'Hierarchy 10', favorite: false, children: [
                                    { id: '1.1', name: 'Child 10', favorite: false, },
                                    { id: '1.2', name: 'Child 11', favorite: false },
                                    { id: '1.3', name: 'Child 12', favorite: false }   
                                ] },
                                { id: '2', name: 'Hierarchy 21', favorite: false, children: [
                                    { id: '2.1', name: 'Child 20', favorite: false },
                                    { id: '2.2', name: 'Child 21', favorite: false, children: [
                                        { id: '2.2.1', name: 'Child 21.1', favorite: false },
                                        { id: '2.2.2', name: 'Child 21.2', favorite: false, children: [
                                            { id: '2.2.2.1', name: 'Child 21.2.1', favorite: false },
                                            { id: '2.2.2.2', name: 'Child 21.2.2', favorite: false },
                                            { id: '2.2.2.3', name: 'Child 21.2.3', favorite: false },
                                        ] },
                                        { id: '2.2.3', name: 'Child 21.3', favorite: true }  
                                    ] },                            
                                    { id: '2.3', name: 'Child 22', favorite: false }                            
                                ] },
                                { id: '3', name: 'Hierarchy 32', favorite: false, children: [
                                    { id: '3.1', name: 'Child 30', favorite: false },                            
                                    { id: '3.2', name: 'Child 31', favorite: false },
                                    { id: '3.3', name: 'Child 32', favorite: false, children: [
                                        { id: '3.3.1', name: 'Child 32.1', favorite: false },
                                        { id: '3.3.2', name: 'Child 32.2', favorite: false },
                                        { id: '3.3.3', name: 'Child 32.3', favorite: true }  
                                    ] }
                                ] },
                                { id: '4', name: 'Hierarchy 43', favorite: true }
                            ]}
                            />
                        <hr/>
                        <p className='-text'>
                            <strong>Current Selection: </strong>
                            <span>{this.state.treeSelection.path}</span>
                        </p>
                        <pre>{JSON.stringify(this.state.treeSelection, null, 2)}</pre>
                    </div>
                </div>
            </div>
        );
    }
    selectListItem (item) {
        this.setState({ listSelection: item });
    }
    selectTreeItem (item) {
        this.setState({ treeSelection: item });
    }
}
MiscPage.pageName = 'Miscellaneous Controls';

export default MiscPage;
