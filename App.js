import React from 'react';
import Row from './Row';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tiles : {},
      currentMove : {},
      n: 4,
      colors : {
        orange : { first: [1,1], second: [1,2]},
        brown:   { first: [1,3], second: [1,4]}, 
        yellow:  { first: [2,1], second: [2,2]}, 
        green:   { first: [2,3], second: [2,4]}, 
        gray:    { first: [3,1], second: [3,2]}, 
        blue:    { first: [3,3], second: [3,4]}, 
        purple:  { first: [4,1], second: [4,2]}, 
        pink:    { first: [4,3], second: [4,4]}
      }   
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
        for (var key in this.state.colors) {
           
            console.log(this.state.colors[key]['first'][0])
            console.log(this.state.colors[key]['second'])
            if (this.state.colors[key]['first'][0] == i && this.state.colors[key]['first'][1] == j) {
              console.log('first')
              tilesSample[`row - ${i}`][`tile - ${j}`].color = `${key}`
            }
            if (this.state.colors[key]['second'][0] == i && this.state.colors[key]['second'][1] == j) {
              tilesSample[`row - ${i}`][`tile - ${j}`].color = `${key}`
            }    
        }
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