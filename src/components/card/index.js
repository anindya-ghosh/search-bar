import React, { Component } from 'react';
import './index.css';

function RenderItems (props) {
  // var result = false;
  // for (let i = 0, len = props.items.length; i < len; i++) {
  //   if (props.items[i].split(props.highlight).length > 1) {
  //     result = true;
  //     break;
  //   }
  // }
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
  render () {
    return (
      <div className="card">
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