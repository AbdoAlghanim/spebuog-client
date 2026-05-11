import { useState, useEffect } from 'react'
import instructorsData from '../data/instructors.json'
import coursesData from '../data/courses.json'

export default ({ id }) => {
    const [speaker, setSpeaker] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            const foundSpeaker = instructorsData.find(s => s.slug?.current === id)
            if (foundSpeaker) {
                // Find events associated with this instructor
                const associatedEvents = coursesData.filter(c => 
                    c.instructors && c.instructors.some(inst => inst._id === foundSpeaker._id)
                )
                setSpeaker({ ...foundSpeaker, events: associatedEvents })
            } else {
                setSpeaker({})
            }
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [id])

    return { speaker, isLoading }
}