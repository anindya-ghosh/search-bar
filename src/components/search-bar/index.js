import React, { Component } from 'react';
import './index.css';
class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = { hideButton: true };
    this.searchText = React.createRef();
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler () {
    this.searchText.current.value = '';
    this.setState({hideButton: true});
    this.props.notifyClear();
  }
  onChangeHandler (e) {
    this.setState({hideButton: this.searchText.current.value === ''})
    this.props.setCurrentSearchKey(this.searchText.current.value);
    this.props.fetchSearchKey(e);
  }
  render () {
    var hide = this.state.hideButton ? 'hide' : '';
    return (
      <div className='search-bar'>
        <input 
          type='text' className='search-text' 
          placeholder='Search user by ID, address, name..'
          ref = {this.searchText}
          onChange = {this.onChangeHandler}
        />
        <div className='search-icon'></div>
        <div className={`close ${hide}`} onClick={ this.onClickHandler }></div>
      </div>
    );
  }
}

export default SearchBar;