import { useState , useEffect } from 'react'
import coursesData from '../data/courses.json'

export default ({ query}) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            let filtered = [...coursesData]

            if (query?.search) {
                const search = query.search.toLowerCase()
                filtered = filtered.filter(course => 
                    course.title.toLowerCase().includes(search) ||
                    course.description.toLowerCase().includes(search)
                )
            }

            if (query?.tag?.value && query.tag.value !== '*') {
                const tag = query.tag.value.toLowerCase()
                filtered = filtered.filter(course => 
                    (course.tags && course.tags.some(t => t.toLowerCase() === tag)) ||
                    (course.category?.title && course.category.title.toLowerCase() === tag)
                )
            }

            setResults(filtered)
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [query.search, query.tag?.value])

    return { results, isLoading }
}