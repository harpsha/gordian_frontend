import React from 'react'
import CartItem from "./CartItem"
export default (props) => {
    // console.log("cart component",window.cartItems);
    return (
        <div className="cart-container mb90 mt30" id="cart-container">
            <h1>Your Cart</h1>
            <table className="table table-hover flight-container ml20 mr20 mt20 mb20">
                <thead>
                    <tr>
                        <th className="table-row-text text-align-center">Product Id</th>
                        <th className="table-row-text text-align-center">Seat</th>
                        <th className="table-row-text text-align-center">Class</th>
                        <th className="table-row-text text-align-center">Price</th>
                        <th className="table-row-text text-align-center">Total Price</th>
                        <th className="table-row-text text-align-center">Remove Item</th>
                     </tr>
                </thead>
                <tbody>
                    {
                        props.cartItems.map(item => (
                            <CartItem item={item} key={item.product_id}handleDeleteProduct={props.handleDeleteProduct}/>
                        ))
                    }
                </tbody>
            </table>
            <button className='btn btn-lg btn-success' onClick={props.handleConfirmPurchase}>Proceed to Checkout</button>
        </div>
    )
}
