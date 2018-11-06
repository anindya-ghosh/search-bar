import React, { Component } from 'react';
import './index.css';

function RenderItems (props) {
  if (props.found) {
    return <div className="items"><div className="dot"></div><div className="item-found">{`"${props.highlight}" found in items`}</div></div>
  }
  return <div></div>
}

function TextHighLighter (props) {
  var textElems = [],
    text = (props.text || []);
    text = (props.text || '').toLowerCase().split(props.highlight.toLowerCase());
  for (let i = 0, len = text.length; i < len; i++) {
    if (i !== 0) {
      textElems.push(
        <span className='highlight-text' key={`${props.highlight}-${i}`}>{props.highlight}</span>
      );  
    }
    textElems.push(
      <span className='normal-text' key={`${text[i]}-${i}`}>{text[i]}</span>
    );
  }
  return textElems;
}
class Card extends Component {
  /**
   * constructor fn
   * @param {Object} props component props
   */
  constructor (props) {
    super(props);
    this.card = React.createRef();
    this.state = {hovered : false};
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
  }
  /**
   * notifies parent component that the card is hovered or selected
   * by key board arrow key / mouse pointer to decide current scroll position
   */
  componentDidUpdate () {
    this.card.current.className = `card ${this.props.hovered ? 'hover' : ''}`;
    this.props.hovered && (this.props.decideScrollPosition(this.card));
  }
  /**
   * notifies parent component that the card is hovered by mouse pointer so that
   * when keyboard arrow key is pressed it knows where the pointer was previously
   */
  mouseOverHandler () {
    this.card.current.className = `card ${this.props.hovered ? 'hover' : ''}`;
    this.props.setMouseHoveredCard(this.props.index);
  }
  /**
   * renderd Card component
   */
  render () {
    return (
      <div className={`card`} ref = {this.card} onMouseOver = {this.mouseOverHandler}>
        <div className="id">
          <React.Fragment>
            <TextHighLighter text = {this.props.id} highlight = {this.props.highlight}/>
          </React.Fragment>
        </div>
        <div className="name">
          <React.Fragment>
              <TextHighLighter text = {this.props.name} highlight = {this.props.highlight}/>
            </React.Fragment>
        </div>
        <React.Fragment>
          <RenderItems found = {!!this.props.items} highlight = {this.props.highlight}/>
        </React.Fragment>
        <div className="address">
          <React.Fragment>
            <TextHighLighter text = {this.props.address} highlight = {this.props.highlight}/>
          </React.Fragment>
        </div>
        <div className="pincode">
          <React.Fragment>
            <TextHighLighter text = {this.props.pincode} highlight = {this.props.highlight}/>
          </React.Fragment>
        </div>
      </div>
    );
  }
}
export default Card;