import React from 'react'

export default (props) => {
    this.handleTicket = (event) => {
        props.handleTicketBooking();
    }
    return (
        <tr className="flight-container-item pd20" key={props.flightDetails.id} id={props.flightDetails.id}>
            <td className={`pt20 flight-company-${props.flightDetails.src}`} >
                <p className="pl80">{props.flightDetails.company}</p>
            </td>
            <td className="pt25 flight-from">
                {props.flightDetails.duration}
            </td>
            <td className="pt25 flight-departure">
                {props.flightDetails.departure}
            </td>
            <td className="pt25 flight-arrival">
                {props.flightDetails.arrival}
            </td>
            <td className="pt25 flight-price">
                {props.flightDetails.currency} {props.flightDetails.fare}
            </td>
            <td className="flight-book-btn">
                <button className="btn btn-success btn-md book-btn" onClick={this.handleTicket}>Book</button>
            </td>
        </tr>
    )
}
