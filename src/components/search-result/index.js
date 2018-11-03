import React, { Component } from 'react';
import Card from '../card'

import './index.css';

class Result extends Component {
  constructor () {
    super();
    this.state = {keyState: 0};
    this._curHoverId = -1;
    this.resultSpace = React.createRef();
    this._setCurrentHoveredCard = this._setCurrentHoveredCard.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
  }
  _keyDownHandler (e) {
    if (e.keyCode === 38) { // up
      this._curHoverId > 0 && (this._curHoverId--);
      this.setState({keyState: -1});
    }
    if (e.keyCode === 40) { // down
      (this._curHoverId < this.props.searchResult.length - 1) && (this._curHoverId++);
      this.setState({keyState: 1});
    }
  }
  _setCurrentHoveredCard (id) {
    this.setState({keyState: 0});
    this._curHoverId = id;
  }
  componentDidUpdate (prevProps) {
    if (prevProps.searchKey !== this.props.searchKey) {
      this._curHoverId = -1;
      this.setState({keyState: 0});
    }
  }
  componentDidMount () {
    document.body.addEventListener('keydown', this._keyDownHandler);
  }
  componentWillUnmount () {
    document.body.removeEventListener('keydown', this._keyDownHandler);
  }
  render () {
    let noData = this.props.searchKey && !this.props.searchResult.length ? 'no-data' : '';
    return (
      <div className= {`search-result ${noData}`} ref = {this.resultSpace}>
        {
          this.props.searchResult.map((result, i) => <Card
            index = {i}
            key = {result.id}
            id = {result.id}
            name = {result.name}
            items = {result.items}
            address = {result.address}
            pincode = {result.pincode}
            highlight = {this.props.searchKey}
            hovered = {this._curHoverId === i}
            setCurrentHoveredCard = {this._setCurrentHoveredCard}
          />)
        }
      </div>
    );
  }
}
export default Result;