import { useState, useEffect } from 'react'
import instructorsData from '../data/instructors.json'

export default ({
    searchQuery,
    filterPosition,
    sortOrder
}) => {
    const [speakers, setSpeakers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            let filtered = [...instructorsData]

            if (searchQuery) {
                filtered = filtered.filter(instructor => 
                    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    instructor.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    instructor.organization.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }

            if (filterPosition) {
                filtered = filtered.filter(instructor => 
                    instructor.position.toLowerCase().includes(filterPosition.toLowerCase()) ||
                    instructor.organization.toLowerCase().includes(filterPosition.toLowerCase())
                )
            }

            // sortOrder logic can be added here if needed, but for hardcoded it's simple
            
            setSpeakers(filtered)
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery, filterPosition, sortOrder])

    return { speakers, isLoading }
}