import React, { useState } from 'react'
import useFetchContacts from '../hooks/useFetchContacts'
import ContactListModal from './ContactListModal'
function UsContact() {
    const [queryParams, setQueryParams] = useState({ page: 1, page_size: 10, search: '' })
    const { isLoading, error, contacts, next } = useFetchContacts({ country: 'United States', queryParams })
    return (
        <ContactListModal
            title={'US Contact'}
            setQueryParams={setQueryParams}
            isLoading={isLoading}
            error={error}
            contacts={contacts}
            next={next}
        />
    )
}

export default UsContact