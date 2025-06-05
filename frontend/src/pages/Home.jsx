import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import "./css style/home.css"

import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ImprovedFooter from '../components/common/ImprovedFooter';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
import Course_Slider from '../components/core/Catalog/Course_Slider';
import TeamSlider from '../components/core/HomePage/TeamSlider';
import CertificationSection from '../components/core/HomePage/CertificationSection';

import { getCatalogPageData } from '../services/operations/pageAndComponentData';

import { MdOutlineRateReview } from 'react-icons/md';
import { FaArrowRight } from "react-icons/fa";

import { motion } from 'framer-motion';
import { fadeIn } from './../components/common/motionFrameVarients';

import BackgroundEffect from './BackgroundEffect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';



const Home = () => {
    const [CatalogPageData, setCatalogPageData] = useState(null);
    const categoryID = "6506c9dff191d7ffdb4a3fe2";
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCatalogPageData = async () => {
            const result = await getCatalogPageData(categoryID, dispatch);
            setCatalogPageData(result);
        };
        if (categoryID) {
            fetchCatalogPageData();
        }
    }, [categoryID]);


    // increment count js code

    // let valueDisplay = document.querySelector(".count-num"),
    //     interval = 1000;

    // function value() {
    //     let startValue = 0,
    //         endValue = valueDisplay.getAttribute("data-value"),
    //         duration = Math.floor(interval / endValue);
    //     let counter = setInterval(function () {
    //         startValue += 1;
    //         valueDisplay.textContent = startValue + "+"
    //         if(startValue == endValue){
    //             clearInterval(counter)
    //         }
    //     });
    // }

    
    const learnerRef1 = useRef(null);
    const learnerRef2 = useRef(null);
    const learnerRef3 = useRef(null);

    const animateCount = (ref) => {
        if (!ref.current) return;
        let count = 0;
        const target = parseInt(ref.current.getAttribute('data-target'));
        const speed = 130; // Adjust speed as needed

        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            if (count > target) count = target;
            ref.current.innerText = count;
            if (count < target) {
                requestAnimationFrame(updateCount);
            }
        };

        updateCount();
    };

    useEffect(() => {
        animateCount(learnerRef1);
        animateCount(learnerRef2);
        animateCount(learnerRef3);
    }, []);



    return (
        <React.Fragment>
            {/* Background with Gradient and Particles */}
            <div className="relative z-0">
                <BackgroundEffect />
            </div>

            {/* Main Content above background */}
            <div className="relative z-10">
                {/* Section 1 */}
                <div id='home-welcome' className='relative h-[600px] md:h-[400px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white'>

                    <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7'
                    >
                        Welcome to
                        <HighlightText text={"Beeja "} />
                        Igniting Minds, Transforming Futures
                    </motion.div>

                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-200'
                    >
                        Embark on a seamless learning experienced with our state of the art platform. Dive into courses crafted to inspire, challenge, and empower you for success.
                    </motion.div>

                    <div className='flex flex-row gap-7 mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            Get Started
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            Learn More <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </CTAButton>
                    </div>
                </div>

                <div className='parent-count-container'>
                    <div className='count-container'>
                        <div className="increase-count">
                            <i>
                                <FontAwesomeIcon icon={faGraduationCap} />
                            </i>
                            <div className='num'>
                                <div ref={learnerRef1} className="count-num" data-target="25">0</div>
                                <div className="count-num">K+</div>
                            </div>

                            <div className='text'>Active Learners</div>
                        </div>
                    </div>

                    <div className='count-container'>
                        <div className="increase-count">
                            <i>
                                <FontAwesomeIcon icon={faGraduationCap} />
                            </i>
                            <div className='num'>
                                <div ref={learnerRef3} className="count-num" data-target="100">0</div>
                                <div className="count-num">+</div>
                            </div>
                            <div className='text'>Total Courses</div>
                        </div>
                    </div>

                    <div className='count-container'>
                        <div className="increase-count">
                            <i>
                                <FontAwesomeIcon icon={faGraduationCap} />
                            </i>
                            <div className='num'>
                                <div ref={learnerRef2} className="count-num" data-target="1200">0</div>
                                <div className="count-num">+</div>
                            </div>

                            <div className='text'>Total Students</div>
                        </div>
                    </div>
                </div>

                {/* Code Blocks */}
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={<div className='text-3xl lg:text-4xl font-semibold'>Master Coding with <HighlightText text={"Beeja's Expert-Led "} /> courses</div>}
                        subheading={"Elevate your programming skills with Beeja, where hands-on learning meets expert guidance to unlock your full coding potential."}
                        ctabtn1={{ btnText: "try it yourself", linkto: "/signup", active: true }}
                        ctabtn2={{
                            btnText: (
                                <>
                                    Learn More <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" />
                                </>
                            ),
                            link: "/signup",
                            active: false
                        }}

                        codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                        codeColor={"text-yellow-25"}
                        backgroundGradient={"code-block1-grad"}
                    />

                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={<div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">Code Instantly  <HighlightText text={"with Beeja"} /></div>}
                        subheading={"Jump right into coding at Beeja, where our interactive lessons get you building real-world projects from the very start."}
                        ctabtn1={{ btnText: "Continue Lesson", link: "/signup", active: true }}
                        ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
                        codeColor={"text-white"}
                        codeblock={`import React from \"react\";\n import CTAButton from \"./Button\";\nimport TypeAnimation from \"react-type\";\nimport { FaArrowRight } from \"react-icons/fa\";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={"code-block2-grad"}
                    />

                    <CertificationSection />

                    {/* Team Slider Section */}
                    <motion.div
                        variants={fadeIn('up', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-16 mb-8'
                    >
                        Meet Our Expert
                        <HighlightText text={" Team"} />
                    </motion.div>
                    <TeamSlider />

                    <div className='mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent'>
                        <h2 className='text-white mb-6 text-2xl'>Popular Picks for You 🏆</h2>
                        <Course_Slider Courses={CatalogPageData?.selectedCategory?.courses} />
                    </div>

                    <div className='mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent'>
                        <h2 className='text-white mb-6 text-2xl'>Top Enrollments Today 🔥</h2>
                        <Course_Slider Courses={CatalogPageData?.mostSellingCourses} />
                    </div>

                    <ExploreMore />
                </div>

                {/* Section 2 */}
                <div className='bg-pure-greys-5 text-richblack-700'>
                    <div className='homepage_bg h-[310px]'>
                        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                            <div className='h-[150px]'></div>
                            <div className='flex flex-row gap-7 text-white'>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className='flex items-center gap-3'>
                                        Explore Full Catalog <FaArrowRight />
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/signup"}>
                                    <div>Learn more <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                        <div className='flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]'>
                            <div className='text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]'>
                                Get the Skills you need for a <HighlightText text={"Job that is in demand"} />
                            </div>

                            <div className='flex flex-col gap-10 w-full lg:w-[40%] items-start'>
                                <div className='text-[16px]'>
                                    The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                </div>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div>Learn more <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></div>
                                </CTAButton>
                            </div>
                        </div>

                        <TimelineSection />
                        <LearningLanguageSection />
                    </div>
                </div>

                {/* Section 3 */}
                <div className='mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                    <InstructorSection />
                    <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
                        Reviews from other learners <MdOutlineRateReview className='text-yellow-25' />
                    </h1>
                    <ReviewSlider />
                </div>

                {/* Footer */}
                <ImprovedFooter />
            </div>
        </React.Fragment>
    );
};

export default Home;
