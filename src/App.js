import React, { Component } from 'react';
import './App.css';
// import Radium from 'radium';
import Person from './Persons/Person';

class App extends Component {
  state = {
    persons : [
      { id: '1', name : "Priya", age : 23 },
      { id: '3', name : "Akki", age : 22 },
      { id: '2', name : "Max", age : 29  }
    ],
    showPersons : false
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; 
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  togglePersonsHandler = () => {
     const doesShow = this.state.showPersons;
     this.setState({ showPersons : !doesShow });
  }

  nameChangeHandler = (event, id) => {
    var personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = { 
      ...this.state.persons[personIndex]
    }
    // const person = Object.assign({},this.state.persons[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person
    this.setState( {
      persons : persons
    })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let per = null;

    if(this.state.showPersons){
      per = (
        <div className="personInfo">
          {
            this.state.persons.map((person,index) => {
              return <Person 
                click = {() => this.deletePersonHandler(index)}
                name = {person.name} 
                age = {person.age}
                changed = {(event) => {this.nameChangeHandler(event, person.id)}}
                key = {person.id} />
            })
          }
        </div>
      );
      style.backgroundColor = 'red'; 
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length  <= 1){
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1> I'm a react app</h1>
        <p className={classes.join(' ')}>Passing multiple class</p>
        <button 
          style = {style}
          onClick={this.togglePersonsHandler} >Toggle Name</button>
          { per }
      </div>
    );

    // return React.createElement('div',{className: 'App'},React.createElement('h1',null,"Alternative way of render"));
  }
}

export default (App);
