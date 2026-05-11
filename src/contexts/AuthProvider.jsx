import React, { useState } from 'react'
import UserContext from './UserContext'
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

import arabic from '../data/ar.json'
import english from '../data/en.json'

const AuthProvider = (props) => {
    const [user, setUser] = useState({})
    const [notifications, setNotification] = useState([])
    const [language, setLanguage] = useState(arabic)

    const toggleLanguage = () => {
        if (language === arabic) {
          setLanguage(english)
        } else {
          setLanguage(arabic)
        }
      }

    const client = sanityClient({
        projectId: 'ipkqajpo', // q6fpo8mv
        dataset: 'production',
        apiVersion: '2021-10-21',
        useCdn: true,
    })

    const builder = imageUrlBuilder({
        baseUrl: 'https://ipkqajpo.api.sanity.io', // https://q6fpo8mv.api.sanity.io
        projectId: 'ipkqajpo', // q6fpo8mv
        dataset: 'production',
        useCdn: true,
    })

    const urlFor = (source) => {
        const _url = (typeof source === 'string') ? source : (source?.asset?.url || '');
        
        const builderMock = {
            width: () => builderMock,
            height: () => builderMock,
            url: () => _url,
            toString: () => _url,
        };

        if (typeof source === 'string' || source?.asset?.url) {
            return builderMock;
        }

        try {
            return builder.image(source)
        } catch (e) {
            return builderMock;
        }
    }

    const filterEventsByQuery = (events, q) => {
        let query = q.toLowerCase()
        return events.filter(event => (
            event.title.toLowerCase().includes(query) ||
            event.description?.toLowerCase().includes(query)
        ))
    }

    const filterEventsByTag = (events, tag) => {
        if (tag === 'all') return events
        return events.filter(event => (
            event.tags.includes(tag)
        ))
    }

    const filterById = (group, id) => {
        return group.find(item => item.id === id)
    }

    const value = {
        client,
        filterEventsByQuery,
        filterEventsByTag,
        filterById,
        user,
        setUser,
        notifications,
        setNotification,
        urlFor,
        language,
        toggleLanguage,
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default AuthProvider