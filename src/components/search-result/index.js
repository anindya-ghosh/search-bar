import React, { Component } from 'react';
import Card from '../card'

import './index.css';

class Result extends Component {
  render () {
    let noData = this.props.searchKey && !this.props.searchResult.length ? 'no-data' : '';
    return (
      <div className= {`search-result ${noData}`}>
        {
          this.props.searchResult.map(result => <Card
            key = {result.id}
            id = {result.id}
            name = {result.name}
            items = {result.items}
            address = {result.address}
            pincode = {result.pincode}
            highlight = {this.props.searchKey}
          />)
        }
      </div>
    );
  }
}
export default Result;