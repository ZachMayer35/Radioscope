import React, { PropTypes } from 'react'
import ReduxComponent from '../../ReduxComponent';
import onClickOutside from 'react-onclickoutside';

const TOGGLE_OPEN = 'TOGGLE_OPEN';
const TOGGLE_EXPAND = 'TOGGLE_EXPAND'
const CLOSE = 'CLOSE';

class Dropdown extends ReduxComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.createStore(this.state);

    this.addAction(TOGGLE_OPEN, () => ({ type: TOGGLE_OPEN }));
    this.addReducer(TOGGLE_OPEN, (state) => (Object.assign({}, state, { open: !state.open, expanded: false })));

    this.addAction(CLOSE, () => ({ type: CLOSE }));
    this.addReducer(CLOSE, (state) => (Object.assign({}, state, { open: false })));

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.close = this.close.bind(this);
  }
  render() {
    const { getContent, selection, expanded } = this.props;
    const { open } = this.store.getState();
    const menuClass = 'dropdown scopeDropdown' + (open ? ' open' : '') + (expanded ? ' expanded' : '');
    return (<div className={menuClass}>
      <button className='form-control text-left dropdown-toggle' id='dLabel' type='button' onClick={e => { this.dispatch(this.actions.TOGGLE_OPEN()); } }>
        <span className='selectionString' title={selection.name}>{selection.name}</span>
        <span className='caret'></span>
      </button>
      <div className='dropdown-menu'>
        {getContent(open)}
      </div>
    </div>)
  }
  close () {
    this.dispatch(this.actions.CLOSE());
  }
  open () {
    if(this.props.onOpen) {
      this.props.onOpen();
    }
  }
  cancel () {
    this.close();
    if(this.props.onCancel) {
      this.props.onCancel();
    }
  }
  handleClickOutside(evt) {
    if(!this.props.expanded && this.store.getState().open) {
      this.cancel();
    }
  }
};

Dropdown.propTypes = {
  selection: PropTypes.object,
  getContent: PropTypes.func,
  onCancel: PropTypes.func,
  onOpen: PropTypes.func,
  expanded: PropTypes.bool
}

export default onClickOutside(Dropdown);
