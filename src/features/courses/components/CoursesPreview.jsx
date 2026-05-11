import React, { useState, useEffect } from 'react'
import { Flex, Divider, Text, useBreakpointValue, LinkBox, LinkOverlay } from '@chakra-ui/react'
import Course from './Course'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css'

import useGetCoursesPreview from '../../../hooks/useGetCoursesPreview'

const CoursesPreview = () => {
    const responsiveSlides = useBreakpointValue({ base: 'auto', lg: 3, xl: 4})
    const centeredSlides = useBreakpointValue({ base: true, lg: false })
    const initialSlide = useBreakpointValue({ base: 1, md: 0 })

    const {categories, isLoading } = useGetCoursesPreview()

    const nullSlides = [...Array(4)].map((_, key) => (
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }} key={key}>
            <Course loading={true} />
        </SwiperSlide>
    ))

    return (
        (isLoading ? [...Array(3)] : categories).map((category, idx) => (
            !isLoading && !category?.children?.length ? '' :
            <Flex 
                key={idx}
                flexDir="column" 
                gap="1.5em" 
                mt="1.5em"
                w="100%"
            >
                <Text 
                    fontSize="20px" 
                    fontWeight="bold"
                    lineHeight="24px"
                    px={{ base: "1em", lg: "0" }}
                >{category?.title}</Text>
                <Flex flexDir="row" gap="3em">
                    <Flex w="100%" align="center">
                        <Swiper
                            speed={300}
                            slidesPerView={responsiveSlides}
                            slidesPerGroup={1}
                            centeredSlides={centeredSlides}
                            initialSlide={initialSlide}
                            spaceBetween={20}
                            style={{ width: '100%', padding: '10px 0' }}
                        >
                        {isLoading ? nullSlides : category.children?.map((event, idx) => (
                            <SwiperSlide 
                                key={idx} 
                                style={{ 
                                    display: "flex", 
                                    justifyContent: "center",
                                    width: responsiveSlides === 'auto' ? '85%' : 'auto',
                                    maxWidth: '350px',
                                }}
                            >
                                 <LinkBox w="100%"><LinkOverlay href={`/${["course_lecture", "webinar"].includes(event.event_type) ? "lecture" : "course"}/${event.slug?.current}`}>
                                    <Course 
                                        course={event} 
                                        w="100%"
                                    />
                                </LinkOverlay></LinkBox>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </Flex>
                </Flex>
                <Divider mt="1em" display={idx === categories.length-1 ? 'none' : ''} />
            </Flex>
        ))
    )
}

export default CoursesPreview