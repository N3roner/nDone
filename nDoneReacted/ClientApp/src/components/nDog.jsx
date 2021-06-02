import React from 'react';
import './NDog.css';

export default class NDog extends React.Component {
    constructor(props) {        
        super(props)        
        this.state = { 
            key: props.passedItem.id,
            id: props.passedItem.id,
            naziv: props.passedItem.naziv,
            opis: props.passedItem.opis
        };        
    }

    render() {
      return (
        <div>
            <h1>'id' : {this.state.id}</h1>            
            <div className="dogadjajNaziv" > {this.state.naziv} </div>            
        </div>
      );
    }
  }