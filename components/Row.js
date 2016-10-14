import React from 'react';
import Tile from './Tile';

class Row extends React.Component {
  handleMove(rowId, tileId) {
    this.props.handleMove(rowId, tileId);
  }
  renderTile(key) {
    return <Tile key={key} 
                 tileId={key}
                 rowId={this.props.rowId}
                 details={this.props.details[key]} 
                 handleMove={this.handleMove.bind(this)}/>
  }

  render() {
    return (
      <div>  
        {Object.keys(this.props.details).map(this.renderTile.bind(this))}
      </div>  
    )  
  }
}

export default Row