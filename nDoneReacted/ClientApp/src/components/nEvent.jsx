// import KoncertImg from '../img/konc.jpg';
// import DogImgFolder from '../img/dogs/crowd.jpg';

import React, { Component } from 'react';
import './NDog.css';

export default class NEvent extends Component {
    editorWinLabels = { padding: '5px 15px 5px 15px' };

    constructor(props) {
        super(props)
        this.handleEventSelection = this.handleEventSelection.bind(this);

        this.toggleUIEditor = this.toggleUIEditor.bind(this);
        this.toggleWrapperbtn = this.toggleWrapperbtn.bind(this);
        this.toggleBoxShadowBtn = this.toggleBoxShadowBtn.bind(this);

        this.handleValueChangeCustomDog = this.handleValueChangeCustomDog.bind(this);
        this.handleMouseEnterPVise = this.handleMouseEnterPVise.bind(this);
        this.handleMouseLeavePVise = this.handleMouseLeavePVise.bind(this);

        this.onDeselect = this.onDeselect.bind(this);

        this.state = {
            myNUiEditor: null,
            key: props.passedProps.id,
            naziv: props.passedProps.naziv,
            // slikaLFileName: props.passedProps.slikaLFileName,
            slikaLFileName: 'dog' + props.passedProps.id + '.jpg',
            // props.passedProps.opis,
            opis: 'Neki dodatni opis dogadjaja trajla bee trajlaaa beeee trajla bee ',
            datumPocetka: '',
            datumKraja: '',
            pocetniBrojUlaznica: 30,
            prodatoUlaznica: 0,
            preostaloUlaznica: '',
            dogsImgFolder: process.env.PUBLIC_URL + '/images/dogadjaji/',
            isSelected: false,
            isOpisExpanded: false,

            showEditorWindow: false,
            isEvWrapperMenuDisplayed: true,
            isBoxShadowMenuDisplayed: true,

            dogCustomWidth: '11',
            dogCustomHeight: '36',

            dogCNazivColor: '#0E1C42',
            dogCNazivColorAlpha: '1',
            dogCNazivColorRGBA: 'rgba(102,143,255,1)',
            dogCNazivFontSize: '24em',

            dogCustomFontSize: '29em',

            dogCustomBackGroundColor: '#0E1C42',
            dogCustomBackGroundColorAlpha: '1',
            dogCustomBackGroundColorRGBA: 'rgba(14,28,66,0.14)',

            dogCustomBoxShadowXoff: '3',
            dogCustomBoxShadowYoff: '-5',
            dogCustomBoxShadowBlurRad: '10',
            dogCustomBoxShadowSpreadRad: '20',

            dogCustomBoxShadowColor: '#0E1C42',
            dogCustomShadowColorAlpha: '1',
            dogCustomBoxShadowColorRGBA: 'rgba(102,143,255,1)',               //'rgba(14, 28, 66, 0.2)',    //#4666FF'  //eventWrapClass: 'dogCard', // datum: '13.02.2021',                
        };
    }

    get eventImageSrc() {
        let imgSrc = this.state.dogsImgFolder + 'dog' + this.state.key + '.jpg';
        return imgSrc;
    }

    toggleInnerTxtPrikaziViseHanlder() {
        let isOpisExpanded = this.state.isOpisExpanded;  // opisDivObj.innerText === 'prikazi vise...' ? false : true;  // opisDivObj.innerText = newInnerText; // console.log(' temp text : ' + opisDivObj.innerText);   
        let newInnerText = isOpisExpanded ? '...prikazi manje...' : '...prikazi vise...';
        return newInnerText;
    }

    handleMouseLeavePVise(e) {
        this.setState({ isOpisExpanded: false }, () => {
            let htPrikaziVise = document.getElementById('eventPrikaziViseId');
            htPrikaziVise.innerText = this.toggleInnerTxtPrikaziViseHanlder();
            let htPrikaziViseStyle = htPrikaziVise.style;
            htPrikaziViseStyle.color = 'white';
        });
    }

    handleMouseEnterPVise(e) {
        this.setState({ isOpisExpanded: true }, () => {
            let htPrikaziVise = document.getElementById('eventPrikaziViseId');
            htPrikaziVise.innerText = this.toggleInnerTxtPrikaziViseHanlder();
            let htPrikaziViseStyle = htPrikaziVise.style;
            htPrikaziViseStyle.color = 'rgba(71, 109, 225, 1)';
        });
    }

