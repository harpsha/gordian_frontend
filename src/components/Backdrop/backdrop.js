import React, { Component} from 'react'

import  './backdrop.css'

class Backdrop extends Component {

    state = {
        checkAdBlock : false,
    }

    render(){
            return(
                this.props.show ? 
                        <div className='backdrop' >
                            <div className='backdrop-text'>
                                <h1>Seems like you are using Ad Blocker</h1>
                                <p>Sadly we need to ask you to turn it off to continue to the site.
                                <br/>We promise we won't show you annoying ads</p>
                                <div className='button-div'>
                                <button onClick={this.props.clickedthis} >I have disabled</button>
                                </div>
                            </div>
                        </div> : null
            )
        }   


}
export default Backdrop

