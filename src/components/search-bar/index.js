import React, { Component } from 'react';
import './index.css';
class SearchBar extends Component {
  /**
   * constructor fn
   * @param {Object} props component props
   */
  constructor (props) {
    super(props);
    this.state = { hideButton: true };
    this.searchText = React.createRef();
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  /**
   * handles job on click on the cross button
   * - it hides the cross button
   * - notifies parent to reset search key state
   * - resets value of the search bar
   */
  onClickHandler () {
    this.searchText.current.value = '';
    this.setState({hideButton: true});
    this.props.notifyClear();
  }
  /**
   * handles job on change of the search bar
   * - hides cross button if search bar contain an empty string
   * - passes current value to parent component
   * - invokes parent's fetch API
   * @param {Event} e React event object
   */
  onChangeHandler (e) {
    this.setState({hideButton: this.searchText.current.value === ''})
    this.props.setCurrentSearchKey(this.searchText.current.value);
    this.props.fetchSearchKey(e);
  }
  /**
   * renders SearchBar component
   */
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