import React, { Component } from 'react';
import SearchBar from './components/search-bar';
import SearchResult from './components/search-result';
import data from './ext-data/data';
import './app.css';

function search (key) {
  var result = [],
    len = data.length,
    _key = key.toLowerCase(),
    found,
    itemFound,
    datum;
  for (let i = 0; i < len; i++) {
    found = false;
    datum = data[i];
    if (datum.id && datum.id.toLowerCase().split(_key).length > 1) {
      found = true;
    }
    if (datum.name && datum.name.toLowerCase().split(_key).length > 1) {
      found = true;
    }
    if (datum.address && datum.address.toLowerCase().split(_key).length > 1) {
      found = true;
    }
    if (datum.pincode && datum.pincode.toLowerCase().split(_key).length > 1) {
      found = true;
    }
    for (let i = 0, len = datum.items && datum.items.length; i < len; i++) {
      if (datum.items[i].toLowerCase().split(_key).length > 1) {
        itemFound = true;
        found = true;
        break;
      }
    }

    if (found) {
      result.push(Object.assign({}, datum, {items: itemFound ? `"${key}" found in items`  : ''}));
    }
  }
  return result;
}

function fetchSearchKey(fn, wait) {
  var time = Date.now(),
    timeOutId;
  return function(e) {
    if (((time + wait - Date.now()) < 0) || e.keyCode === 13) {
      clearTimeout(timeOutId);
      fn();
      time = Date.now();
    } else {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(fn, wait);
    }
  }
}
class App extends Component {
  /**
   * constructor function
   * @param {Object} props Component props
   */
  constructor (props) {
    super(props);
    this.state = {
      searchKey: '',
      searchResult: []
    };
    this.fetchSearchKey = fetchSearchKey(this.fetchSearchResult, 300);
  }
  /**
   * stores the current search key passed from the search bar component on every change
   * @param {string} key 
   */
  setCurrentSearchKey = (key = '') => {
    this.currentKey = key;
  }
  /**
   * initiates an API call for search with stored search key
   */
  fetchSearchResult = () => {
    this.setState(() => {
      return {
        searchKey: this.currentKey,
        searchResult: this.currentKey ? search(this.currentKey) : []
      }
    });
  }
  /**
   * resets search key state
   */
  notifyClear = () => {
    this.currentKey = '';
    this.setState({
      searchKey: this.currentKey,
      searchResult: []
    });
  }
  /**
   * renders App component
   */
  render() {
    return (
      <div className="Search-App">
        <SearchBar
          fetchSearchKey = { this.fetchSearchKey }
          setCurrentSearchKey = { this.setCurrentSearchKey }
          notifyClear = { this.notifyClear }
        />
        <SearchResult
          searchKey = { this.state.searchKey }
          searchResult = { this.state.searchResult }
        />
      </div>
    );
  }
}

export default App;
