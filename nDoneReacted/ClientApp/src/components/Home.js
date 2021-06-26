import React, { Component } from 'react';
import crowd from '../img/crowd.jpg';
import protV1 from '../img/protV1.jpg';
import '../css/LandingPage.css'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div id="mainContainer">
      
        <div className="myCardsGroup">
          <div className="myCard">
            <h3>Problem\i ?</h3>
            <img className="myCardImg" src={crowd} alt="Crowded" />
            <div>
              <p>
                Gužva, gužva i opet gužva. Pri kupovini ulaznica za bilo koji događaj.
                Živimo u 21. vijeku, a i dalje trošimo dragocijeno vrijeme ćekajući u redovima, bez
                ikakve
                potrebe.
                        </p>
              <div className="tables">
                <table className="center">
                  <thead>
                    <tr>
                      <th>Centalizovana prodaja</th>
                      <th>Nacin placanja</th>
                      <th>Kontrola ulaznica</th>
                      <th>Bespotrebna rezervacija</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cesto se prodaja odvija na samo jednom mjestu</td>
                      <td>Ograniceni nacini placanja</td>
                      <td>Iii opet guzva pri kontroli ulaznica</td>
                      <td>Koliko ste puta uzaludno zvali da rezervisete ulaznicu ?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="myCardRjesenje">
            <h5>Rješenje</h5>
            <img className="myCardImg" src={protV1} alt="PrototipV1" />
            <div>
              <p>
                Na slici je predstavljan prvi prototip vanjskog izgleda uredjaja =). U
                kombinaciji sa ovom
                web stranicom koja je zaduzena za plasman ulaznica, osim sto donosi inovaciju na
                trziste,
                svojim
                korisnicima osigurava
                ono najbitnije a to je dragocijeno vrijeme.
                Na slici je predstavljan prvi prototip vanjskog izgleda uredjaja =). U
                kombinaciji sa ovom
                web stranicom koja je zaduzena za plasman ulaznica, osim sto donosi inovaciju na
                trziste,
                svojim
                korisnicima osigurava
                ono najbitnije a to je dragocijeno vrijeme.
                        </p>
              <div className="tables">
                <table className="center">
                  <thead>
                    <tr>
                      <th>NDone platforma</th>
                      <th>NDone uredjaj</th>
                      <th>Razni nacini placanja</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> ✓ Univerzalna platforma </td>
                      <td> ✓ Univerzalan </td>
                      <td> ✓ Kartice</td>
                    </tr>
                    <tr>
                      <td>✓ Jednostavna za upotrebu</td>
                      <td>✓ Inovativan </td>
                      <td>✓ N-bon, X-bon</td>
                    </tr>
                    <tr>
                      <td>✓ Besplatna registracija</td>
                      <td>✓ Prenosiv i autentican </td>
                      <td>✓ SMS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="containerCarousel">

          <div className="cards">
            <label className="cardCarousel" for="item-1" id="song-1">

              <div className="cardInfo" id="cardInfo-1">
                <div className="cardTitle">
                  Koncerti
                            </div>
                <div className="cardDetails">
                  Zasto trositi vrijeme na odlazak u kupovinu ulaznice ? Traziti parking ? Peglati se po javnom saobracaju ?
                            </div>
              </div>

            </label>
            <label className="cardCarousel" for="item-2" id="song-2">

              <div className="cardInfo" id="cardInfo-2">
                <div className="cardTitle">
                  Kina
                            </div>
                <div className="cardDetails">
                  Zasto trositi vrijeme na odlazak u kupovinu ulaznice ? Traziti parking ? Peglati se po javnom saobracaju ?
                            </div>
              </div>
            </label>
            <label className="cardCarousel" for="item-3" id="song-3">

              <div className="cardInfo" id="cardInfo-3">
                <div className="cardTitle">
                  Parking
                            </div>
                <div className="cardDetails">
                  Zasto trositi vrijeme na odlazak u kupovinu ulaznice ? Traziti parking ? Peglati se po javnom saobracaju ?
                            </div>
              </div>
            </label>
            <label className="cardCarousel" for="item-4" id="song-4">

              <div className="cardInfo" id="cardInfo-4">
                <div className="cardTitle">
                  Javni prevoz
                            </div>
                <div className="cardDetails">
                  Zasto trositi vrijeme na odlazak u kupovinu ulaznice ? Traziti parking ? Peglati se po javnom saobracaju ?
                            </div>
              </div>

            </label>
            <label className="cardCarousel" for="item-5" id="song-5">
            
                <div className="cardInfo" id="cardInfo-5">
                  <div className="cardTitle">
                    Utakmice
                            </div>
                            <div className="cardDetails">
                              Zasto trositi vrijeme na odlazak u kupovinu ulaznice ? Traziti parking ? Peglati se po javnom saobracaju ?
                            </div>
                          </div>
                    </label>
                </div>
          </div>           */}
      </div>
    );
  }
}
