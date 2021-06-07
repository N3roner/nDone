import React, { Component } from 'react';
import './NDog.css';
export default class NEvent extends Component {

    constructor(props) {
        super(props)
        this.handleEventSelection = this.handleEventSelection.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.state = {
            key: props.passedProps.id,
            naziv: props.passedProps.naziv,
            opis: props.passedProps.opis,
            eventWrapClass: 'dogCard',      // datum: '13.02.2021',            
            isSelected: false,
        };
    }

    onDeselect() {
        this.setState({ isSelected: false, eventWrapClass: 'dogCard' }, () => {
              console.log('NEvent onDeselect : ' + this.state.naziv);
        });
    }

    handleEventSelection() {
        let isSelectedToggled = !this.state.isSelected;
        let nextWrapClass = isSelectedToggled ? 'dogCardFullView' : 'dogCard';        
        this.setState({ isSelected: isSelectedToggled, eventWrapClass: nextWrapClass }, () => {
            this.props.onChange(this);
        });
    }

    render() {
        return (
            // {uiEventRendered}             
            <div className={this.state.eventWrapClass}>
                <span></span><span></span><span></span><span></span>
                <div className="dogTittle"> {this.state.naziv} </div>
                <div className="dogKupi"> Kupi</div>
                <button type='button' onClick={this.handleEventSelection}> View </button>
            </div>
        );
    };
};

        // let uiEventRendered = null
        // if(!this.state.isSelected){
        //     uiEventRendered = (
        //         <div className='dogCard'>
        //         <span></span><span></span><span></span><span></span>
        //         <div className="dogTittle"> {this.state.naziv} </div>
        //         <div className="dogKupi"> Kupi</div>
        //         <button type='button' onClick={this.handleEventSelection}> View </button>
        //         </div>
        //     );
        // }
        // else{   
        //     uiEventRendered = (
        //     <div className='dogCardFullView'>
        //     <span></span><span></span><span></span><span></span>
        //     <div className="dogTittle"> {this.state.naziv} </div>
        //     <div className="dogKupi"> Kupi</div>
        //     <button type='button' onClick={this.handleEventSelection}> View </button>
        //     </div>
        // );}




    // onChange(passedElement) {
    //     // parent class change handler is always called with field name and value
    //     console.log('onChange stanjeChanged' + passedElement);
    //     // this.setState({selectedEvent: true});
    //     //console.log('nDogadjaji this.state.selectedEvent : ' + this.state.selectedEvent);
    // }

    // onSelectedHandle() {
    //     console.log(' 11 ' + this.state.isSelected + ' wrapper : ' + this.state.eventWrapClass);
    // }


// this.props.onChange(this.state.isSelected, () => this.onSelectedHandle());
            // () => this.handleEventSelection(this.state.naziv));
        // this.setState({ isSelected: isSelectedToggled, eventWrapClass: nextWrapClass }, () => this.onSelectedHandle());


// return (
//     let myEventUI = this.myEventRenderer();
// );

/* <div className="dogInfo"> {this.state.opis} </div> div className="dogDostupno"> {this.state.datum} </div> */

    // editCssClasses(isItemSelected) {
    //     console.log('editCssClasses 11 passedIN : ' + isItemSelected + this.state.eventWrapClass);
    //     let newxtWrapClass = isItemSelected ? 'dogCardFullView' : 'dogCard';
    //     this.setState({ eventWrapClass: newxtWrapClass }, () => { console.log('editCssClasses 22' + this.state.eventWrapClass); });
    //     // this.setState({ eventWrapClass: isItemSelected ? 'dogCardFullView' : 'dogCard' });

    // }



    // componentDidUpdate(prevState) {
    //     // console.log('componentDidUpdate' + this.state.isSelected);
    //     if (this.state.isSelected !== prevState.isSelected) {
    //         this.render();
    //     }
    // }

    //   async editState(){
    //     this.setState({ isSelected: !this.state.isSelected }, () => {
    //         console.log('handleEventSelection 22 ' + this.state.isSelected );
    //     });
    //   }




    // handleEventSelection(event) {        
    //     console.log('handleEventSelection 11 ' + this.state.isSelected );
    //     this.setState({
    //         isSelected: !this.state.isSelected
    //     });
    //     this.editCssClasses(this.state.isSelected);
    //     console.log('handleEventSelection 22 ' + this.state.isSelected );
    // }


// let eventWrapingDivClass;
        // if(this.state.isSelected)
        //   eventWrapingDivClass = 'dogCardFullView';
        // else
        // eventWrapingDivClass = 'dogCard';

        // let isSelectedCurrentValue = this.state.isSelected;
        // console.log('handleEventSelection 22 ' + isSelectedCurrentValue);

        // console.log('editCssClasses 11' + this.state.eventWrapClass);
        // let newxtWrapClass = isSelectedCurrentValue ? 'dogCardFullView' : 'dogCard';
        // console.log('editCssClasses 22' + this.state.eventWrapClass);

        // this.setState({ eventWrapClass: newxtWrapClass }, () => {
        //     console.log('eventWrapClass 11' + this.state.eventWrapClass);
        //     this.forceUpdate();
        // });
