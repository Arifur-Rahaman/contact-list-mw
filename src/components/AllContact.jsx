import React from 'react';
import { useState } from 'react';
import useFetchContacts from '../hooks/useFetchContacts';
import ContactListModal from './ContactListModal';
function AllContact() {
    const [queryParams, setQueryParams] = useState({ page: 1, page_size: 10, search: '' })
    const { isLoading, error, contacts, next } = useFetchContacts({ country: 'all', queryParams })
    return (
        <ContactListModal
            title={'All Contact'}
            setQueryParams={setQueryParams}
            isLoading={isLoading}
            error={error}
            contacts={contacts}
            next={next}
        />
    )
}

export default AllContact