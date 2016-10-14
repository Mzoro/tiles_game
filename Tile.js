import React from 'react';

class Tile extends React.Component {
  onButtonClick() {
    this.props.handleMove(this.props.rowId, this.props.index);
  }
  render () {
    const buttonColor = (this.props.details.status === 'closed' ? 'white' : this.props.details.color );
    return (
      <button disabled={!(this.props.details.status === 'closed')} 
              onClick={this.onButtonClick.bind(this)} 
              style={{ background: buttonColor, 
                       width: 90,
                       height: 60}}>
      </button>
    )
  }
}

export default Tile