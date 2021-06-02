import React, { Component } from 'react'
import NDog from './nDog'

class MyBaseEvent {
    constructor(id,naziv,datum){
        this.id = id;
        this.naziv = naziv;
        this.datum = datum;
    }

    getProperties(){
        let setOfPropertioes = {
            id: this.id,
            naziv: this.naziv,
            datum: this.data
        }
        return setOfPropertioes;
    }
}

class CurrentEventsManager {
    constructor(){
    this.size = 0;
    this.listaAktivnihDogadjaja = [];    
    }

    addNewEvent(id,naziv,datum){
        let tmpBaseEvent = new MyBaseEvent(id,naziv,datum);        
        this.listaAktivnihDogadjaja.push(tmpBaseEvent);
        this.size = this.listaAktivnihDogadjaja.length;
    }

    getAktivni(){
        for(let dog in this.listaAktivnihDogadjaja){
            let tempDogProps = dog.getProperties();
            console.log(' dog id : ' + tempDogProps.id + ' naziv : ' + tempDogProps.naziv);
        }

    }

}

export default class nDogadjaji extends Component {
    constructor(props) {
        super(props)

        this.mainCtr = { 
            inicijator: '',
            isInitialized: false,
        };

        this.state = {
            autoLoadAllEventsFromDB: true,            
            mainController: this,
            isStateInitialized: false,      
            loadedDEvents: [],
            jsxEvents: [],
            renderedContent: 'Loading data...'
        };
       
        this.customControloer= this.customControloer.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    initializeMyContoller(potpis){
        console.log('initializeMyContoller ' + potpis);
        let refNaMain = this;
        refNaMain.mainCtr.inicijator = potpis;
        refNaMain.mainCtr.isInitialized = true;
        console.log('prije sefi ' +  refNaMain.mainCtr.inicijator + ' init?=' + refNaMain.mainCtr.isInitialized + ' mc : ' + refNaMain.mainCtr);
        return refNaMain;
    }

    componentDidMount(){
        console.log('componentDidMount' + this.state.isInitialized );
        console.log('this.state.isInitialized' + this.state.isInitialized );
        let mf = this.initializeMyContoller('nera');
        if(mf.state.autoLoadAllEventsFromDB){
            mf.loadAndRenderFetched();
        }   
        console.log('componentDidMount' + this.state.isInitialized );
        console.log('this.state.isInitialized' + this.state.isInitialized );    
    }

    renderFetched = async (fetchedData) => {
        fetchedData.forEach(element => {
            let tempJSXEvent = <NDog passedItem={element} key={element.id} />;
            this.state.jsxEvents.push(tempJSXEvent);
        });
        return this.state.jsxEvents;
    }

    loadAndRenderFetched = async () =>{
        let loader = await this.loadEventsSQL();
        let uiRenderer = await this.renderFetched(loader);
        this.setState({
            renderedContent: uiRenderer
        });
    }

    loadEventsSQL = async () => {
        let fetchData = await fetch('/Dogadjaji')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loadedDEvents: data                    
                });        
                return this.state.loadedDEvents;       
            });
            return this.state.loadedDEvents;
    }

    async customControloer(){

        this.state.mainController = this;

        console.log('customControloer ' + this.state.mainController.isInitialized );

        let mainControllerRef = this;

        console.log('customControloer '  + this.state.mainController.isInitialized );

        this.setState({
            mainController: mainControllerRef
        });
    }
    async handleClick() {
        await this.loadAndRenderFetched();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Load dogs </button>
                {this.state.renderedContent}
            </div>
        );
    }
}



        // myMana= {
        //     potpis: '',
        //     autoLoadAllEventsFromDB: true,
        //     selfInitializer: mojaFu(),
        // },
        // stateManager = {
        //     status: 'prvi',                
        // },






        // this.state.selfInitializer = mojaFu();

        // function mojaFu(potpis){
        //     this.setState({
        //         isInitialized: true,
        //         potpis: potpis
        //     });
  
        //     console.log('sefi');
        // }

        

        // selfInit = () => {
        //     console.log('customControloer 2222');
        // }