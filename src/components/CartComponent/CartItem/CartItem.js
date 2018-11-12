import React from 'react'
import './CartItem.css'
import '../../../App.css'
import logo from "./aa.png"


export default (props) => {

    // this method splits the string joined by underscore and rejoins with a space
    this.formatSeat = (string) =>{
         
        
        return string.split('_').map(word=>{
            return word.toUpperCase().slice(0);
        }).join(' ')
    }
    return (
        <div className='cart-item-container'>
            <div className='cart-item-time'>
                <h5><strong>10:30 </strong>SFO</h5>
                <h5><strong>12:30 </strong>JFK</h5>
            </div>
            <div className='cart-item-carrierInfo '>
                <img src={logo} width="50" height="50" />
                <h5>{props.item.carrier}</h5>
            </div>
            <div className='cart-item-seatNumber' >
                <h5>{props.item.display_name}</h5>
            </div>
            <div className='cart-item-seatInfo'>
                <h5>{this.formatSeat(props.item.seat_category)}</h5>
            </div>
            <div className='cart-item-priceInfo'>
                <h5>${props.item.price}</h5>
            </div>
            <div className='cart-item-deleteButton'>
                    <button className="btn btn-danger btn-md book-btn " onClick={(event) => {
                            
                            props.handleDeleteProduct(event.target.parentNode.parentNode.id);
                        }}>&times;</button>
            </div>
        </div>
    )
}
