import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ContactsList from "./components/contacts-list.component";
import EditContact from "./components/edit-contact.component";
import CreateContact from "./components/create-contact.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ContactsList} />
        <Route path="/edit/:id" component={EditContact} />
        <Route path="/create" component={CreateContact} />
      </div>
    </Router>
  );
}

export default App;
