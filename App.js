import React from 'react';
import Row from './Row';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tiles : {},
      currentMove : {}      
    }
  }
  handleMove(row, tile) {
   
    if (this.state.currentMove['row'] == undefined) {
            
      this.state.currentMove['row'] = row;
      this.state.currentMove['tile'] = tile;
      this.state.currentMove['color'] = this.state.tiles[row][tile].color;
      this.state.tiles[row][tile].status = 'open';
      this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove });

    } else {
        
        if (this.state.currentMove['color'] == this.state.tiles[row][tile].color) {

          this.state.tiles[row][tile].status = 'open';
          this.state.tiles[this.state.currentMove['row']][this.state.currentMove['tile']].status = 'open';
          this.state.currentMove = {};
          this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove });

        } else {

            this.state.tiles[this.state.currentMove['row']][this.state.currentMove['tile']].status = 'closed';
            this.state.currentMove = {};
            this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove }); 

        }
    }
  }
  loadSamples () {
    this.setState({
      tiles : require('./sample_rows')
    });
  }
  
  renderRow(key) {
    return <Row key={key} 
                index={key} 
                details={this.state.tiles[key]} 
                handleMove={this.handleMove.bind(this)}/>
  }
  render() {
    return (
      <div >  
        <div>    
          { Object.keys(this.state.tiles).map(this.renderRow.bind(this)) }
        </div>
        <div >
          <button onClick={this.loadSamples.bind(this)}>Start game!</button>  
        </div> 
      </div>    
    )  
  }
}

export default App