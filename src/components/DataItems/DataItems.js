import uuid from "uuid"



export const flightList = [{
                        id: uuid.v4(),
                        fare: 24,
                        currency: "$",
                        duration: "5hr 39m",
                        departure: "14:05",
                        arrival: "22:44",
                        company: "Ethiad airlines",
                        src: "ethiad",
                    }, 
                    {
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



 export  const SESSION_API_URI = "https://test-ancil-overlay.herokuapp.com/v1/funnel/cache.js?agent_id=";
 export  const DISPLAY_API_URL = "https://test-ancil-overlay.herokuapp.com/v1/funnel/display.js?agent_id=";
 export  const STORE_SESSION_API_URL = "https://gordian.herokuapp.com/users/";                    