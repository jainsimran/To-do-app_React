import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// array of list to do 
let itemsList = [
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
    name: 'Clean',
    description: 'Clean my room',
    done: false
  },
  {
    name: 'Buy gift',
    description: 'Buy gift for sister',
    done: false
  },
  {
    name: 'Quize',
    description: 'Complete online quize',
    done: false
  },
  {
    name: 'Call mom',
    description: 'Call mom in morning',
    done: false
  }
];

//  main react component with constructor 
class App extends React.Component {
  constructor() {
     super();
     this.state = {
       toDoItems: itemsList
     };
     this.done = this.done.bind(this);
     this.remove = this.remove.bind(this);
     this.add = this.add.bind(this);
  }

  // function to toggle for done / undone
  done(itemIndex) {
    let tempList = this.state.toDoItems;
    tempList[itemIndex].done = !tempList[itemIndex].done;
    this.setState({
      toDoItems: tempList
    });
  }

  // function to delete list item from list
  remove(itemIndex){
    let newList = this.state.toDoItems;
    newList.splice(itemIndex, 1);
    this.setState({
     toDoItems: newList
    });
  }

  // function to add task in list
  add(item){
    let newList =  this.state.toDoItems;
    newList.unshift(item);
    this.setState({
      toDoItems: newList
    });
  }
 
  render() {
    return (
        <section>
          <h1>To Do List</h1>
          <AddNewTask additem={this.add} />
          {/* notify the user when list is empty */}
          <section> {
            this.state.toDoItems.length === 0 ? <p>Hey your task list is completed. Now watch netflix and relax.</p> : null 
          }
          </section>
          <TaskList items={this.state.toDoItems} doneButtonHandler={this.done} removeButtonHandler={this.remove} />
        </section>
    );
  }
}

// react component 
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

//  functional component doing action on clicking done/undone and remove button
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

//  react component for form
class AddNewTask extends React.Component{
  constructor(){
    super();
    this.state = {
      name: "",
      description: ""
    };
    this.changeName = this.changeName.bind(this);
    this.changeDesc = this.changeDesc.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  // function to change name of task
  changeName(event){
    this.setState({
      name: event.target.value
    });
  }

  // function to change decription of task
  changeDesc(event){
    this.setState({
      description: event.target.value
    });
  }

  // function to add task in list
  addTask(){
    let newTask = {
      name: this.state.name,
      description: this.state.description,
      done: false
    };
    this.props.additem(newTask);
    this.setState({
      name: "",
      description: ""
    });
  }

   render(){
    return(
      <section>
      <form>
        <label>
          <h2>Add new task in list.</h2>
        <input
          type="text"
          name="taskName" 
          value={this.state.name} 
          onChange={this.changeName} 
          placeholder="add task name." />
        <input 
          type="text" 
          name="taskDesc" 
          value={this.state.description} 
          onChange={this.changeDesc} 
          placeholder="add task description." />
        <button type="button" onClick={this.addTask}> Submit </button>
        </label>
      </form> 
    </section>
    );
  }
}

  // ========================================
  ReactDOM.render(
   <App />,
   document.getElementById('root')
 );
