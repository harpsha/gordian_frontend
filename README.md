

# Gordian Frontend

This is a React application which is a prototype of the Flight Booking UI. It takes the user's itineraries and shows the list of available flights with their prices, timings and airline carrier. The cache api receives flight string, agent id and number of adults as parameters. It also allows users to select flight and seats and put them into the cart. The display api takes in agent id and session id as the parameters and we receive a modal which allows users to select seats and push into the cart.

## Dependencies

- **@material-ui/core 3.4.0**
- **@material-ui/icons ^3.0.1**
- **autosuggest-highlight ^3.1.1**
- **bootstrap ^4.1.3**
- **contentful ^7.0.5**
- **jquery ^3.3.1**
- **moment ^2.22.2**
- **prop-types ^15.6.2**
- **react ^16.5.2**
- **react-autosuggest ^9.4.2**
- **react-datepicker ^1.6.0**
- **react-dom ^16.5.2**
- **react-scripts 1.1.5**


## Local Deployment

To deploy this application locally follow the following steps.

a. Install Node.js and npm on your machine.



Now run the following commands 


 ```javascript
    git clone git@github.com:harpsha/gordian.git
    cd gordian
    npm install
    npm start
```    


## Heroku Deployment

To deploy on Heroku follow the following steps.

a. Install Heroku CLI from https://devcenter.heroku.com/articles/heroku-command-line
b. Sign Up on Heroku if already Signed Up then skip this step.
c. Create a new application on Heroku and give it a name( ex: app_name)

    
Now run the following commands

 ```javascript
    heroku login
    git clone git@github.com:harpsha/gordian.git
    cd gordian
    git init
    heroku git:remote -a app_name     
    git add .
    git commit -m "Your Commit Message"
    git push heroku master
```     

This will push all the code into the heroku repository and also upload your application on the heroku server.
The application can be now found on https://app_name.herokuapp.com

## How it works

The app starts with checking for adblocker being used and then takes to the login screen. After Login it shows the form to fill the itinerary which then gives us the list of flights available with respect to that particular itinerary and then we can select any flight and then select the seats accordingly which are then available in our cart.

**adblockDetect function**

It checks for an adBlocker being used. It shows a backdrop screen with a modal box requesting to disable the adblocker untill it is disabled.

**handleLogin function**

This function requests the users endpoint of the Gordian api using GET method and sends agent id as parameter to the api.

**handleFlightSelection function**

This function requests the cache endpoint of the Gordian api and sends agent id, Flight String and number of adults as the parameters.

**handlePutCache function**

This function request the users endpoint using POST method and sends the data which contains agent id, session id and cart to the server. 

**handleTicketBooking function**

This function request he display endpoint and sends agent id, and session id as parameter to the api. In response we get the modal which contains the seat layout out of which the user can select seats and book them.


## Possible errors 

**HTTP 400**

This error code can be received in the following scenarios

1. Unsupported Passenger Types: API does not support infant passengers. IT also do not support children for some airlines and                                        itineraries.

2. Unsupported Carriers: Carriers that are not supported or which are disabled for a agent ID will trigger this error.

3. Unsupported Travel Date: API requires a flight to depart at least 4 days in the future. There are other date restrictions                                     depending on the carrier.

**HTTP 404**

This session does not exist or contains no products that can be booked by this traveller.

**HTTP 202**

202 is returned when the session has not finished retrieving and rendering products for the airline. It is possible that the session will not resolve, so this should only be polled for a limited period of time.