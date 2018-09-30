import React, { Component } from 'react'

export default class LoginPage extends Component {
    
    render() {
        return (
            <div className="login-page-container">
                <div className="page-header text-align-center">
                    <h1>Welcome</h1>
                </div>
                <div className="login-form-container ">
                    <label className="mb20">Please enter your Agent ID</label>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input id="agentID" type="text" onChange={(event) => {
                            this.props.handleAgentIDChange(event);
                        }} className="form-control" name="Agent ID" placeholder="Agent ID" />
                    </div>
                    <button className="btn btn-block btn-success mt50 btn-lg" onClick={() => {
                        this.props.handleLogin()
                    }}>Login</button>
                </div>
            </div>
        )
    }
}