    handleValueChangeCustomDog(event) {
        switch (event.target.name) {
            case 'width':
                this.setState({ dogCustomWidth: event.target.value });
                break;
            case 'height':
                this.setState({ dogCustomHeight: event.target.value });
                break;
            case 'fontResize':
                this.setState({ dogCustomFontSize: event.target.value });
                break;
            case 'dogCNazivFontResize':
                this.setState({ dogCNazivFontSize: event.target.value });
                break;
            case 'backGroundColor': {
                let currentColor = event.target.value;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + this.state.dogCustomBackGroundColorAlpha + ')';
                this.setState({ dogCustomBackGroundColorRGBA: rgbaCol, dogCustomBackGroundColor: event.target.value });
            }
                break;
            case 'backGroundColorAlpha': {
                let currentColor = this.state.dogCustomBackGroundColor;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + event.target.value + ')';
                this.setState({ dogCustomBackGroundColorRGBA: rgbaCol, dogCustomBackGroundColorAlpha: event.target.value });
            }
                break;
            case 'boxShadow1':
                this.setState({ dogCustomBoxShadowXoff: event.target.value });
                break;
            case 'boxShadow2':
                this.setState({ dogCustomBoxShadowYoff: event.target.value });
                break;
            case 'boxShadow3':
                this.setState({ dogCustomBoxShadowBlurRad: event.target.value });
                break;
            case 'shadowColor': {
                let currentColor = event.target.value;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + this.state.dogCustomShadowColorAlpha + ')';
                this.setState({ dogCustomBoxShadowColorRGBA: rgbaCol, dogCustomBoxShadowColor: event.target.value });
            }
                break;
            case 'shadowColorAlpha': {
                let currentColor = this.state.dogCustomBoxShadowColor;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + event.target.value + ')';
                this.setState({ dogCustomBoxShadowColorRGBA: rgbaCol, dogCustomShadowColorAlpha: event.target.value });
            }
                break;
            case 'nazivColor': {
                let currentColor = event.target.value;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + this.state.dogCNazivColorAlpha + ')';
                this.setState({ dogCNazivColorRGBA: rgbaCol, dogCNazivColor: event.target.value });
            }
                break;
            case 'dogCNazivColorAlpha': {
                let currentColor = this.state.dogCNazivColor;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + event.target.value + ')';
                this.setState({ dogCNazivColorRGBA: rgbaCol, dogCNazivColorAlpha: event.target.value });
            }
                break;
            default:
                break;
        }
    }

    toggleWrapperbtn() {
        this.setState({ isEvWrapperMenuDisplayed: !this.state.isEvWrapperMenuDisplayed }, () => console.log(' toggleWrapperbtn ' + this.state.isEvWrapperMenuDisplayed));
    }
    toggleBoxShadowBtn() {
        this.setState({ isBoxShadowMenuDisplayed: !this.state.isBoxShadowMenuDisplayed }, () => console.log(' toggleWrapperbtn ' + this.state.isBoxShadowMenuDisplayed));
    }

    toggleUIEditor() {
        this.setState({ showEditorWindow: !this.state.showEditorWindow }, () => {
            if (this.state.showEditorWindow) {
                console.log(' myNUiEditor' + this.state.myNUiEditor);
                if (this.state.myNUiEditor === null) {

                    // let tmpNuIEditor =  <NUiEditor />;
                    //  this.setState({ myNUiEditor: tmpNuIEditor });
                    //let rootDiv = document.getElementById('root');
                    // let nes = ReactDOM.render(React.createElement)
                    // let uiEIns = <NUiEditor/>;

                    //ReactDOM.render(<NUiEditor></NUiEditor>,document.getElementById('root'));

                    // let refToEWin = ReactDOM.render( <NUiEditor />, rootDiv, () => { }  );
                    // // let refToEWin = ReactDOM.render(myNuIEditor, rootDiv, () => { }  )                                
                }
            }
            //console.log(' fol file ' + window.location.origin);
        });
    }

    onDeselect() {
        this.setState({ isSelected: false });
    }

    handleEventSelection(event) {
        let isSelectedToggled = !this.state.isSelected;
        this.setState({ isSelected: isSelectedToggled });
        this.props.onChange(this);
    }

