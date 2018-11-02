import React, { Component } from 'react';
import './index.css';
class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler (e) {
    this.props.setSearchKey(e);
    this.props.throttle(e);
  }
  render () {
    return (
      <div className='search-bar'>
        <input 
          type='text' className='search-text' 
          placeholder='Search user by ID, address, name..'
          onChange = {this.onChangeHandler}
        />
        <div className='search-icon'></div>
      </div>
    );
  }
}

export default SearchBar;