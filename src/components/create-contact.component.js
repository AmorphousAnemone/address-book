import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// allows frontend data to be transferred into backend database
import axios from 'axios';

export default class CreateContact extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            phone: '',
            email: '',
            birthdate: new Date(),
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeBirthdate(birthdate) {
        this.setState({
            birthdate: birthdate
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const contact = { 
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email,
            birthdate: this.state.birthdate.toLocaleDateString('en-US'),
        }

        // sends user data to backend
        axios.post('http://localhost:5000/contacts/add', contact)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));
        
        // once submitted, takes user back to contacts list
        window.location = '/';
    }

    render() {
        return (
            <div>
            <h3>Create New Contact</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Name: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
              </div>
              <div className="form-group">
                <label>Address: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    />
              </div>
              <div className="form-group">
                <label>Phone: </label>
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    />
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
              </div>
              <div className="form-group">
                <label>Birthdate: </label>
                <div>
                  <DatePicker
                    selected={this.state.birthdate}
                    onChange={this.onChangeBirthdate}
                  />
                </div>
              </div>
              <div className="form-group">
                <input type="submit" value="Create Contact" className="btn btn-primary" />
              </div>
            </form>
          </div>
        );
    };
};