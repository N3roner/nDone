import React, { Component } from 'react'
import NEvent from './nEvent';

export default class EventsController extends Component {

    autoLoadEventsFromDb = true;
    autoRenderEventsAfterLoad = true;    
    loadedEventsJSX = []; // loadedEventsJSON = [];
    
    constructor(props) {
        super(props)
        this.state = {
            renderedContent: 'Loading data...',
            selectedEvent: 'none',
            uiBtnsShow: true,
        };
        this.btnHandleDebugEventsConsole = this.btnHandleDebugEventsConsole.bind(this);
        this.btnHandleRenderEvents = this.btnHandleRenderEvents.bind(this);
        this.handleEventSelection = this.handleEventSelection.bind(this);
    }

    componentDidMount() {
        if (this.autoLoadEventsFromDb) {
            this.loadRenderAll();
        }
    }

    async loadRenderAll() {
        let toBeRendered = await fetch('/API/Dogadjaji').then(response => response.json()).then(data => this.initializeEventsLoadDB(data));
        this.setState({ renderedContent: toBeRendered });
    }

    handleEventSelection(e) {
        if (this.state.selectedEvent === 'none') {
            this.setState({ selectedEvent: e });
        }
        else {
            this.state.selectedEvent.onDeselect();
            if (this.state.selectedEvent === e) {
                this.setState({ selectedEvent: 'none' });
            }
            else {
                this.setState({ selectedEvent: e });
            }
        }
    }

    addNewEvent(id, naziv, datum) {
        console.log('adding new event');
    }

    initializeEventsLoadDB(data) {        
        this.loadedEventsJSX = [];
        data.forEach(element => {        
            let tempJSXEvent = <NEvent onChange={this.handleEventSelection} passedProps={element} key={element.id} />;            
            this.loadedEventsJSX.push(tempJSXEvent);
        });
        return this.loadedEventsJSX;
    }

    btnHandleDebugEventsConsole = () => {
        this.loadedEventsJSX.forEach(element => {
            console.log('id : ' + element.props.passedProps.naziv  + ' n : '     );
        }); 
    }

    btnHandleLoader = async () => {
        console.log('event manager mounted, but autoLoad disabled ');
        this.loadRenderAll();
    }

    btnHandleRenderEvents = () => {     
        if (this.loadedEventsJSX.length === 0) {
            console.log('btnHandleRenderEvents  JSX NULA');
        }
    }

    render() {
        let uiBtnsEvents = null
        if (this.state.uiBtnsShow) {
            uiBtnsEvents = (
                <div>
                    <button onClick={this.btnHandleLoader}>Load all dogs db </button>
                    <button onClick={this.btnHandleRenderEvents}>Render events dogs </button>
                    <button onClick={this.btnHandleDebugEventsConsole}>Display array in console </button>
                </div>
            );
        }

        return (
            <div>
                <h1>Dogadjaji</h1>
                {uiBtnsEvents}
                {this.state.renderedContent}
            </div>
        );
    }
}