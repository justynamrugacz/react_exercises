import React, { Component } from 'react';
import './ToDoList.css';

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            listOfTasks: [],
            secondListOfTasks: []
        }
    }
    render() {
        return (
            <div>
                <input value={this.state.item} onChange={this.handleInput} />
                <button onClick={this.saveText}>dodaj</button>
                <ul>
                    {
                        this.state.listOfTasks.map((el, index) => {
                            return (

                                <li className={el.isCrossout ? 'cross_text':''}>{el.elem}
                                    <button onClick={() => { this.removeElem(index) }}>usuń</button>
                                    <button onClick={()=>{this.crossOut(index)}}>{el.isCrossout ? 'przywróć':'skreśl'}</button>
                                    <button onClick={()=>{this.moveToSecondList(el.elem, index)}}>Przenieś</button>
                                </li>

                            )
                        })
                    }
                </ul>
                <h1>lista 2</h1>
                <ul>
                    {
                        this.state.secondListOfTasks.map((elem,index)=>{
                            return <li>{elem.number}. {elem.item} <button onClick={()=>{this.moveUp(elem,index)}}>&#8593;</button><button onClick={()=>{this.moveDown(elem,index)}}>&darr;</button></li>
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
            return { listOfTasks: prevState.listOfTasks.concat({elem:prevState.item, isCrossout: false}), item: "" };
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
    moveToSecondList=(el,index)=>{
        const movedItem = el;
        
        this.setState(prevState => {
            return { listOfTasks: prevState.listOfTasks.filter((item, itemIndex)=>itemIndex!==index),
                secondListOfTasks: prevState.secondListOfTasks.concat({item: movedItem, number: prevState.secondListOfTasks.length+1}) };
        });
    }
    moveUp=(elem,index)=>{
        let copyOfSecondList = this.state.secondListOfTasks;
        if(copyOfSecondList[index].number===1){
            return copyOfSecondList[index].number;
        }
        copyOfSecondList[index].number--;
        copyOfSecondList[index-1].number++;
        copyOfSecondList.sort((a,b)=>{
            return a.number - b.number;
        })
        this.setState(prevState => {
            return { secondListOfTasks: copyOfSecondList };
        });
    }
    moveDown=(elem,index)=>{
        let copyOfSecondList = this.state.secondListOfTasks;
        if(copyOfSecondList[index].number===copyOfSecondList.length){
            return copyOfSecondList[copyOfSecondList.length-1].number;
        }
        copyOfSecondList[index].number++;
        copyOfSecondList[index+1].number--;
        copyOfSecondList.sort((a,b)=>{
            return a.number - b.number;
        })
        this.setState(prevState => {
            return { secondListOfTasks: copyOfSecondList };
        });
    }


}

export default ToDoList;