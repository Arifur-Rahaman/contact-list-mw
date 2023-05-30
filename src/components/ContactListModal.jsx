import React, { useCallback, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { Badge, ListGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

function ContactListModal({ setQueryParams, isLoading, error, contacts, title, next }) {
    const [show, setShow] = useState(true);
    const [isEvenSelected, setIsEvenSelected] = useState(false)
    const [contactDetails, setContactDetails] = useState(null)
    const searchInputRef = useRef(null);
    const navigate = useNavigate()
    const handleClose = () => navigate('/problem-2');

    //***Debouncing ***/
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 1000);
        };
    };

    //***Handle search input change ***/
    const handleChange = (value) => {
        setQueryParams(prev => ({ ...prev, search: value, page: 1 }))
    };
    const optimizedFn = useCallback(debounce(handleChange), []);

    //***Search value after pressing the enter***/
    const handleSubmit = (e) => {
        setQueryParams(prev => ({ ...prev, page: 1, search: searchInputRef.current.value }))
        e.preventDefault()
    }

    //***Filter data for checkbox selection***/
    const filterContacts = (contacts) => {
        if (isEvenSelected) {
            return contacts.filter(contact => contact.id % 2 === 0)
        }
        return contacts
    }


    //***Changing route when click the buttons***/
    const handleAllContactClick = () => {
        navigate('/problem-2/all-contact')
        setQueryParams(prev => ({ ...prev, page: 1, search: '' }))
        searchInputRef.current.value = ""
    }

    const handleUsContactClick = () => {
        navigate('/problem-2/us-contact')
        setQueryParams(prev => ({ ...prev, page: 1, search: '' }))
        searchInputRef.current.value = ""
    }

    return (
        <>
            {/*** Contacts List Modal***/}
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>{title || null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row g-1" style={{ marginBottom: '1.5rem' }}>
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <input
                                    onChange={(e) => optimizedFn(e.target.value)}
                                    ref={searchInputRef}
                                    placeholder="Search..."
                                    className="form-control"
                                />
                            </form>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-centern' style={{ gap: '8px', marginBottom: '2rem' }}>
                        <Button
                            style={{ backgroundColor: '#46139f', border: 'none' }}
                            onClick={handleAllContactClick}>
                            All Contact
                        </Button>
                        <Button
                            style={{ backgroundColor: '#ff7f50', border: 'none' }}
                            onClick={handleUsContactClick}
                        >
                            Us Contact
                        </Button>
                    </div>

                    <div className='d-flex justify-content-center'>
                        {isLoading ? (<Spinner animation="border" />) :
                            (<div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
                                <InfiniteScroll
                                    dataLength={contacts.length}
                                    next={() => setQueryParams(prev => ({ ...prev, page: prev.page + 1 }))}
                                    hasMore={next ? true : false}
                                    scrollableTarget="scrollableDiv"
                                    scrollThreshold={1}
                                >
                                    {
                                        error ?
                                            <h1 style={{ color: 'red' }}>{error}</h1> :
                                            contacts.length === 0 ?
                                                (<span>No data found!</span>) : (
                                                    filterContacts(contacts).map((contact) => (
                                                        <ListGroup as="ol" key={contact?.id}>
                                                            <ListGroup.Item
                                                                onClick={() => setContactDetails(contact)}
                                                                as="button"
                                                                className="d-flex justify-content-between align-items-start mb-2"
                                                            >
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{contact?.phone}</div>
                                                                    {contact?.country?.name}
                                                                </div>
                                                                <Badge bg="primary" pill>
                                                                    {contact?.id}
                                                                </Badge>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    ))
                                                )
                                    }
                                    {
                                        !next && contacts.length !== 0 && <span>End of data!</span>
                                    }
                                </InfiniteScroll>
                            </div>)}
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Form>
                        <Form.Check
                            type="checkbox"
                            id="checkboxId"
                            label="Only even"
                            onChange={() => setIsEvenSelected(prev => !prev)}
                            checked={isEvenSelected}
                        />
                    </Form>
                    <Button
                        onClick={handleClose}
                        style={{ backgroundColor: 'white', border: '1px solid #46139f', color: '#46139f' }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*** Contacts Details Modal***/}
            <Modal show={contactDetails ? true : false}>
                <Modal.Header>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {contactDetails?.phone}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setContactDetails(null)}
                        style={{ backgroundColor: 'white', border: '1px solid #46139f', color: '#46139f' }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ContactListModal