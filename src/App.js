import React, { Component, Fragment } from 'react';
import uuid from "uuid"
import DatePicker from "react-datepicker"
import moment from 'moment';
import FlightsPageItem from './components/FlightsPageItem';
import Cart from "./components/Cart"
import AdBlockMessage from "./components/AdBlockMessage"
import LoginPage from './components/LoginPage';

import './App.css';
import "./assets/css/Common.styles.css"
import 'react-datepicker/dist/react-datepicker.css';

const SESSION_API_URI = "https://test-ancil-overlay.herokuapp.com/v1/funnel/cache.js?agent_id=";
const DISPLAY_API_URL = "https://test-ancil-overlay.herokuapp.com/v1/funnel/display.js?agent_id=";
const STORE_SESSION_API_URL = "https://gordian.herokuapp.com/users/";

// Flight dummy data

const flightList = [{
  id: uuid.v4(),
  fare: 24,
  currency: "$",
  duration: "5hr 39m",
  departure: "14:05",
  arrival: "22:44",
  company: "Ethiad airlines",
  src: "ethiad",
}, {
  id: uuid.v4(),
  fare: 24,
  currency: "$",
  duration: "5hr 39m",
  departure: "14:05",
  arrival: "22:44",
  company: "American Airlines",
  src: "aa",
}, {
  id: uuid.v4(),
  fare: 24,
  currency: "$",
  duration: "5hr 39m",
  departure: "14:05",
  arrival: "22:44",
  company: "American Airlines",
  src: "aa",
}, {
  id: uuid.v4(),
  fare: 24,
  currency: "$",
  duration: "5hr 39m",
  departure: "14:05",
  arrival: "22:44",
  company: "American Airlines",
  src: "aa",
}, {
  id: uuid.v4(),
  fare: 24,
  currency: "$",
  duration: "5hr 39m",
  departure: "14:05",
  arrival: "22:44",
  company: "American Airlines",
  src: "aa",
},]

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      source: "San Francisco",
      adults: 1,
      agent_id: "",
      destination: "New York",
      showFlights: false,
      displayCart: false,
      departureDate: moment(new Date('2018', '9', '15')),
      arrivalDate: moment(new Date('2018', '9', '15')),
      cartItems: [],
      session_id: "",
      isAuthenticated: false,
      fakeValue: "",
      AdBlockerState: false,
    }
  }

  handleAdultsChange = (event) => {
    this.setState({
      adults: event.target.value,
    })
  }

  handleDepartureChange = (date) => {
    this.setState({
      departureDate: date,
    })
  }

  handleArrivalChange = (date) => {
    this.setState({
      arrivalDate: date,
    })
  }

  handleSourceChange = (event) => {
    this.setState({
      source: event.target.value
    })
  }

  handleDestinationChange = (event) => {
    this.setState({
      destination: event.target.value
    })
  }

  handleAgentIDChange = (event) => {
    this.setState({
      agent_id: event.target.value,
    })
  }
  // Checks whether adblock is enabled or not
  handleAdBlocker = (status) => {
    console.log("handleAdBlocker", status)
    this.setState({
      AdBlockerState: status
    })
  }

  displayFlightList = () => {
    this.handleFlightSelection();
    this.setState({
      showFlights: true,
    })
  }
  // Gets session id from the gordian server and stores in agent's server for future use
  handleFlightSelection = () => {
    console.log("Flight selection");
    const URL = `${SESSION_API_URI}${this.state.agent_id}&flight_string=SFO*2018-10-15T07:20*CQ*123*JFK*2018-10-15T08:45&adults=1`
    fetch(URL, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow",
      referrer: "no-referrer",
    })
      .then(response => response.json())
      .then(data => {
        console.log("Getting session id from server", data);
        this.handlePutCache(data.session_id, data.basket);
        this.setState({
          isAuthenticated: true,
          session_id: data.session_id,
        })
      })
      .catch(error => console.error(error))
  }

  // displays Gordian Ancillary Overlay Popup

  handleTicketBooking = () => {
    console.log("handleTicketBooking");
    const URL = `${DISPLAY_API_URL}${this.state.agent_id}&session_id=${this.state.session_id}`;
    console.log("Getting display from ", URL);
    fetch(URL, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json',
      },
      redirect: "follow",
      referrer: "no-referrer",
    })
      .then(response => {
        console.log(response)
        // If get error create new session id using 1st API
        if (response.status !== 200) {
          console.log("creating new session_id");
          this.handleFlightSelection()
        }
      }
      )
      .then(data => {
        const script = document.createElement("script");
        script.async = true;
        script.src = URL;
        document.getElementById('modal_loader').appendChild(script);
        document.getElementById('modal_loader').style.display = 'block';
        document.getElementById('react_gordian_modal').style.display = 'block';
        document.getElementById('ancillary_anchor').style.display = 'block';
      })
      .catch(error => console.error(error))
  }

  // Updates the session state on agent's server

  handlePutCache = (session_id, cartItems) => {
    console.log("handlePutCache");
    let newCartItems = cartItems;
  
    if (cartItems === "" || cartItems === null || cartItems === undefined) {
      newCartItems = [];
    }
    
    const URL = `${STORE_SESSION_API_URL}${this.state.agent_id}/`;
    const data = {
      username: this.state.agent_id,
      session: session_id,
      basket: JSON.stringify(newCartItems)
    }
    console.log("data to be saved on server", data)
    
    fetch(URL, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json',
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    })
      .then(response => response.json()
      )
      .then(data => {
        console.log("data saved on server", data);
      })
      .catch(error => console.error(error))
  }
  
  /* 
     Removes selected item from cart  
     Warning : currently it removes all elements 
  */
  handleDeleteProduct = (id) => {
    console.log("handleDeleteProduct", id);
    this.setState({
      showFlights: true,
      displayCart: false,
      cartItems: [],
    })
    this.handlePutCache(this.state.session_id, []);
  }

  /* swaps the source and destination location */
  handleSwapDestination = () => {
    const source = this.state.destination;
    const destination = this.state.source;
    this.setState({
      source,
      destination,
    })
  }

  // Get session_id and user basket from the server 
  handleLogin = () => {
    console.log("handleLogin");
    if (this.state.agent_id.length === 0) {
      alert("Enter your Agent ID");
      return;
    }
    fetch(`${STORE_SESSION_API_URL}${this.state.agent_id}/`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow",
      referrer: "no-referrer",
    })
      .then(response =>
        response.json()
      )
      .then(data => {
        console.log(data)
        if (!data.hasOwnProperty("session") || data.session.length === 0) {
          console.log("No session present. Create new one");
          this.handleFlightSelection();
          this.setState({
            isAuthenticated: true,
          })
        } else {
          console.log("Session present on server");
          let cartItems = [];
          let ok = false;
          if (data.basket !== null && data.basket !== "") {
            cartItems = JSON.parse(data.basket),
              ok = true;
          }
          this.setState({
            session_id: data.session,
            isAuthenticated: true,
            cartItems: cartItems,
            displayCart: ok,
          })
        }
      })
      .catch(error => console.error(error))
  }

 /*  Acts as trigger when the Gordian Ancillary Overlay popup is over*/
  handleStateChange = () => {
    console.log("handleStateChange");
    this.setState({
      displayCart: true,
      showFlights: false,
      cartItems: window.cartItems,
    })
    this.handlePutCache(this.state.session_id, window.cartItems);
  }

  render() {
    return (
      <Fragment >
        {
          (this.state.AdBlockerState === true)
            ? <AdBlockMessage />
            :
            (this.state.isAuthenticated === false)
              ? <LoginPage handleAgentIDChange={this.handleAgentIDChange} handleLogin={this.handleLogin} />
              :
              <div className="App">
                <div className="header primary">
                  <h2>BOOK FLIGHT</h2>
                </div>
                <div className="form-container mt50">
                  <div className="nice-box">
                    <div className="row">
                      <div className="col-md-box">
                        <label className="label-text">From</label>
                        <form autoComplete="off" >
                          <div className="autocomplete" style={{ width: 240 + 'px' }}>
                            <input id="myInputFrom" onChange={this.handleSourceChange} type="text" value={this.state.source} placeholder="Country, city or airport" />
                          </div>
                        </form>
                      </div>
                      <div className="box">
                        <label className="label-text"></label>
                        <button className="interchange-btn btn right-border" onClick={this.handleSwapDestination}></button>
                      </div >
                      <div className="box">
                        <label className="label-text">To</label>
                        <form autoComplete="off right-border" >
                          <div className="autocomplete" style={{ width: 240 + 'px' }}>
                            <input id="myInputTo" onChange={this.handleDestinationChange} type="text" value={this.state.destination} placeholder="Country, city or airport" />
                          </div>
                        </form>
                      </div>
                      <div className="box">
                        <label className="label-text">Depart</label>
                        <DatePicker
                          className="left-border right-border"
                          selected={this.state.departureDate}
                          onChange={this.handleDepartureChange}
                        />;
                  </div>

                      <div className="box">
                        <label className="label-text">Return</label>
                        <DatePicker
                          className="right-border"
                          selected={this.state.arrivalDate}
                          onChange={this.handleArrivalChange}
                        />;
                  </div>

                      <div className="box">
                        <label className="label-text">Cabin class & Travellers</label>
                        <form autoComplete="off right-border" >
                          <div className="autocomplete" style={{ width: 240 + 'px' }}>
                            <input id="myInput" onChange={this.handleAdultsChange} type="text" value={this.state.adults} placeholder="Choose Class and seats" />
                          </div>
                        </form>
                      </div>
                      <button className="search-btn" onClick={this.displayFlightList}> Search flights <span><i className="fa fa-arrow-right"> </i></span></button>
                    </div>
                  </div>
                </div>
                {
                  (this.state.showFlights === true)
                    ?
                    <table className="table table-hover flight-container ml20 mr20 mt20 mb20">
                      <thead>
                        <tr>
                          <th className="table-row-text">AIRLINE</th>
                          <th className="table-row-text">DURATION</th>
                          <th className="table-row-text">DEPART</th>
                          <th className="table-row-text">ARRIVE</th>
                          <th className="table-row-text">PRICE</th>
                          <th className="table-row-text"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          (
                            flightList.map(flight => (
                              <FlightsPageItem flightDetails={flight} handleTicketBooking={this.handleTicketBooking} />
                            )))}
                      </tbody>
                    </table> : ''
                }
                {
                  (this.state.displayCart === true && this.state.cartItems.length > 0)
                    ? <Cart cartItems={this.state.cartItems} handleConfirmPurchase={this.handleConfirmPurchase} handleDeleteProduct={this.handleDeleteProduct} />
                    : ''
                }
              </div>
        }
      </Fragment>
    )
  }
}
export default App;