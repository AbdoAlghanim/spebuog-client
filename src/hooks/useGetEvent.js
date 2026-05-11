import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import coursesData from '../data/courses.json'

export default function useGetEvent () {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    const [event, setEvent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            const data = coursesData.find(c => c.slug?.current === params.slug)
            
            if (data) {
                setEvent(data)

                if (
                    location.pathname.startsWith('/course') && 
                    ['course_lecture', 'webinar'].includes(data.event_type)
                ) {
                    navigate(`/lecture/${data.slug?.current}`)
                } else if (
                    location.pathname.startsWith('/lecture') && 
                    ['course', 'internship'].includes(data.event_type)
                ) {
                    navigate(`/course/${data.slug?.current}`)
                }
            }
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [params.slug, location.pathname, navigate])

    return { event, isLoading}
}