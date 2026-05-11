import { useState, useEffect } from 'react'
import coursesData from '../data/courses.json'

export default ({
    eventID,
    tags,
    categoryID,
    type
}) => {
    const [related, setRelated] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            let filtered = coursesData.filter(c => c._id !== eventID)
            
            // Simple logic for related events: same category or matching tags
            filtered = filtered.filter(c => 
                c.category === categoryID || 
                (c.tags && tags && tags.some(tag => c.tags.includes(tag))) ||
                c.event_type === type
            )

            setRelated(filtered.slice(0, 5))
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [eventID, tags, categoryID, type])

    return { related, isLoading }
}