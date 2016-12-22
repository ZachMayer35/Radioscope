import React, { PropTypes } from 'react'
import ReduxComponent from '../../ReduxComponent';
import Dropdown from './dropdown';

const TOGGLE_EXPAND = 'TOGGLE_EXPAND';

class Scope extends ReduxComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
    this.createStore(this.state);
    this.addAction(TOGGLE_EXPAND, () => ({ type: TOGGLE_EXPAND }));
    this.addReducer(TOGGLE_EXPAND, (state) => (Object.assign({}, state, { expanded: !state.expanded })));

    this.getMenu = this.getMenu.bind(this);
    this.getMenuOptions = this.getMenuOptions.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }
  componentDidMount() {
    if (this.props.mode) {
      this.props.setMode(this.props.mode);
      if (!this.props.selection.name) {
        this.props.changeSelection(this.props.All);
      }
    }
  }
  render() {
    const { selection, cancel, open } = this.props;
    const expanded = this.store.getState().expanded;
    return (<Dropdown
      selection={selection}
      getContent={this.getMenu}
      ref={(Dropdown) => { this.Dropdown = Dropdown ? Dropdown.refs.instance : null; } }
      onCancel={cancel}
      onOpen={open}
      expanded={expanded}
      />);
  }
  getMenu(open) {
    const { selection, mode, Hierarchy, Accounts, Services, MODES } = this.props;
    const expanded = this.store.getState().expanded;
    let menu = (this.getMenuOptions());
    console.log(Hierarchy);
    if (MODES.HIERARCHY === mode && open) {
      menu = (<div className='flex-parent'>
        <div className='flex-menu'>
          {this.getMenuOptions()}
        </div>
        <div className='flex-content'>
          <Hierarchy onSelectionChanged={this.onSelectionChanged} toggleExpand={this.toggleExpand} expanded={expanded} />
        </div>
      </div>);
    } else if (MODES.ACCOUNT === mode && open) {
      menu = (<div className='flex-parent'>
        <div className='flex-menu'>
          {this.getMenuOptions()}
        </div>
        <div className='flex-content'>
          <Accounts onSelectionChanged={this.onSelectionChanged} toggleExpand={this.toggleExpand} expanded={expanded} />
        </div>
      </div>)
    } else if (MODES.SERVICE === mode && open) {
      menu = (<div className='flex-parent'>
        <div className='flex-menu'>
          {this.getMenuOptions()}
        </div>
        <div className='flex-content'>
          <Services onSelectionChanged={this.onSelectionChanged} toggleExpand={this.toggleExpand} expanded={expanded} />
        </div>
      </div>)
    }
    return menu;
  }
  getMenuOptions() {
    const { setMode, mode, changeSelection, MODES } = this.props;
    const allLinkClass = mode === MODES.ALL ? 'btn btn-block btn-primary' : 'btn btn-block btn-link';
    const hierarchyLinkClass = mode === MODES.HIERARCHY ? 'btn btn-block btn-primary' : 'btn btn-block btn-link';
    const accountLinkClass = mode === MODES.ACCOUNT ? 'btn btn-block btn-primary' : 'btn btn-block btn-link';
    const serviceLinkClass = mode === MODES.SERVICE ? 'btn btn-block btn-primary' : 'btn btn-block btn-link';
    return (<div>
      <button className={allLinkClass} onClick={e => { setMode(MODES.ALL); changeSelection(this.props.All); this.onSelectionChanged() } }>{this.props.All.name}</button>
      <br />
      <button className={hierarchyLinkClass} onClick={e => { setMode(MODES.HIERARCHY) } }>Hierarchy</button>
      <br />
      <button className={accountLinkClass} onClick={e => { setMode(MODES.ACCOUNT) } }>Account</button>
      <br />
      <button className={serviceLinkClass} onClick={e => { setMode(MODES.SERVICE) } }>Service</button>
    </div>);
  }
  onSelectionChanged() {
    if (this.Dropdown) {
      this.Dropdown.close();
      this.toggleExpand();
    }
  }
  toggleExpand() {
    if (this.Dropdown && this.Dropdown.store.getState().open) {
      this.dispatch(this.actions.TOGGLE_EXPAND());
    } else if (this.store.getState().expanded) {
      this.dispatch(this.actions.TOGGLE_EXPAND());
    }
  }
};

Scope.propTypes = {
  mode: PropTypes.string.isRequired,
  selection: PropTypes.object.isRequired,
  Hierarchy: PropTypes.func.isRequired, // Connected react/redux component
  Accounts: PropTypes.func.isRequired, // Connected react/redux component
  Services: PropTypes.func.isRequired, // Connected react/redux component
  All: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired
  }),
  MODES: PropTypes.shape({
    ALL: PropTypes.string,
    ACCOUNT: PropTypes.stirng,
    SERVICE: PropTypes.string,
    HIERARCHY: PropTypes.string
  }),
  setMode: PropTypes.func.isRequired,
  changeSelection: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}

export default Scope;
