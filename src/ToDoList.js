import React, { Component } from 'react';
import './ToDoList.css';

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            listOfTasks: []
        }
    }
    render() {
        return (
            <div>
                <input onChange={this.handleInput} />
                <button onClick={this.saveText}>dodaj</button>
                <ul>
                    {
                        this.state.listOfTasks.map((el, index) => {
                            return (

                                <li className={el.isCrossout ? 'cross_text':''}>{el.elem}
                                    <button onClick={() => { this.removeElem(index) }}>usuń</button>
                                    <button onClick={()=>{this.crossOut(index)}}>{el.isCrossout ? 'przywróć':'skreśl'}</button>
                                </li>

                            )
                        })
                    }
                </ul>
            </div>
        );
    }
    handleInput = (e) => {
        const textFromInput = e.target.value;
        this.setState(prevState => {
            return { item: textFromInput };
        });
    }

    saveText = (e) => {
        this.setState(prevState => {
            return { listOfTasks: prevState.listOfTasks.concat({elem:prevState.item, isCrossout: false}) };
        });
    }
    removeElem = (index) => {
        const modifiedArray = this.state.listOfTasks.filter((el, elIndex) => elIndex !== index);
        this.setState(prevState => {
            return { listOfTasks: modifiedArray };
        });
    }
    crossOut=(index)=>{
        let newArray = this.state.listOfTasks;
        newArray[index].isCrossout=!newArray[index].isCrossout;
       this.setState(prevState => {
           return { listOfTasks: newArray};
       });
    }


}

export default ToDoList;