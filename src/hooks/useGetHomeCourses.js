import { useState, useEffect } from 'react'
import coursesData from '../data/courses.json'

export default () => {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setEvents(coursesData.slice(0, 4))
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    return { events, isLoading }
}