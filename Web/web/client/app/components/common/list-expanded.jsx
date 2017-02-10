'use strict';

import React, { PropTypes, Component } from 'react';
import Loader from './loader';
/* A single-select list rendered as a scrollable panel.  */

import '../../../assets/components/list.less';

class ListExpanded extends Component {
    render () {
        const { list, select, loading } = this.props;
        const panel = (
            <ul className='list-group'>
                {list.map((a) => (
                    <li key={a.id}
                        className={this.getClassName(a)}
                        onClick={() => { select(a); }}
                    >{a.name}</li>
                ))}
            </ul>
        );
        return (
            <div className='panel panel-default'>
                <Loader loading={loading} element={panel} />
            </div>
        );
    }
    getClassName (item) {
        return this.props.selected && this.props.selected.id === item.id ? 'list-item selected' : 'list-item';
    }
}

ListExpanded.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ),
    selected: PropTypes.object,
    select: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default ListExpanded;
