import React from 'react'

export default (props) => {
    this.formatSeat = (string) =>{
        // console.log(string);
        // console.log(string.split('_').join(' '))
        return string.split('_').map(word=>{
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ')
    }
    return (
        <tr className="cart-item-container-item " id={props.item.product_id} key={props.item.product_id} >
            <td className="pt25 cart-item-product-id" >
                <p >{props.item.product_id}</p>
            </td>
            <td className="pt25 cart-display-name">
                {props.item.display_name}
            </td>
            <td className="pt25 tt-cpcart-seat-category">
                {this.formatSeat(props.item.seat_category)}
            </td>
            <td className="pt25 cart-price">
                ${props.item.price} 
            </td>
            <td className="pt25 cart-price">
                ${props.item.us_rate} 
            </td>
            <td className="cart-delete-btn">
                <button className="btn btn-danger btn-md book-btn mt10" onClick={(event) => {
                    // console.log(event.target.parentNode.parentNode.id);
                    props.handleDeleteProduct(event.target.parentNode.parentNode.id);
                }}>&times;</button>
            </td>
            <td></td>
        </tr>
    )
}
