import React from 'react'
import CartItem from "./CartItem/CartItem"
import airplane from "./airplane-240.png"
import "./Cart.css"
import "../../assets/css/Common.styles.css"

export default (props) => {
    
    return (
       
        <div className="cart-container" id="cart-container">

           
            <div className="cart-outer-container" > 
            {(props.cartItems.length>0)?
                                    <div>
                                        <div className='cart-container-heading'>
                                                <h4>SFO</h4>
                                                <img src={airplane} width="70" height="40" />
                                                <h4>JFK</h4>
                                        </div>
                                        {
                                            props.cartItems.map(item => (
                                            <CartItem item={item} key={item.product_id}handleDeleteProduct={props.handleDeleteProduct}/>
                                            ))
                                        }
                                        <div className='cart-container-footer'>
                                            <div className='cart-container-button'>
                                                <button className='btn btn-lg btn-success' onClick={props.handleGoBack}>
                                                    Go Back
                                                </button> 
                                                <button className='btn btn-lg btn-success' onClick={props.handleConfirmPurchase}>
                                                    Checkout
                                                </button>
                                               
                                            </div>    
                                        </div>
                                    </div> 
                                    
                                    
                                        :
                                        <div> 

                                            <div className='cart-container-heading'>
                                                <h4>Your Cart is empty</h4>
                                            </div>
                                            <div className='cart-container-footer'>
                                                    <div className='cart-container-button'>
                                                        <button className='btn btn-lg btn-success' onClick={props.handleGoBack}>
                                                            Go Back
                                                        </button> 
                                                        <button className='btn btn-lg btn-success' onClick={props.handleConfirmPurchase}>
                                                            Checkout
                                                        </button>
                                                    
                                                    </div>    
                                            </div>

                                        </div>
                }
                
            </div>
        </div>
   
    )
}
