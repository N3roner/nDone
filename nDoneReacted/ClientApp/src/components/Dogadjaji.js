import React, { Component } from 'react';
import FDog from './FDog'
import Dogadjaj from './Dogadjaj';
// import DogadjajJSX from './Dogadjaj'

function dogToDoc(inDog) {
    return <h1>Hello, {inDog.naziv} , " id : " + {inDog.id} </h1>        
}

export class Dogadjaji extends Component {
    static displayName = "dogadjaji";

    constructor(props) {
        // console.log("dogs CONS")
        super(props);
        this.state = { dogadjaji:[], loading: true };

        fetch('/Dogadjaji')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    dogadjaji: data,
                    loading: false
                })
            });

            
    }

    static renderDogs(passedDogs){
        for (let index = 0; index < passedDogs.length; index++) {
            // console.log(passedDogs[index]);
            let tmpD = passedDogs[index];
        }
    }

    static ispisiIh(passedDogs){

        let retVal;

        passedDogs.forEach(element => {
            console.log('hi 01');
            let tmpDogJx = <Dogadjaj inDog={element} />   
            console.log(tmpDogJx);
            retVal += tmpDogJx;
                        
        });
        return {retVal};
    }

   

    render() {
        const nd1 = 'karina';
        let contents = this.state.loading
        ? <p><em>Loadin data...</em></p>
        : Dogadjaji.renderDogs(this.state.dogadjaji);

        // let dogsLoaded = this.state.loading
        // ? '' : 
        // Dogadjaji.ispisiIh(this.state.dogadjaji);
        
        let dogsLoaded = this.state.loading
        ? <p><em>Loadin data...</em></p>
        : Dogadjaji.ispisiIh(this.state.dogadjaji);

        let ispis;
        if(this.state.loading){
            ispis = <p><em>Loadin data...</em></p>;
        }
        else{
            this.state.dogadjaji.forEach(element => {
                console.log('sacu');
                ispis += dogToDoc(element);
                
                // this.dogToDoc(element);
            });
            // ispis = Dogadjaji.ispisiIh(this.state.dogadjaji);
        }

        return (
            
            <div>
                <h1>Moji dogadjaji</h1>
                {ispis}
                {/* {contents}                 */}
                {/* {dogsLoaded} */}

                <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
            </div>
        );
    }

    
}