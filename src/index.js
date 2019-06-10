import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 const itemsList = [
     {
       name: 'Laundry',
       description: 'Wash all the clothes',
       done: false
     },
     {
       name: 'Homework',
       description: 'Complete english assignemnt',
       done: false
     },
     {
       name: 'Dishes',
       description: 'Clean all the dishes',
       done: false
     },
     {
       name: 'Portfolio',
       description: 'Make portfolio for co op',
       done: false
     },
     {
       name: 'Grocery shopping',
       description: 'Buy vegetables and fruits',
       done: false
     },
     {
       name: 'Study',
       description: 'Study for psychology test',
       done: false
     },
     {
       name: 'Clear',
       description: 'Study for psychology test',
       done: false
     }
];


 class TaskList extends React.Component {
     render() {
      return(
          this.props.items.map((item, index) =>
           (<Task key={index} 
            item={item} 
            doneButtonHandler={() => this.props.doneButtonHandler(index)} 
            removeButtonHandler={() => this.props.removeButtonHandler(index)}/>)
      
      ))
     }
 }

function Task(props) {
       return (
       <section className={props.item.done ? 'strikeout' : 'item'}>
           <h2>{props.item.name}</h2>
           <p>{props.item.description}</p>
           {
             props.item.done ? <button onClick={props.doneButtonHandler}>Undone</button> : <button onClick={props.doneButtonHandler}>Done</button>
           }
             <button onClick={props.removeButtonHandler}>Remove</button>
       </section>
      ); 
 } 

 class App extends React.Component {
   constructor() {
      super();
      this.state = {
        toDoItems: itemsList
      };
      this.done = this.done.bind(this);
      this.remove = this.remove.bind(this);
   }

   done(itemIndex) {
     let tempList = this.state.toDoItems;
     tempList[itemIndex].done = true;
     this.setState({
       toDoItems: tempList
     });
   }

   remove(itemIndex){
     let newList = this.state.toDoItems;
     newList.splice(itemIndex, 1);
     this.setState({
      toDoItems: newList
     });
   }



   render() {
     return (
         <section>
           <h1>To Do List</h1>
           <TaskList items={this.state.toDoItems} doneButtonHandler={this.done} removeButtonHandler={this.remove}/>
         </section>
     );
   }
 }
  // ========================================
  ReactDOM.render(
   <App />,
   document.getElementById('root')
 );
 
