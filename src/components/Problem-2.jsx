import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button,  FormControl } from 'react-bootstrap';

const Problem2 = () => {
    const [modalAOpen, setModalAOpen] = useState(false);
    const [modalBOpen, setModalBOpen] = useState(false);
    const [modalCOpen, setModalCOpen] = useState(false);
    const [contactsA, setContactsA] = useState([]);

    const [contactsB, setContactsB] = useState([]);
    const [searchA, setSearchA] = useState('');
    const [searchB, setSearchB] = useState('');
    console.log("contactsA", contactsA);
    console.log("contactsB", contactsB);
    useEffect(() => {
        const fetchContactsA = async () => {
            try {
                const response = await axios.get('https://contact.mediusware.com/api/contacts/?page=3');
                setContactsA(response.data.results);
            } catch (error) {
                console.log('Error fetching contacts for Modal A:', error);
            }
        };

        const fetchContactsB = async () => {
            try {
                const response = await axios.get('https://contact.mediusware.com/api/country-contacts/United%20States/?page=2');
                setContactsB(response.data.results);
            } catch (error) {
                console.log('Error fetching contacts for Modal B:', error);
            }
        };

        if (modalAOpen) {
            fetchContactsA();
        } else if (modalBOpen) {
            fetchContactsB();
        }
    }, [modalAOpen, modalBOpen]);

    const openModalA = () => {
        setModalAOpen(true);
    };

    const closeModalA = () => {
        setModalAOpen(false);
    };

    const openModalB = () => {
        setModalBOpen(true);
    };

    const closeModalB = () => {
        setModalBOpen(false);
    };

    const openModalC = () => {
        setModalCOpen(true);
    };
    const closeModalC = () => {
        setModalCOpen(false);
    };

    const handleSearchA = (e) => {
        setSearchA(e.target.value);
    };

    const handleSearchB = (e) => {
        setSearchB(e.target.value);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA} >All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB} >US Contacts</button>
                  
                </div>

            </div>


            {/* Modal A */}
            <Modal show={modalAOpen} onHide={closeModalA}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal A</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Button className='mb-2' onClick={openModalA}>All Contacts</Button>
                    <Button className='ms-3 mb-2' onClick={openModalB}>US Contacts</Button>
                    <Button className='ms-2 mb-2' onClick={closeModalA}>Close</Button>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        value={searchA}
                        onChange={handleSearchA}
                    />
                    {/* Display contacts from API (filtered based on searchA and pagination) */}
                    {contactsA?.map((contact) => (
                        <div key={contact.id} className="contact-item" onClick={openModalC}>
                            {/* Display contact details */}
                            <p>Name: {contact.country.name}</p>

                        </div>
                    ))}
                </Modal.Body>
            </Modal>

            {/* Modal B */}
            <Modal show={modalBOpen} onHide={closeModalB}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal B</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={openModalA}>All Contacts</Button>
                    <Button onClick={openModalB}>US Contacts</Button>
                    <Button onClick={closeModalB}>Close</Button>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        value={searchB}
                        onChange={handleSearchB}
                    />
                    {/* Display contacts from API (filtered based on searchB and pagination) */}
                    {contactsB.map((contact) => (
                        <div key={contact.id} className="contact-item" onClick={openModalC}>
                            {/* Display contact details */}
                            <p>Number: {contact.phone}</p>
                            <p>Name: {contact.country.name}</p>

                        </div>
                    ))}
                </Modal.Body>
            </Modal>

            {/* Modal C */}
            <Modal show={modalCOpen} onHide={closeModalC}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal C</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={openModalA}>All Contacts</Button>
                    <Button onClick={openModalB}>US Contacts</Button>
                    <Button onClick={closeModalC}>Close</Button>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        value={searchB}
                        onChange={handleSearchB}
                    />
                
                    {contactsA?.map((contact) => (
                        <div key={contact.id} className="contact-item">
                            {/* Display contact details */}
                            <p>ID: {contact.id}</p>
                            <p>Name: {contact.country.name}</p>
                            <p>Phone: {contact.phone}</p>
                            

                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Problem2;
