import React from 'react';
import Row from './Row';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tiles : {},
      currentMove : {},
      n: 4   
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
  generateSamples (n) {
    let tilesSample = {}
    for (var i=1; i<= n; i++) {  
      tilesSample[`row - ${i}`]={}
      for (var j=1; j<= n; j++) {
        tilesSample[`row - ${i}`][`tile - ${j}`]={}
        tilesSample[`row - ${i}`][`tile - ${j}`].status = 'closed'
        tilesSample[`row - ${i}`][`tile - ${j}`].color = '#CD5C5C'
      }
    }
    this.setState({ tiles : tilesSample });
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
          <button onClick={this.generateSamples.bind(this, this.state.n)}>Start game!</button>  
        </div> 
      </div>    
    )  
  }
}

export default App