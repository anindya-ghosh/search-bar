import React, { Component } from 'react';
import Card from '../card'

import './index.css';

class Result extends Component {
  constructor () {
    super();
    this.state = {keyState: 0};
    this._curHoverId = -1;
    this.resultSpace = React.createRef();
    this._setMouseHoveredCard = this._setMouseHoveredCard.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._decideScrollPosition = this._decideScrollPosition.bind(this);
  }
  _keyDownHandler (e) {
    if (e.keyCode === 38) { // up
      this._curHoverId > 0 && (this._curHoverId--);
      this.setState({keyState: -1});
      e.preventDefault();
    }
    if (e.keyCode === 40) { // down
      (this._curHoverId < this.props.searchResult.length - 1) && (this._curHoverId++);
      this.setState({keyState: 1});
    }
  }
  _decideScrollPosition (cardRef) {
    if (cardRef) {
      let hoveredCardBound = cardRef.current.getBoundingClientRect(),
        resultSpaceBound = this.resultSpace.current.getBoundingClientRect();
      if (hoveredCardBound.bottom > resultSpaceBound.bottom) {
        let offSet = Math.abs(hoveredCardBound.bottom - resultSpaceBound.bottom);
        this.resultSpace.current.scrollTop += offSet;
      }
      if (hoveredCardBound.top < resultSpaceBound.top) {
        let offSet = Math.abs(hoveredCardBound.top - resultSpaceBound.top);
        this.resultSpace.current.scrollTop -= offSet;
      }
    }
  }
  _setMouseHoveredCard (id) {
    this.setState({keyState: 0});
    id !== undefined && (this._curHoverId = id);
    
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
            setMouseHoveredCard = {this._setMouseHoveredCard}
            decideScrollPosition = {this._decideScrollPosition}
          />)
        }
      </div>
    );
  }
}
export default Result;