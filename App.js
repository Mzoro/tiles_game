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
    var value = + prompt("enter size of board: 4 or 6 or 8")
    if ( value != 4 && value != 6 && value != 8) {
      alert("size must equal only 4 or 6 or 8")
      return this.getValue()
    }
    else return value
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
  generateSamples(n) {
    let tilesSample = {}
    let allColors = require('./sample_colors')
    let restColors = []
    let rand = 0

    for (var i=1; i<= n * n/2; i++) {
      rand = Math.floor(Math.random() * allColors.length)
      restColors.push(allColors[rand])
      allColors.splice(rand, 1)
    }
    restColors = restColors.concat(restColors)
    for (var i=1; i<= n; i++) {  
      tilesSample[`row - ${i}`] = {}
      for (var j=1; j<= n; j++) {
        tilesSample[`row - ${i}`][`tile - ${j}`]={}
        tilesSample[`row - ${i}`][`tile - ${j}`].status = 'closed'
        rand = Math.floor(Math.random() * restColors.length)
        tilesSample[`row - ${i}`][`tile - ${j}`].color = restColors[rand]
        restColors.splice(rand, 1)
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
      <div>      
        { Object.keys(this.state.tiles).map(this.renderRow.bind(this)) }
      </div>   
    )  
  }
}

export default App