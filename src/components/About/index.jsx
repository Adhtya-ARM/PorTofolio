import './index.scss'
import { useEffect, useState, useRef } from 'react'
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCss,
  faHtml5,
  faJava,
  faJs,
  faPhp,
  faPython,
  faLaravel,
  faNodeJs,
} from '@fortawesome/free-brands-svg-icons'
import figmaIcon from '../../assets/images/figma-icon.svg'
import photoshopIcon from '../../assets/images/Adobe_Photoshop_CC_icon.svg'
import dataAnalyticsIcon from '../../assets/images/data-analytics-icon.svg'
import neuralNetworkIcon from '../../assets/images/neural-network-icon.svg'
import Loader from 'react-loaders'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const haloRef = useRef()
  const cubeContainerRef = useRef()

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin)
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 5000)

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      
      // Moving halo effect (cursor follower)
      gsap.to(haloRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Parallax effect for cubes (matching home logo)
      const xPos = (clientX / window.innerWidth - 0.5) * 60
      const yPos = (clientY / window.innerHeight - 0.5) * 60

      gsap.to(cubeContainerRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.2,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="halo" ref={haloRef}></div>
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'B', 'O', 'U', 'T', ' ', 'M', 'E', '!']}
              idx={15}
            />
          </h1>
          <p>
            Sarjana Teknik Informatika berpengalaman dalam pengembangan web dan
            Deep Learning dengan minat utama sebagai Data Analyst, Web
            Developer, dan pengembang Machine Learning.
          </p>
          <p>
            Memiliki kemampuan analitis tajam, teliti, adaptif, serta mampu
            berkolaborasi efektif dalam satu tim untuk merancang solusi inovatif
            berbasis data.
          </p>
          <p>
            Kombinasi keahlian teknis dan kepribadian proaktif menjadikan saya
            siap memberikan kontribusi signifikan di bidang teknologi informasi.
          </p>
        </div>
        <div className="stage-cube-container" ref={cubeContainerRef}>
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faPhp} color="#DD0031" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faJs} color="#EFD81D" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faPython} color="#4B8BBE" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faJava} color="#5382A1" />
            </div>
          </div>
          <div className="cubespinner">
            <div className="face1">
              <img src={neuralNetworkIcon} alt="Neural Network" />
            </div>
            <div className="face2">
              <img src={dataAnalyticsIcon} alt="Data Analytics" />
            </div>
            <div className="face3">
              <img src={photoshopIcon} alt="Photoshop" />
            </div>
            <div className="face4">
              <img src={figmaIcon} alt="Figma" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faNodeJs} color="#3C873A" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faLaravel} color="red" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}
export default About
