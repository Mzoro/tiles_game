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
  
  componentDidMount() { 
    this.generateSamples(this.getValue()); 
  }

  getValue() {
    let value = prompt("enter size of board: 4 or 6 or 8")
    if ( value != 4 && value != 6 && value != 8) {
      alert("size must equal only 4 or 6 or 8")
      return this.getValue()
    }
    else return value
  }

  handleMove(rowId, tileId) {
   
    if (this.state.currentMove['rowId'] == undefined) {
            
      this.state.currentMove['rowId'] = rowId;
      this.state.currentMove['tileId'] = tileId;
      this.state.currentMove['color'] = this.state.tiles[rowId][tileId].color;
      this.state.tiles[rowId][tileId].status = 'open';
      this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove });

    } else {
        
        if (this.state.currentMove['color'] == this.state.tiles[rowId][tileId].color) {

          this.state.tiles[rowId][tileId].status = 'open';
          this.state.tiles[this.state.currentMove['rowId']][this.state.currentMove['tileId']].status = 'open';
          this.state.currentMove = {};
          this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove });

        } else {

            this.state.tiles[this.state.currentMove['rowId']][this.state.currentMove['tileId']].status = 'closed';
            this.state.currentMove = {};
            this.setState({ tiles : this.state.tiles, currentMove : this.state.currentMove }); 

        }
    }
  }
  generateSamples(n) {
    let sampleTiles = {}
    let allColors = require('../sample_colors')
    let restColors = []
    let randomIndex = 0

    if ( n == 8) {
      
      restColors = allColors
    
    } else {
        for ( let i = 1; i <= (n * n) / 2; i++ ) {
          
          randomIndex = Math.floor(Math.random() * allColors.length)
          restColors.push(allColors[randomIndex])
          allColors.splice(randomIndex, 1)
        }
    }  

    restColors = restColors.concat(restColors)
    
    for ( let i = 1; i <= n; i++ ) {  
      
      sampleTiles[`row - ${i}`] = {}
      
      for ( let j = 1; j <= n; j++ ) {
        
        sampleTiles[`row - ${i}`][`tile - ${j}`]={}
        sampleTiles[`row - ${i}`][`tile - ${j}`].status = 'closed'

        randomIndex = Math.floor(Math.random() * restColors.length)
        sampleTiles[`row - ${i}`][`tile - ${j}`].color = restColors[randomIndex]
        restColors.splice(randomIndex, 1)
      }
    }
    this.setState({ tiles : sampleTiles });
  }
  renderRow(key) {
    return <Row key={key} 
                rowId={key} 
                details={this.state.tiles[key]} 
                handleMove={this.handleMove.bind(this)}/>
  }
  render() {
    return (
      <div>      
        { Object.keys(this.state.tiles).map(this.renderRow.bind(this)) }
      </div>   
    )  
  }
}

export default App