import React from 'react';

class Tile extends React.Component {
  onButtonClick() {
    this.props.handleMove(this.props.index);
  }
  render () {
    const buttonColor = (this.props.details.status === 'closed' ? 'white' : this.props.details.color );
    return (
      <div className="col-md-3">
        <button disabled={!(this.props.details.status === 'closed')} 
                onClick={this.onButtonClick.bind(this)} 
                style={{ background: buttonColor, 
                         width: 130,
                         height: 60}}>
        </button>
      </div>
    )
  }
}

export default Tile