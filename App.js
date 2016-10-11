import React from 'react';
import Tile from './Tile';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tiles : {},
      currentMove : {}      
    }
  }
  handleMove(key) {
    
    if (this.state.currentMove['index'] == undefined) {
      
      this.state.currentMove['index'] = key;
      this.state.currentMove['color'] = this.state.tiles[key].color;
      this.state.tiles[key].status = 'open';
      this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove });

    } else {
        
        if (this.state.currentMove['color'] == this.state.tiles[key].color) {

          this.state.tiles[key].status = 'open';
          this.state.tiles[this.state.currentMove['index']].status = 'open';
          this.state.currentMove = {};
          this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove });

        } else {

            this.state.tiles[this.state.currentMove['index']].status = 'closed';
            this.state.currentMove = {};
            this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove }); 

        }
    }
  }
  loadSamples () {
    this.setState({
      tiles : require('./sample_tiles')
    });
  }
  renderTile(key) {
    return <Tile key={key} 
                 index={key} 
                 details={this.state.tiles[key]} 
                 handleMove={this.handleMove.bind(this)}/>
  }
  render() {
    return (
      <div className="row">  
        <div className="col-md-5">
          <div className="row">    
            { Object.keys(this.state.tiles).map(this.renderTile.bind(this)) }
          </div>
        </div>    
        <div className="col-md-5 col-md-offset-1">
          <button onClick={this.loadSamples.bind(this)}>Start game!</button>  
        </div> 
      </div>    
    )  
  }
}

export default App