import React, { Component, Fragment } from 'react';
import uuid from "uuid"
import DatePicker from "react-datepicker"
import moment from 'moment';
import FlightsPageItem from './components/FlightsPageItem/FlightsPageItem';
import Cart from "./components/CartComponent/Cart"
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';
import "./assets/css/Common.styles.css"
import 'react-datepicker/dist/react-datepicker.css';
import Backdrop from './components/Backdrop/backdrop';
import Navbar from './components/Navbar/Navbar'
import * as dataItems from './components/DataItems/DataItems'


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
                    counterState : 2,
                    showcarticon : false,
                    title : 'Welcome'
    }
  }



  componentDidMount = () => {
    this.adBlockDetect()
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

  displayFlightList = () => {
    this.handleFlightSelection();
    this.setState({
      showFlights: true,
    })
  }



  // Gets session id from the gordian server and stores in agent's server for future use
  handleFlightSelection = () => {
    
    const URL = `${dataItems.SESSION_API_URI}${this.state.agent_id}&flight_string=SFO*2018-12-25T07:20*CQ*123*JFK*2018-12-25T08:45&adults=1`
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
      .then(response => {
        
       return response.json()})
      .then(data => {
  
        this.handlePutCache(data.session_id, data.basket);
        this.setState({
          isAuthenticated: true,
          title : 'Book Flight',
          showcarticon : true,
          session_id: data.session_id,
        })
      })
      .catch(error => console.error(error))
  }




  // displays Gordian Ancillary Overlay Popup

  handleTicketBooking = () => {
   
    const URL = `${dataItems.DISPLAY_API_URL}${this.state.agent_id}&session_id=${this.state.session_id}`;
    
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
      
        // If get error create new session id using 1st API
        if (response.status !== 200) {
         
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
    
    let newCartItems = cartItems;
  
    if (cartItems === "" || cartItems === null || cartItems === undefined) {
      newCartItems = [];
    }
    
    const URL = `${dataItems.STORE_SESSION_API_URL}${this.state.agent_id}/`;
    const data = {
      username: this.state.agent_id,
      session: session_id,
      basket: JSON.stringify(newCartItems)
    }
    
    
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
        
      })
      .catch(error => console.error(error))
  }
  






  /* 
     Removes selected item from cart  
     Warning : currently it removes all elements 
  */
  handleDeleteProduct = (id) => {
    
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
    
    if (this.state.agent_id.length === 0) {
      alert("Enter your Agent ID");
      return;
    }
    fetch(`${dataItems.STORE_SESSION_API_URL}${this.state.agent_id}/`, {
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
        
        if (!data.hasOwnProperty("session") || data.session.length === 0) {
    
          this.handleFlightSelection();
          this.setState({
            isAuthenticated: true,
            title : 'Book Flight',
            showcarticon : true,
          })
        } else {
          
          let cartItems = [];
          let ok = false;
          if (data.basket !== null && data.basket !== "") {
            cartItems = JSON.parse(data.basket)
            ok = true;
          }
          this.setState({
            session_id: data.session,
            isAuthenticated: true,
            title : 'Book Flight',
            showcarticon : true,
            cartItems: cartItems,
           
          })
         
        }
      })
      .catch(error => console.error(error))
      
  }



// handles the click event of go back button in cart
  handleGoBack = () => {
    this.setState ({
      displayCart : false,
      showFlights : true,
      title:'Book Flight',
    })
  }




 /*  Acts as trigger when the Gordian Ancillary Overlay popup is over*/
  handleStateChange = () => {
    
    this.setState({
      displayCart: true,
      title : 'Cart',
      showFlights: false,
      showcarticon : true,
      cartItems: window.cartItems,
    })
    this.handlePutCache(this.state.session_id, window.cartItems);
  }


