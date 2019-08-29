import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// allows frontend data to be transferred into backened database
import axios from 'axios';

export default class EditContact extends Component {
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

    // auto-fill fields with current information to avoid retyping everything
    componentDidMount() {
        axios.get('http://localhost:5000/contacts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    phone: response.data.phone,
                    email: response.data.email,
                })
            })
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
            birthdate: this.state.birthdate,
        }

        // sends user data to backend
        axios.post('http://localhost:5000/contacts/update/' + this.props.match.params.id, contact)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));
        
        // once submitted, takes user back to contacts list
        window.location = '/';
    }

    render() {
        return (
            <div>
            <h3>Edit Contact List</h3>
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
                <input type="text"
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
                <input type="submit" value="Update Contact" className="btn btn-primary" />
              </div>
              <div className="form-group">
                <button variant="secondary" className="btn btn-primary" href="http://localhost:5000/contacts">Cancel</button>
              </div>
            </form>
          </div>
        );
    };
};