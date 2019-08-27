// creates express router
const router = require('express').Router();
let Contact = require('../models/contact.model');

router.route('/').get((req, res) => {
    Contact.find() // mongoose method 
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    
    // assigns request's name to a variable
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    // const birthdate = Date.parse(req.body.birthdate);

    const newContact = new Contact({ 
        name,
        address,
        phone,
        email,
        // birthdate,
    });
    
    newContact.save() // save method is a promise 
        .then(() => res.json('Contact info added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

// finds contact by ID
router.route('/:id').get((req, res) => {
    Contact.findById(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete an object by its ID
router.route('/:id').delete((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update a contact
router.route('/update/:id').post((req, res) => {
    Contact.findById(req.params.id)
        .then(contact => {
            contact.name = req.body.name;
            contact.address = req.body.address;
            contact.phone = req.body.phone;
            contact.email = req.body.email;
            // contact.birthdate = Date.parse(req.body.birthdate);
            // if(isNaN(req.body.birthdate)) { // in case of empty birthdate field that causes isNaN fiasco
            //     contact.birthdate = 0;
            // };

            contact.save()
                .then(() => res.json('Contact updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;