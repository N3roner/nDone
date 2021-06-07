import React, { Component } from 'react';

export class ComponentController extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loadedComponents: [],

            // dogadjaji: [], loading: true, editing: false, new: false
        };

        function loadDummy(params) {
            let n1 = loadComponent('EventsManager');
            console.log(n1);
        }

        function loadComponent(name) {
            let nCompE = React.createElement(name);
            let nCompR = React.createRef(name);
            let nCompF = React.createFactory(name);
            console.log('1 : ' + nCompE);
            console.log('2 : ' + nCompR);
            console.log('3 : ' + nCompF);
            this.state.loadedComponents.push(nCompF);
        }

        // this.incrementCounter = this.incrementCounter.bind(this);

        // fetch('/Dogadjaji')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ dogadjaji: data, loading: false });
        //     });
    }

    componentDidMount(){
        console.log('componentDidMount Component Controller');
        this.loadDummy();
    }
}