// handles the modal for the adblocker
  modalHandler = ()=>{
     let counter =  this.state.counterState
     this.setState({counterState: counter+1}, () => {
       this.adBlockDetect()
     })
   
  }



  adBlockDetect = () => {
   var detected = false;
    
   // create the bait to inject into the DOM
   var bait = (this.state.counterState %2 === 0) ? document.createElement('div') :  document.createElement('section');
        bait.setAttribute('class', 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links');
        bait.setAttribute('style', 'width: 30px ! important; background:red; height: 30px !important; position: absolute !important; left:-1000px;');
        window.document.body.appendChild(bait);
        if(bait.clientHeight===0){
            detected = true;
            
        }else if(window.getComputedStyle !== undefined) {
            var baitTemp = window.getComputedStyle(bait, null);
            if(baitTemp && (baitTemp.getPropertyValue('display') === 'none' || baitTemp.getPropertyValue('visibility') === 'hidden')) {
                detected = true;
                
            }
        }

      //  destroy the bait
        window.document.body.removeChild(bait);
       
        if(detected){
          this.setState({AdBlockerState : true})
      }
        else{
          this.setState({AdBlockerState : false})
      }
    
  }



// handles click on the cart icon 
  showcartPage = () => {
    if(this.state.isAuthenticated===true){

      this.setState({
        displayCart : true,
        title: 'Cart',
      })
    }
    else{
      alert("Please Log In to see the Cart")
    }

  }



render() {
    
    return (
        <Fragment >
          <Navbar 
              showcart={this.state.showcarticon} 
              showcartPage={this.showcartPage} 
              cartItems={this.state.cartItems.length}  
              title={this.state.title}/>
          <div >
            { 
              (this.state.isAuthenticated === false ) && (this.state.AdBlockerState === true)
              ? <div> 
                        <LoginPage handleAgentIDChange={this.handleAgentIDChange} handleLogin={this.handleLogin} />
                        <Backdrop show={this.state.AdBlockerState} clickedthis={this.modalHandler} /> 
                 </div>
               :
               (this.state.isAuthenticated === false )
               ? 
               <LoginPage handleAgentIDChange={this.handleAgentIDChange} handleLogin={this.handleLogin} />
               :
               (this.state.displayCart === false  ) 
               ?
               <div className="App ">
                <div className="form-container mt65">
                  <div className="nice-box">
                    <div className="row">
                      <div className="col-md-box firstbox">
                        <label className="label-text">From</label>
                        <form autoComplete="off" >
                          <div className="autocomplete" style={{ width: 240 + 'px' }}>
                            <input id="myInputFrom" onChange={this.handleSourceChange} type="text" value={this.state.source} placeholder="Country, city or airport" />
                          </div>
                        </form>
                      </div>
                      <div className="box firstbox">
                        <label className="label-text"></label>
                        <button className="interchange-btn btn right-border" onClick={this.handleSwapDestination}></button>
                      </div >
                      <div className="box firstbox">
                        <label className="label-text">To</label>
                        <form autoComplete="off right-border" >
                          <div className="autocomplete" style={{ width: 240 + 'px' }}>
                            <input id="myInputTo" onChange={this.handleDestinationChange} type="text" value={this.state.destination} placeholder="Country, city or airport" />
                          </div>
                        </form>
                      </div>
                      <div className="box firstbox">
                        <label className="label-text">Depart</label>
                        <DatePicker
                          className="left-border right-border"
                          selected={this.state.departureDate}
                          onChange={this.handleDepartureChange}
                        />;
                    </div>

                    <div className="box firstbox">
                        <label className="label-text">Return</label>
                        <DatePicker
                          className="right-border"
                          selected={this.state.arrivalDate}
                          onChange={this.handleArrivalChange}
                        />;
                    </div>

                      <div className="box firstbox">
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
                            dataItems.flightList.map(flight => (
                              <FlightsPageItem key={uuid.v4()} flightDetails={flight} handleTicketBooking={this.handleTicketBooking} />
                            )))}
                      </tbody>
                    </table> : ''
                }
                
              </div>
              :
              <div className="main-body">
                <Cart 
                  cartItems={this.state.cartItems} 
                  handleConfirmPurchase = {this.handleConfirmPurchase} 
                  handleDeleteProduct = {this.handleDeleteProduct}
                  handleGoBack = {this.handleGoBack} />
              </div>
         }  
          </div>
         
      </Fragment>
     )
   }
}
export default App;