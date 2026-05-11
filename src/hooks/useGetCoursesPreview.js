import { useState, useEffect } from 'react'
import coursesData from '../data/courses.json'

export default () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            const grouped = coursesData.reduce((acc, course) => {
                const catTitle = course.category?.title || 'Others'
                if (!acc[catTitle]) {
                    acc[catTitle] = {
                        title: catTitle,
                        description: `${catTitle} courses and lectures`,
                        children: []
                    }
                }
                acc[catTitle].children.push(course)
                return acc
            }, {})

            setCategories(Object.values(grouped))
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    return { categories, isLoading }
}
