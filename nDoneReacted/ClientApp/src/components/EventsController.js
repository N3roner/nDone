import React, { Component } from 'react'
// import Container from 'reactstrap/lib/Container';
import NEvent from './nEvent';
import axios from 'axios';
import '../components/EventsController.css'

export default class EventsController extends Component {

    autoLoadEventsFromDb = true;
    autoRenderEventsAfterLoad = true;
    loadedEventsJSX = []; // loadedEventsJSON = [];

    constructor(props) {
        super(props)
        this.state = {
            activeUI: 'allEventsDisplayed',
            renderedContent: 'Loading data...',
            selectedEvent: 'none',
            uiBtnsShow: true,
            addNewEvent: false,
            vrsteDogadjaja: [],
            tempDogNaziv: '',
            tempDogDatum: '',
            tempDogVrsta: '',
            tempDogSlika: ''
        };



        this.btnHandleDebugEventsConsole = this.btnHandleDebugEventsConsole.bind(this);
        this.btnHandleRenderEvents = this.btnHandleRenderEvents.bind(this);
        this.handleEventSelection = this.handleEventSelection.bind(this);

        this.handleNewDogUI = this.handleNewDogUI.bind(this);
        this.handleSubmitNewDog = this.handleSubmitNewDog.bind(this);

        // this.handleTempNazivChange = this.handleTempNazivChange.bind(this);
        this.handleTempInputChange = this.handleTempInputChange.bind(this);

    }

    handleTempInputChange(event) {
        switch (event.target.name) {
            case 'naziv':
                this.setState({ tempDogNaziv: event.target.value });
                break;
            case 'datum':
                this.setState({ tempDogDatum: event.target.value });
                break;
            case 'vrstaDog':
                this.setState({ tempDogVrsta: event.target.value });
                break;
            case 'cancelAddingNew':
                this.setState({ activeUI: 'allEventsDisplayed' });
                break;
            default:
                console.log('input handle default')
                break;
        }
    }

    handleNewDogUI(event) {
        this.setState({ activeUI: 'addingNewEvent' })
        // this.setState({ addNewEvent: true })
        this.fetchVrsteDogadjaja();
    }

    handleSubmitNewDog(event) {

        // "Id,Naziv,DatumOdrzavanja,Slika")

        event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('naziv', this.state.tempDogNaziv);
        bodyFormData.append('datumOdrzavanja', this.state.tempDogDatum);
        console.log('temp vrsta ba :' + this.state.tempDogVrsta);
        bodyFormData.append('vrstaDog', this.state.tempDogVrsta);

        axios({
            method: "post",
            url: "/API/Dogadjaji/AddNewDogadjaj",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

        /*event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('naziv', this.state.tempDogNaziv);
        bodyFormData.append('datumOdrzavanja', this.state.tempDogDatum);
        console.log('temp vrsta ba :' + this.state.tempDogVrsta);
        bodyFormData.append('vrstaDog', this.state.tempDogVrsta);

        axios({
            method: "post",
            url: "/API/Dogadjaji/Create",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });*/

    }

    componentDidMount() {
        if (this.autoLoadEventsFromDb) {
            this.loadRenderAll();
        }
    }

    async fetchVrsteDogadjaja() {
        let fetchedVrsteDogadjaja = await fetch('/API/VrsteDog').then(response => response.json()).then(data => this.InitializeVrsteDogadjaja(data));
        this.setState({ vrsteDogadjaja: fetchedVrsteDogadjaja });
    }

    InitializeVrsteDogadjaja(data) {
        let vrsteDogadjaja = [];
        data.forEach(element => {
            let tempVrsta = {
                id: element.vrstaId,
                naziv: element.naziv,
                key: 'vd' + element.vrstaId
            };
            vrsteDogadjaja.push(tempVrsta);
        });
        return vrsteDogadjaja;
    }

    async loadRenderAll() {
        let toBeRendered = await fetch('/API/Dogadjaji').then(response => response.json()).then(data => this.initializeEventsLoadDB(data));
        this.setState({ renderedContent: toBeRendered });
    }

    initializeEventsLoadDB(data) {

        this.loadedEventsJSX = [];

        let loadedIndex = 0;
        let loadMax = 3;
        data.forEach(element => {
            if (loadedIndex >= loadMax) {
                element = { opis: 'Neki opis dogadjaja' }
                return
            }
            loadedIndex += 1;
            let tempJSXEvent = <NEvent onChange={this.handleEventSelection} passedProps={element} key={element.id} />;
            this.loadedEventsJSX.push(tempJSXEvent);
        });
        return this.loadedEventsJSX;
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

    btnHandleDebugEventsConsole = () => {
        this.loadedEventsJSX.forEach(element => {
            console.log('id : ' + element.props.passedProps.naziv + ' n : ');
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

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] },
            console.log(' sf : ' + this.state.selectedFile));

        let sFileBase64 = '';
        this.getBase64(event.target.files[0], (result) => {
            sFileBase64 = result;
            console.log('sFileBase64: ', sFileBase64);
        });

        // const file = event.target.files[0]
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
        axios.post('my-domain.com/file-upload', this.state.selectedFile)
    }

    render() {

        let displayedInDogsDIV = '';
        switch (this.state.activeUI) {
            case 'allEventsDisplayed':
                displayedInDogsDIV = (
                    <div>
                        <div>
                            <button onClick={this.handleNewDogUI} >Dodaj dogadjaj</button>
                        </div>
                        {this.state.renderedContent}
                    </div>
                )
                break;
            case 'addingNewEvent':
                displayedInDogsDIV = (
                    <div className='newDogWrapper' >
                        <form onSubmit={this.handleSubmitNewDog} >
                            <label>Naziv dogadjaja : </label> &nbsp;&nbsp;
                            <input type='text' name='naziv' value={this.state.tempNewDogNaziv} onChange={this.handleTempInputChange} />
                            <br></br>
                            <label>Datum dogadjaja :  &nbsp;&nbsp; </label>
                            <input type='date' name='datum' value={this.state.tempNewDogDatum} onChange={this.handleTempInputChange} />
                            <br></br>
                            <label>Vrsta dogadjaja : &nbsp;&nbsp; </label>
                            <select name='vrstaDog' onChange={this.handleTempInputChange}>
                                <option key={'vdDef'} value='0'> -- Odabrati vrstu -- </option>
                                {this.state.vrsteDogadjaja.map((vrsta) => <option key={vrsta.key} value={vrsta.id}> {vrsta.naziv}</option>)}
                            </select>
                            <br></br>
                            <label>Slika : </label> &nbsp;&nbsp;
                            <input className='customInputClass' type="file" onChange={this.fileChangedHandler} />
                            {/* <button onClick={this.uploadHandler}>Upload!</button> */}
                            <br></br>
                            <input className='dodajButton' type='submit' value='Dodaj' /> &nbsp;&nbsp;
                            <button className='cancelButton' name='cancelAddingNew' onClick={this.handleTempInputChange} >Cancel</button>
                        </form>
                    </div>
                )

                break;

            default:
                break;
        }
        return (            
            <div className='dogadjajiDivClass' >
                {/* {myEditor} */}
                <h1>Dogadjaji</h1>
                <br /><br />
                {displayedInDogsDIV}
            </div>
        );
    }
}
