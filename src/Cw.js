import React, { Component } from 'react';

export class Cw extends Component {
    constructor(props){
        super(props);
        this.state={
            text: ''
        }
    }
    
    render() { 
        return ( 
            <div>
            <input onChange={this.changeText}/>
            <p>{this.state.text}</p>
            </div>
         );
    }
    changeText=(e)=>{
        const newValue = e.target.value;
        this.setState(prevState => {
            return { text: newValue};
        });
    }
}
 
// export default Cw;