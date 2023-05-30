import axios from 'axios'
import React, { useEffect, useState } from 'react'
const baseURL = 'https://contact.mediusware.com'

function useFetchContacts({ country, queryParams}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [contacts, setContacts]  = useState([])
    const [next, setNext] = useState(null)

    //***Modify URL according to the params and query params***/
    const modifyURL = (country, queryParams) => {
        let url = baseURL

        //Update url according to the country
        if (!country || country === 'all') {
            url = `${url}/api/contacts/`
        }
        else {
            url = `${url}/api/country-contacts/${country}/`
        }

        //Looping over params object and updating url for truthy param
        for (let param in queryParams) {
            if(queryParams[param]){
                if(url.includes('?')){
                    url = `${url}&${param}=${queryParams[param]}`
                }
                else{
                    url = `${url}?${param}=${queryParams[param]}`
                }
            }
        }
        return url
    }

    // ***Get contacts***
    useEffect(() => {
        (async () => {
            const url = modifyURL(country, queryParams)
            setIsLoading(true)
            try {
                const {data} = await axios.get(url)
                setIsLoading(false)
                setContacts(data?.results)
                setNext(data?.next)
            } catch (error) {
                setIsLoading(false)
                setError('Error!')
            }
        })();
    }, [country, queryParams])

  return { isLoading, error, contacts, next}
}

export default useFetchContacts