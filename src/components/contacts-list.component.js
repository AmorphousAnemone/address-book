import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional react component
// lack of state and lifecycle methods
// used when accepting props and returning JSX; simple component
// this particular component is small so it can be placed in another component
const Contact = (props) => (
    <tr>
        <td>{props.contact.name}</td>
        <td>{props.contact.address}</td>
        <td>{props.contact.phone}</td>
        <td>{props.contact.email}</td>
        {/* <td>{props.contact.birthdate.substring(0,10)}</td> */}
        <td>
            <Link to={ "/edit/" + props.contact._id }>edit</Link> | <a href="#" onClick={() => { props.deleteContact(props.contact._id) }}>delete</a>
        </td>
    </tr>
)

// class component
export default class ContactsList extends Component {
    constructor(props) {
        super(props);

        this.deleteContact = this.deleteContact.bind(this);

        this.state = { contacts: [] }
    }

    // get list of contacts from database
    componentDidMount() {
        axios.get('http://localhost:5000/contacts/')
            .then(response => {
                // gets the array of contacts and assigns to contacts
                this.setState({ contacts: response.data }) 
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteContact(id) {
        axios.delete('http://localhost:5000/contacts/' + id)
            .then(res => console.log(res.data));
        
        // update the list to display every contact except the deleted item
        this.setState({
            contacts: this.state.contacts.filter(el => el._id !== id)
        })

        alert("Contact Deleted!");
    }

    contactList() {
        return this.state.contacts.map(currentcontact => {
          return <Contact contact={currentcontact} deleteContact={this.deleteContact} key={currentcontact._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Contacts</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            {/* <th>Birthdate</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        { this.contactList() }
                    </tbody>
                </table>
            </div>
        );
    };
};