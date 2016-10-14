import React from 'react';
import Tile from './Tile';


class Row extends React.Component {
  handleMove(id, i) {
    this.props.handleMove(id, i);
  }
  renderTile(key) {
    return <Tile key={key} 
                 index={key}
                 rowId={this.props.index}
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