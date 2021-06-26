import React, { Component } from 'react';// var ReactDOM = require('react-dom'); // import { stringify } from 'querystring'; // , useState, useRef, useEffect, Fragment
import './DRUGInUiEditor.css'; // import './nUiEditor.css';
import axios from 'axios';
class uiElObj {

    width = 0;
    height = 0;


    uiElObj(inWid, inHei, inPosX, inPosY, inBackgroundColor, inBackgroundColorRGBA, inProp, inPropVal) {

        this.width = inWid;
        this.height = inHei;
    }
}

export default class nUiEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            divUIClassRef: undefined,
            isMounted: false,
            dragging: false,
            mPos: { x: 0, y: 0 },
            relPos: { x: 0, y: 0 },
            myPos: { x: 30, y: 50 },
            width: 60,
            height: 40,
            position: 'absolute',
            backgroundColor: "#1b3069",
            backGroundColorAlpha: 1,
            backgroundColorRGBA: '',
            color: 'white',
            fontSize: 22,
            border: '1px solid #d3d3d3',
            textAlign: 'left',
            isShownSettingsPanel: false,
            isShownEditPanel: false,
            isShownDocEditor: false,
            autoLoadDefaultSettings: true,
            rootTreeList: [],
            rootTreeListUI: [],
            isValueChanged: false
        }

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.nEditorValueHandler = this.nEditorValueHandler.bind(this);
        this.mainMenuButtonsHandler = this.mainMenuButtonsHandler.bind(this);
        this.saveLoadSettings = this.saveLoadSettings.bind(this);
        this.updateMyStyle = this.updateMyStyle.bind(this);
        this.mySettingsPanel = this.mySettingsPanel.bind(this);
        this.myRootTreePanel = this.myRootTreePanel.bind(this);
        this.initializeGlobalRootTree = this.initializeGlobalRootTree.bind(this);
     /*   this.loadEditorSFromDb = this.loadEditorSFromDb.bind(this);*/
        console.log('nUIEditor constructor');
    };

    createRootTree() {
        let root = document.getElementById('root');
        let rootTreeList = [];

        function getRootedChildren(inItem) {
            let myChildren = inItem.children;
            let rTreeItem = { rTreeItem: inItem, rTreeItemChildren: myChildren };
            let tmpItemCss = window.getComputedStyle(inItem, null);
            rTreeItem.rTreeItem.styleRef = tmpItemCss;

            for (let i = 0; i < myChildren.length; i++) {
                const element = myChildren[i];
                let tmpChildCss = window.getComputedStyle(myChildren[i]);
                rTreeItem.rTreeItemChildren[i].styleRef = tmpChildCss;
                rootTreeList.push(rTreeItem);
                if (element.hasChildNodes) {

                    getRootedChildren(element);
                }
            }
        }

        getRootedChildren(root);

        return rootTreeList;
    }

    maanageRootTree(akcija) {
        let rootTree = this.createRootTree();
        console.log(' aaa ' + rootTree.length);

        for (let i = 0; i < rootTree.length; i++) {
            let ispis = i;
            ispis += rootTree[i].rTreeItem.className ? ':p:' + rootTree[i].rTreeItem.className : ' ';
            ispis += rootTree[i].rTreeItem.id ? ':pi:' + rootTree[i].rTreeItem.id : ' ';

            if (akcija === 'attachColorEdit') {
                console.log('jess color edit');
            }

            for (let j = 0; j < rootTree[i].rTreeItemChildren.length; j++) {
                const tmpTreeChild = rootTree[i].rTreeItemChildren[j];
                // tmpTreeChild.style.backgroundColor = 'rgba(44, 207, 79, 0.7)';
                ispis += '\n Item ' + i + ',' + j;
                ispis += ' ' + tmpTreeChild.className ? ' class ' + tmpTreeChild.className : ' ';

                ispis += tmpTreeChild.id ? ' id: ' + tmpTreeChild.id : ' ';                //tpIspis = 'p ' + rootTreeList[i].rTreeItem.className + ispis;
            }
            console.log(ispis);
        }
    }

    //getRootedChildren(root);

    // let htmlRef = document.querySelector('html');    for (let t1I = 0; t1I < rootTreeList[i].rTreeItemChildren.length; t1I++) {
    //     const element = rootTreeList[i].rTreeItemChildren[t1I];
    // }
    createRootTreeChildNodes() {
        let root = document.getElementById('root');
        let rootTreeList = [];

        function getMyChildren(passsedParrent) {

            if (passsedParrent.hasChildNodes) {
                let nChildNodes = passsedParrent.childNodes;
                let nTreeItem = { passsedParrent, cChildNodes: nChildNodes };

                rootTreeList.push(nTreeItem);
                for (let i = 0; i < passsedParrent.childNodes.length; i++) {
                    const element = passsedParrent.childNodes[i];
                    getMyChildren(element);
                }
            }
        }
        getMyChildren(root);
        return rootTreeList;
    }

    debugTree(treeArray) {
        for (let i = 0; i < treeArray.length; i++) {
            let ispis = '(' + i + treeArray[i].parentElement;

            if (treeArray[i].cChildNodes.length > 0) {
                for (let j = 0; j < treeArray[i].cChildNodes.length; j++) {
                    ispis += ' j ' + j + treeArray[i].childNodes[j];
                }
                console.log(ispis);
            }
        }
    }

    docTreeManager() {
        this.initializeGlobalRootTree(); //let hasa = this.createRootTree(); //let rootTree = this.maanageRootTree('attachColorEdit');
    }

    mouseUp(e) {
        this.setState({ dragging: false });
        e.stopPropagation();
        e.preventDefault();
    }

    mouseDown(e) {
        if (this.state.dragging)
            return;
        console.log('e.target ' + e.target + 'e.target.className ' + e.target.className + ' parent : ' + e.target.parentElement.className);
        if (e.target.className === 'nUiEditorWindow' || e.target.parentElement.className === 'nUiEditorWindow') {
            let viewportOffset = e.target.getBoundingClientRect();
            let relPx = e.pageX - viewportOffset.x;
            let relPy = e.pageY - viewportOffset.y;
            this.setState({ dragging: true, relPos: { x: relPx, y: relPy } });
            console.log(' MOUSE DOWN \n mouse X(', e.pageX, ')Y(', e.pageY, ')\n viewp L(', viewportOffset.left, ')T(', viewportOffset.top, ')\n'
                + ' viewp R(', viewportOffset.right, ')B(', viewportOffset.bottom, ')\n rPX(', relPx, ')Y(', relPy, ')');
        }
    }

    mouseMove(e) {
        if (!this.state.dragging)
            return;
        this.setState({ myPos: { x: e.pageX - this.state.relPos.x, y: e.pageY - this.state.relPos.y } });
        e.stopPropagation();
        e.preventDefault();
    }

    componentDidMount() {
        if (this.state.autoLoadDefaultSettings) {
            this.saveLoadSettings('loadDefault');
            this.docTreeManager();
        }
    }

    componentDidUpdate(props, state) {
        //console.log('editor updated ' + ' cw ' + this.state.width);
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.mouseMove);
            document.addEventListener('mouseup', this.mouseUp);
            console.log('addEventListener UP ');
        } else if (!this.state.dragging && state.dragging) {
            console.log('removeEventListener UP ');
            document.removeEventListener('mousemove', this.mouseMove);
            document.removeEventListener('mouseup', this.mouseMove);
        }
    }

    nEditor(valueARef, labelText, colorAlphaRef, colorRGBARef, editType = 'range', inputMin = 0, inputMax = 100, inputStep = 1, changeHandler = this.nEditorValueHandler) {
        let inputElement;
        if (editType === 'range') {
            inputElement = <input name={labelText} type="range" min={inputMin} max={inputMax} step={inputStep} value={valueARef} onChange={changeHandler} /> // name={inputName} 
        }

        if (editType === 'color') {
            inputElement = (
                <React.Fragment>
                    <input name={labelText} type="color" value={valueARef} onChange={changeHandler} />
                    <label style={this.editorWinLabels}> Alpha( {colorAlphaRef} )
                        <input className='slidecontainer' name={labelText + 'Alpha'} type="range" min='0' max='1' step='0.01' value={colorAlphaRef} onChange={changeHandler} />
                        - {colorRGBARef} </label>
                </React.Fragment>
            )
        }

        let sl = (
            <React.Fragment>
                <label style={this.editorWinLabels} > {labelText} ( {valueARef} ) </label>
                {inputElement}
            </React.Fragment>
        );
        return sl;
    }

    nEditorValueHandler(event) {
        //console.log('ev name ' + event.target.name + ' val ' + event.target.value);
        switch (event.target.name) {
            case 'width':
                this.setState({ width: event.target.value });
                break;
            case 'height':
                this.setState({ height: event.target.value });
                break;
            case 'fontSize':
                this.setState({ fontSize: event.target.value });
                break;
            case 'backGroundColor': {
                let currentColor = event.target.value;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + this.state.backGroundColorAlpha + ')';
                this.setState({ backgroundColorRGBA: rgbaCol, backgroundColor: event.target.value });
            }
                break;
            case 'backGroundColorAlpha': {
                let currentColor = this.state.backgroundColor;
                let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + event.target.value + ')';
                this.setState({ backgroundColorRGBA: rgbaCol, backGroundColorAlpha: event.target.value });
            }
                break;
            default:
                break;
        }
    }

    mainMenuButtonsHandler(event) {
        console.log('btn clik target.name : ' + event.target.name + ' ev ' + event + ' ev.t ' + event.target);
        switch (event.target.name) {
            case 'loadDefaultBtn':
                this.saveLoadSettings('loadDefault');
                break;
            case 'exportCurrentBtn':
                this.saveLoadSettings('exportCurrent');
                break;
            case 'adjustCurrentBtn':
                this.toggleDisplayedMenu('settingsPanel');
                break;
            case 'editBtn':
                this.toggleDisplayedMenu('editPanel');
                break;
            case 'menuBtn':
                this.toggleDisplayedMenu('menuBtn');
                break;
            default:
                break;
        }
    }    

    async loadSaveEditorSettingsDB(loadOrSave, settingsPar) {
        if (loadOrSave === 'load') {
            try {
                let res = await axios({
                    url: "https://localhost:44381/api/NEditorApi",
                    method: 'get',
                    timeout: 8000,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    }
                });
                console.log(res.data);
                /*       if (res.status === 200) {
                           // test for status you want, etc
                           console.log(res.status)
                       }*/
                // Don't forget to return something   
                return res.data;
            }
            catch (err) {
                console.error(err);
            }
        }
        if (loadOrSave === 'save') {
         
            let bodyFormData = new FormData();
            for (let i = 0; i < settingsPar.length; i++) {
                console.log(' name ' + settingsPar[i].name + ' val ' + settingsPar[i].val);
                bodyFormData.append(settingsPar[i].name, settingsPar[i].val);
            }

            axios({
                method: "post",
                /*url: "/API/nEditor/AddNewDogadjaj",*/
                url: "https://localhost:44381/api/NEditorApi",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
      
            try {
                let res = await axios({
                    url: "https://localhost:44381/api/NEditorApi",
                    method: 'get',
                    timeout: 8000,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    }
                });
                console.log(res.data);
                /*       if (res.status === 200) {
                           // test for status you want, etc
                           console.log(res.status)
                       }*/
                // Don't forget to return something   
                return res.data;
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    toggleDisplayedMenu(passedMenu) {
        switch (passedMenu) {
            case 'settingsPanel':
                this.loadSaveEditorSettingsDB('load');
                break;
            case 'editPanel':
                this.setState({ isShownEditPanel: !this.state.isShownEditPanel });
                break;
            case 'menuBtn':
                this.setState({ isShownDocEditor: !this.state.isShownDocEditor });
                break;
            default:
                break;
        }
    }

    initializeGlobalUIRootTree() {
        let uiL = [];
        for (let i = 0; i < this.state.rootTreeList.length; i++) {
            let labelText = '';

            if (this.state.rootTreeList[i].rTreeItem.className)
                labelText += 'cN' + this.state.rootTreeList[i].rTreeItem.className;

            if (this.state.rootTreeList[i].rTreeItem.id)
                labelText += 'id' + this.state.rootTreeList[i].rTreeItem.id;

            if (!this.state.rootTreeList[i].rTreeItem.className === 'nUiEditorWindow')
                this.state.rootTreeList[i].rTreeItem.style = this.state.rootTreeList[i].rTreeItem.styleRef;

            let valAReferendum = this.state.rootTreeList[i].rTreeItem.styleRef.width;

            let rootTreeUIItem = (
                <li key={'rtI' + i} >
                    <label  > {labelText} {valAReferendum} ) </label>
                    <input value={valAReferendum} name={labelText} type="range" min='0' max='100' step='1'
                        onChange={(e) => {
                            let stateCopy = Object.assign({}, this.state);
                            stateCopy.rootTreeList[i].rTreeItem.style.setProperty('width', e.target.value + 'vw');          //stateCopy.rootTreeList[i].rTreeItem.styleRef.setProperty('width', e.target.value + 'vw');
                            this.setState({ stateCopy });
                            console.log(i + 'val ' + this.state.rootTreeList[i].rTreeItem.style.width + ' R  e ');
                        }} />
                </li>
            )
            uiL.push(rootTreeUIItem);
        }
        return uiL;
    }

    initializeGlobalRootTree() {
        if (Array.isArray(this.state.rootTreeList) && this.state.rootTreeList.length) { //console.log('rootTreeAlreadyInitialized ' + this.state.rootTreeList.length);
        }
        else {
            let inRootTreeList = this.createRootTree();
            this.setState({
                isShownDocEditor: !this.state.isShownDocEditor,
                rootTreeList: inRootTreeList,
            }, () => {
                this.setState({ rootTreeListUI: this.initializeGlobalUIRootTree() });
            });
        }
    }

    myMainMenu() {
        let myMainMenu = (
            <div className='myMainMenu' >
                <ul>
                    <li><button>Settings</button>
                        <ul>
                            <li><button name='adjustCurrentBtn' onClick={this.mainMenuButtonsHandler}>Adjust current</button></li>
                            <li><button name='loadDefaultBtn' onClick={this.mainMenuButtonsHandler}>Load default</button></li>
                            <li><button name='exportCurrentBtn' onClick={this.mainMenuButtonsHandler}>Export current</button></li>
                        </ul></li>
                    <li><button name='editBtn' onClick={this.mainMenuButtonsHandler}>Edit</button></li>
                    <li><button name='menuBtn' onClick={this.mainMenuButtonsHandler}> Menu</button>
                        <ul>
                            <li><button>Link 1</button></li>
                            <li><button>Link 2</button></li>
                            <li><button>Link 3</button></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
        return myMainMenu;
    }

    myRootTreePanel() {
        if (this.state.isShownDocEditor && this.state.rootTreeListUI) {
            console.log('getUIRootTree ' + this.state.rootTreeListUI.length + ' rtL ' + this.state.rootTreeList.length);
            let rootTreeUIElementsV = (
                <div style={{ overflow: 'scroll' }} className='nRootTreeSettingsPanel'>
                    <ul>
                        {this.initializeGlobalUIRootTree()}
                    </ul>
                </div>
            )
            return rootTreeUIElementsV;
        }
    }

    mySettingsPanel() {
        if (this.state.isShownSettingsPanel) {
            let cSettings = (
                '{\n' +
                '"width": "' + this.state.width + '",\n' +
                '"height": "' + this.state.height + '",\n' +
                '"fontSize": "' + this.state.fontSize + '",\n' +
                '"myPos": { "x":' + this.state.myPos.x + ', "y":' + this.state.myPos.y + ' },\n' +
                '"backgroundColor": "' + this.state.backgroundColor + '",\n' +
                '"backgroundColorRGBA": "' + this.state.backgroundColorRGBA + '",\n' +
                '"color": "' + this.state.color + '"\n}'
            )

            let panel = (
                <div className='nEditorSettingsPanel'>
                    <ul>
                        <li>{this.nEditor(this.state.width, 'width')}</li>
                        <li>{this.nEditor(this.state.height, 'height')}</li>
                        <li>{this.nEditor(this.state.fontSize, 'fontSize', 'none', 'none', 'range', 1, 30, 0.1)}</li>
                        <li>{this.nEditor(this.state.backgroundColor, 'backGroundColor', this.state.backGroundColorAlpha, this.state.backgroundColorRGBA, 'color')}</li>
                    </ul>
                    <div>
                        {cSettings}
                    </div>
                </div>
            )
            return panel;
        }

        if (this.state.isShownEditPanel) {
            let panel = (
                <div className='nEditorFetchedElement'>
                    <button onClick={document.addEventListener('mouseover', function (e) {
                        var event = e || window.event;
                        var target = event.target || event.srcElement;
                        document.getElementById('display').innerHTML = target.previousSibling.tagName +
                            " | " + target.tagName + " | " + (target.nextSibling ? target.nextSibling.tagName : "X");
                        target.style.border = "1px solid";
                    }, false)}  >OVAJ BTN</button>
                </div>
            )
            return panel;
        }
    }

    refUIEl(nesta) {
        let settingsFile = require('./nUIEditor.json');
        let randomUiEl = settingsFile.RandomUIElement;
    }

    saveLoadSettings(action) {
        console.log('action ' + action);
        if (action === 'loadDefault') {
            let settingsFile = require('./nUIEditor.json');
            let settings = settingsFile.MainWindowSetings;


            settings.forEach(element => {
                this.setState({
                    width: element.width,
                    height: element.height,
                    myPos: { x: element.myPos.x, y: element.myPos.y },
                    backgroundColor: element.backgroundColor,
                    backgroundColorRGBA: element.backgroundColorRGBA,
                    color: element.color,
                    fontSize: element.fontSize,
                });
                console.log('color ' + element.color + ' w: ' + element.width + ' h: ' + element.height + ' x ' + element.myPos.x + ' y ' + element.myPos.y);
            });
        }
        if (action === 'exportCurrent') {
            let cSettings = (
                '{\n' +
                '"width": "' + this.state.width + '",\n' +
                '"height": "' + this.state.height + '",\n' +
                '"fontSize": "' + this.state.fontSize + '",\n' +
                '"myPos": { "x":' + this.state.myPos.x + ', "y":' + this.state.myPos.y + ' },\n' +
                '"backgroundColor": "' + this.state.backgroundColor + '",\n' +
                '"backgroundColorRGBA": "' + this.state.backgroundColorRGBA + '",\n' +
                '"color": "' + this.state.color + '"\n' +
                '}'
            )
        }
    }

    updateMyStyle() {
        let uiEditorWindow = (
            <React.Fragment>
                <div className='nUiEditorWindow' onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}
                    style={{
                        position: 'absolute', width: this.state.width + 'vw', height: this.state.height + 'vh', backgroundColor: this.state.backgroundColorRGBA, color: 'white', border: '1px solid #d3d3d3',
                        textAlign: this.state.textAlign, left: this.state.myPos.x + 'px', top: this.state.myPos.y + 'px', fontSize: this.state.fontSize + 'px'
                    }}>
                    <React.Fragment>
                        {this.myMainMenu()}
                        {this.mySettingsPanel()}
                        {this.myRootTreePanel()}
                    </React.Fragment>
                </div>
            </React.Fragment>
        )
        return uiEditorWindow;
    }

    render() {
        let uiEditorWindow = this.updateMyStyle();
        //console.log('editor render ' + this.state.width);
        return (<React.Fragment>
            {uiEditorWindow}
        </React.Fragment>);
    };
}

// case 'menuBtn':
    //     this.docEls();
    //     break;
    // getCombo(valueARef, e) {
    //     valueARef = e.target.value;
    //     this.setState({
    //         isValueChanged: !this.state.isValueChanged,
    //         valueARef: e.target.value
    //     });
    //     this.render();
    //     console.log(valueARef + ' e ' + e.target.value + ' change ' + this.state.isValueChanged);
    // }
        // const rtlDva = inRootTreeList.then(this.initializeGlobalUIRootTree,{console.log()} )
        // let uiL = [];
        // for (let i = 0; i < inRootTreeList.length; i++) {
        //     let labelText = '';

        //     if (inRootTreeList[i].rTreeItem.className)
        //         labelText += 'cN' + inRootTreeList[i].rTreeItem.className;

        //     if (inRootTreeList[i].rTreeItem.id)
        //         labelText += 'id' + inRootTreeList[i].rTreeItem.id;


        //     let allLbl = labelText + ' ' + inRootTreeList[i].rTreeItem.style.width;

        //     let rootTreeUIItem = (
        //         <li key={'rtI' + '' + i} >
        //             <label style={this.editorWinLabels} > {allLbl} ) </label>
        //             <input name={labelText} type="range" min='0' max='100' step='1'
        //                 value={this.state.rootTreeList[i].rTreeItem.style.width}
        //                 onChange={(e) => {
        //                     let stateCopy = Object.assign({}, this.state);
        //                     stateCopy.rootTreeList[i].rTreeItem.style.setProperty('width', e.target.value + 'vw');
        //                     this.setState(stateCopy);
        //                     console.log(i + 'val R  e ' + e.target.value);
        //                 }} />
        //         </li>
        //     )
        //     uiL.push(rootTreeUIItem);
        // }

        // this.setState({
        //     isShownDocEditor: !this.state.isShownDocEditor,
        //     rootTreeList: inRootTreeList,
        //     rootTreeListUI: uiL
        // });



// nEditorUIRootTree(treeIndex, editType = 'range', inputMin = 0, inputMax = 100, inputStep = 1,) {
//     console.log('this.state.rootTreeList ' + this.state.rootTreeList.length + ' treeIndex ' + treeIndex);

//     let valueARef = this.state.rootTreeList[treeIndex].rTreeItem.styleRef.width;
//     //let valueABef = this.state.rootTreeList[treeIndex].style.width;
//     console.log('stateee VALUE A  ' + valueARef);
//     let labelText = '';
//     if (this.state.rootTreeList[treeIndex].rTreeItem.className)
//         labelText = this.state.rootTreeList[treeIndex].rTreeItem.className;

//     if (this.state.rootTreeList[treeIndex].rTreeItem.id)
//         labelText = this.state.rootTreeList[treeIndex].rTreeItem.id;


//     let inputElement;
//     if (editType === 'range') {
//         inputElement = (<input name={labelText} type="range" min={inputMin} max={inputMax} step={inputStep} value={valueARef}
//             onChange={(e) => this.getCombo(valueARef, e)} />)
//     }

//     let sl = (
//         <React.Fragment>
//             <label style={this.editorWinLabels} > {labelText} ( {valueARef} ) </label>
//             {inputElement}
//         </React.Fragment>
//     );
//     return sl;
// }

    // nEditorUIRootTree(valueARef, labelText, colorAlphaRef, colorRGBARef, editType = 'range', inputMin = 0, inputMax = 100, inputStep = 1, changeHandler = this.nEditorValueHandler) {
    //     let inputElement;
    //     if (editType === 'range') {
    //         inputElement = <input name={labelText} type="range" min={inputMin} max={inputMax} step={inputStep} value={valueARef} onChange={this.addRootTreeItemHandler} /> // name={inputName} 
    //     }

    //     if (editType === 'color') {
    //         inputElement = (
    //             <React.Fragment>
    //                 <input name={labelText} type="color" value={valueARef} onChange={changeHandler} />
    //                 <label style={this.editorWinLabels}> Alpha( {colorAlphaRef} )
    //                     <input className='slidecontainer' name={labelText + 'Alpha'} type="range" min='0' max='1' step='0.01' value={colorAlphaRef} onChange={changeHandler} />
    //                     - {colorRGBARef} </label>
    //             </React.Fragment>
    //         )
    //     }

    //     let sl = (
    //         <React.Fragment>
    //             <label style={this.editorWinLabels} > {labelText} ( {valueARef} ) </label>
    //             {inputElement}
    //         </React.Fragment>
    //     );
    //     return sl;
    // }

    // addRootTreeItemHandler(event) {
    //     console.log('adding target.name ' + event.target.name + ' target.styleRef ' + event.target.value);
    //     let item = { ...this.state.rootTreeList };
    //     switch (event.target.name) {
    //         case 'width':
    //             event.target.width = event.target.value; //this.setState({ width: event.target.value });
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // getCombo(treeIndex, e) {
    //     // if(this.state.rootTreeList[treeIndex]==undefined)    
    //     //     return;
    //     let item = { ...this.state.rootTreeList[treeIndex].style.width };
    //     //let itemB = {...this.state.rootTreeList[treeIndex].rTreeItem.nUiEditorHnalder.width};

    //     console.log('combo' + item + ' etV ' + e.target.value);
    //     item = e.target.value;
    //     //itemB = e.target.value;

    //     this.setState({
    //         item: e.target.value + 'vw',
    //         //itemB: e.target.value + 'vw',
    //     });

    //     this.render();
    //     //console.log('combo' + this.state.rootTreeList[treeIndex].rTreeItem.rTreeItem.styleRef.width + ' etV ' + e.target.value);
    //     if (item) {
    //         console.log('combo' + item + ' etV ' + e.target.value);
    //     }
    // }

    //valueARef, labelText, colorAlphaRef, colorRGBARef, editType = 'range', inputMin = 0, inputMax = 100, inputStep = 1, changeHandler = this.nEditorValueHandler



// event.target.nextElementSibling.style.display =
//     event.target.nextElementSibling.style.display === 'none' ? "inline" : "none";


// handleValueChangeCustomDog(event) {
//     switch (event.target.name) {
//         case 'width':
//             this.setState({ width: event.target.value });
//             break;
//         case 'height':
//             this.setState({ dogCustomHeight: event.target.value });
//             break;
//         case 'fontResize':
//             this.setState({ dogCustomFontSize: event.target.value });
//             break;
//         case 'dogCNazivFontResize':
//             this.setState({ dogCNazivFontSize: event.target.value });
//             break;
//         case 'backGroundColor': {
//             let currentColor = event.target.value;
//             let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + this.state.dogCustomBackGroundColorAlpha + ')';
//             this.setState({ dogCustomBackGroundColorRGBA: rgbaCol, dogCustomBackGroundColor: event.target.value });
//         }
//             break;
//         case 'backGroundColorAlpha': {
//             let currentColor = this.state.dogCustomBackGroundColor;
//             let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + event.target.value + ')';
//             this.setState({ dogCustomBackGroundColorRGBA: rgbaCol, dogCustomBackGroundColorAlpha: event.target.value });
//         }
//             break;
//         case 'boxShadow1':
//             this.setState({ dogCustomBoxShadowXoff: event.target.value });
//             break;
//         case 'boxShadow2':
//             this.setState({ dogCustomBoxShadowYoff: event.target.value });
//             break;
//         case 'boxShadow3':
//             this.setState({ dogCustomBoxShadowBlurRad: event.target.value });
//             break;
//         case 'shadowColor': {
//             let currentColor = event.target.value;
//             let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + this.state.dogCustomShadowColorAlpha + ')';
//             this.setState({ dogCustomBoxShadowColorRGBA: rgbaCol, dogCustomBoxShadowColor: event.target.value });
//         }
//             break;
//         case 'shadowColorAlpha': {
//             let currentColor = this.state.dogCustomBoxShadowColor;
//             let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + event.target.value + ')';
//             this.setState({ dogCustomBoxShadowColorRGBA: rgbaCol, dogCustomShadowColorAlpha: event.target.value });
//         }
//             break;
//         case 'nazivColor': {
//             let currentColor = event.target.value;
//             let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + this.state.dogCNazivColorAlpha + ')';
//             this.setState({ dogCNazivColorRGBA: rgbaCol, dogCNazivColor: event.target.value });
//         }
//             break;
//         case 'dogCNazivColorAlpha': {
//             let currentColor = this.state.dogCNazivColor;
//             let rgbaCol = 'rgba(' + parseInt(currentColor.slice(-6, -4), 16) + ',' + parseInt(currentColor.slice(-4, -2), 16) + ',' + parseInt(currentColor.slice(-2), 16) + ',' + event.target.value + ')';
//             this.setState({ dogCNazivColorRGBA: rgbaCol, dogCNazivColorAlpha: event.target.value });
//         }
//             break;
//         default:
//             break;
//     }
// }


    // nPropertyEditor(editType, lblTxt, valARef, inputName, colorAlphaRef, colorRGBARef, inputNameAlpha, inputMin = 0, inputMax = 100, inputStep = 1, changeHandler = this.handleValueChangeCustomDog) { // if (arguments.length == 4)        
    //     let inputElement;
    //     if (editType === 'range') {
    //         inputElement = <input name={inputName} type="range" min={inputMin} max={inputMax} step={inputStep} value={valARef} onChange={changeHandler} />
    //     }
    //     if (editType === 'color') {
    //         inputElement = (
    //             <React.Fragment>
    //                 <input name={inputName} type="color" value={valARef} onChange={changeHandler} />
    //                 <label style={this.editorWinLabels} > Alpha( {colorAlphaRef} )

    //                     <input className='slidecontainer' name={inputNameAlpha} type="range" min={inputMin} max={inputMax} step={inputStep} value={colorAlphaRef} onChange={changeHandler} />
    //                     - {colorRGBARef} </label>
    //             </React.Fragment>
    //         )
    //     }

    //     let sl = (
    //         <React.Fragment>
    //             <label style={this.editorWinLabels} > {lblTxt} ( {valARef} ) </label>
    //             {inputElement}
    //         </React.Fragment>
    //     );
    //     return sl;
    // }


// getThoseListeners() {
//     const listeners = (function listAllEventListeners() {
//         let elements = [];
//         const allElements = document.querySelectorAll('*');
//         const types = [];
//         for (let ev in window) {
//             if (/^on/.test(ev)) types[types.length] = ev;
//         }

//         for (let i = 0; i < allElements.length; i++) {
//             const currentElement = allElements[i];
//             for (let j = 0; j < types.length; j++) {
//                 if (typeof currentElement[types[j]] === 'function') {
//                     elements.push({
//                         "node": currentElement,
//                         "listeners": [{
//                             "type": types[j],
//                             "func": currentElement[types[j]].toString(),
//                         }]
//                     });
//                 }
//             }
//         }




//         return elements.filter(element => element.listeners.length)
//     })();

//     console.table(listeners);
// }
//     nMainMenu() {


//         function NavBar(props) {
//             return (
//                 <nav className="navbar">
//                     <ul className="navbar-nav"> {props.children} </ul>
//                 </nav>
//             );
//         }
//         function NavItem(props) {

//             const [open, setOpen] = useState(true);
//             return (
//                 <li className="nav-item">
//                     <button className="nButton" onClick={() => setOpen(!open)} >
//                         {props.nDisp}
//                     </button>                    

//                     {open?console.log('open'):console.log('nije open')}
//                     {/* {open && props.children} */}
//                 </li>
//             );
//         }
//         function DropdownMenu() {
//             const [activeMenu, setActiveMenu] = useState('main');
//             const [menuHeight, setMenuHeight] = useState(null);
//             const dropdownRef = useRef(null);

//             useEffect(() => {
//                 setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
//               }, [])


//             function DropdownItem(props) {
//                 return (
//                     <button className="menu-item" onClick={console.log('klikno drop')}>
//                         {props.children}
//                     </button>
//                 );
//             }

//             function calcHeight(el) {
//                 console.log('aaaaaa ' + el);
//                 const height = el.offsetHeight;
//                 setMenuHeight(height);
//               }

//             return (
//                 <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
//                      <CSSTransition
//         in={activeMenu === 'main'}
//         timeout={500}
//         classNames="menu-primary"
//         unmountOnExit
//         onEnter={calcHeight}>
//         <div className="menu">
//         < DropdownItem goToMenu="settings">Settings </ DropdownItem>
//                         < DropdownItem goToMenu="settings"> drugi </ DropdownItem>

//         </div>
//       </CSSTransition>
//                     {/* <div className="menu">
//                         < DropdownItem goToMenu="settings">Settings </ DropdownItem>
//                         < DropdownItem goToMenu="settings"> drugi </ DropdownItem>
//                     </div> */}
//                 </div>
//             );
//         }

//         let menu = (
//             <NavBar>
//                 <NavItem nDisp='skrol' />   
//                 {/* <NavItem nDisp='drugi' /> */}
//                 {/* <NavItem nDisp='moj meni'>
//                     <DropdownMenu></DropdownMenu>
//                 </NavItem> */}

//             </NavBar>
//             // <nav>
//             //     <li><button> Settings </button></li>
//             //     <li><button> Home </button></li>
//             //     <li>
//             //         <select name="cars" id="cars" oncli >
//             //             <option value='1' > Skrol </option>
//             //             <option value='2'> Color </option>
//             //         </select> </li>
//             // </nav>

//         )

//         return menu;
//     }
// }


        // let menu = (
        //     <ul>
        //         <li><button> Settings </button></li>
        //         <li><button> Home </button></li>
        //         <li>
        //             <select name="cars" id="cars" oncli >
        //                 <option value='1' > Skrol </option>
        //                 <option value='2'> Color </option>
        //             </select> </li>
        //     </ul>

        // )
        // let Div = styled.div`
        //  margin: 40px;
        // border: 5px outset pink;
        // &:hover {
        // background-color: yellow;
        // }`;

        // const MenuStyle = styled.ul`
        // list-style-type: none;
        // margin: 0;
        // padding: 0;
        // overflow: hidden;
        // background-color: #333;
        // `;

        // const OutsetBox = () => (
        //     <Div>
        //         <Paragraph>Get started with styled-components 💅</Paragraph>
        //     </Div>
        // );