    nPropertyEditor(editType, lblTxt, valARef, inputName, colorAlphaRef, colorRGBARef, inputNameAlpha, inputMin = 0, inputMax = 100, inputStep = 1, changeHandler = this.handleValueChangeCustomDog) { // if (arguments.length == 4)        
        let inputElement;
        if (editType === 'range') {
            inputElement = <input name={inputName} type="range" min={inputMin} max={inputMax} step={inputStep} value={valARef} onChange={changeHandler} />
        }
        if (editType === 'color') {
            inputElement = (
                <React.Fragment>
                    <input name={inputName} type="color" value={valARef} onChange={changeHandler} />
                    <label style={this.editorWinLabels} > Alpha( {colorAlphaRef} )
                        <input className='slidecontainer' name={inputNameAlpha} type="range" min={inputMin} max={inputMax} step={inputStep} value={colorAlphaRef} onChange={changeHandler} />
                        - {colorRGBARef} </label>
                </React.Fragment>
            )
        }

        let sl = (
            <React.Fragment>
                <label style={this.editorWinLabels} > {lblTxt} ( {valARef} ) </label>
                {inputElement}
            </React.Fragment>
        );
        return sl;
    }

    getDWrapperToggleBtnAndSettingsMenu() {
        let toggleBtn = (<button onClick={this.toggleWrapperbtn}>EventWrapperSettings</button>);
        let toReturn = null;

        if (this.state.isEvWrapperMenuDisplayed) {
            toReturn = (<div>
                {toggleBtn}
                {this.nPropertyEditor('range', ' Width ', this.state.dogCustomWidth, 'width')}
                {this.nPropertyEditor('range', ' Height ', this.state.dogCustomHeight, 'height')}
                {this.nPropertyEditor('color', ' BackgroundColor - ', this.state.dogCustomBackGroundColor, 'backGroundColor', this.state.dogCustomBackGroundColorAlpha, this.state.dogCustomBackGroundColorRGBA, 'backGroundColorAlpha', '0.0', '1', '0.01')}
            </div>);
        }
        else {
            toReturn = (<div> {toggleBtn} </div>);
        }
        return (toReturn);
    }

    createToggleAbleButtonOfPassedPropperties(isMenuDisplayedStateValueRef, btnToggleHandler, btnTxt, passedProperties) {
        let tmpBtn = (<button onClick={btnToggleHandler}>{btnTxt}</button>);
        let toReturn = null;

        if (isMenuDisplayedStateValueRef) {
            toReturn = (<div>
                {tmpBtn}
                {passedProperties}
            </div>);
        }
        else {
            toReturn = (<div> {tmpBtn} </div>);
        }
        return (toReturn);
    }


    render() {
        let renderedEvent = (
            <div onClick={this.handleEventSelection}
                id='eventWrapper' style={{
                    margin: '10px 11px 11px 16px',
                    position: 'relative',
                    width: this.state.dogCustomWidth + 'vw',
                    height: this.state.dogCustomHeight + 'vh',
                    fontSize: this.state.dogCustomFontSize + 'px',
                    backgroundColor: this.state.dogCustomBackGroundColorRGBA,
                    float: 'left',
                    borderRadius: '0.4em',
                    border: '1px solid #4666FF',
                    boxShadow: (this.state.dogCustomBoxShadowXoff + 'px ' + this.state.dogCustomBoxShadowYoff + 'px ' + this.state.dogCustomBoxShadowBlurRad + 'px ' + this.state.dogCustomBoxShadowColorRGBA),
                }}>
                <div id='eventNaziv' style={{ padding: '7px 3px 3px 3px', fontSize: this.state.dogCNazivFontSize + 'px', textAlign: 'center', fontWeight: 'bold', color: this.state.dogCNazivColorRGBA }} > {this.state.naziv} </div>

                <img id='eventSlika' style={{ width: '100%', height: '40%', objectFit: 'cover' }} src={this.eventImageSrc} alt='event img not found' />

                <div id='eventOpis' style={{ fontSize: 14 + 'px', textAlign: 'center', padding: '3px 3px 3px 3px', color: 'rgba(71, 109, 225, 1)' }}> {this.state.opis}
                    <div id='eventPrikaziViseId' style={{ textAlign: 'center', color: 'white', cursor: 'pointer', fontSize: 9 + 'px' }}
                        onMouseEnter={this.handleMouseEnterPVise} onMouseLeave={this.handleMouseLeavePVise} > ...prikazi vise...</div>
                </div>

                <button type='button' className='dogKupi' onClick={this.toggleUIEditor} > Kupi </button>

            </div>
        )

        return (
            <div>
                {/* {editorWindowComponent} */}
                {/* {editorWindow} */}
                {renderedEvent}
            </div>
        );
    };
};