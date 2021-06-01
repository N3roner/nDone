import React, { Component } from 'react'

export default class Dogadjaj extends Component {
    constructor(props) {
        super(props)
        console.log('hi ' + props.inDog.naziv);
        this.state = {
            id: props.inDog.id,
            naziv: props.inDog.naziv,
            datumOdrzavanja: props.inDog.datumOdrzavanja
        };

        // this.setState({
            
        //     naziv: props.naziv
        // });
    };
    
    render() {
        return (
            <div>
            <h1> id : {this.state.id}</h1>
            <h1> Naziv : {this.state.naziv}</h1>
            <h1> Naziv : {this.state.datumOdrzavanja}</h1>
            </div>
            // <div key={this.dogadjaj.Id}>
            //     <h>{this.dogadjaj.naziv}</h>
            // </div>
        )
    }
}
