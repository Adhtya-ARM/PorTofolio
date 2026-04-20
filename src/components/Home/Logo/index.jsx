import './index.scss'
import LogoS from '../../../assets/images/logo-ar.png'
import { useRef, useEffect } from 'react'
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const Logo = () => {
  const bgRef = useRef()
  const outlineLogoRef = useRef([])
  const solidLogoRef = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to(bgRef.current, {
        duration: 1,
        opacity: 1,
      })
      .from(outlineLogoRef.current, {
        drawSVG: 0,
        duration: 3,
        stagger: 0.2,
        ease: 'power2.inOut',
      }, "-=0.5")
      .to(solidLogoRef.current, {
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut',
      }, "-=2.5")
    }, bgRef)

    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 40
      const yPos = (clientY / window.innerHeight - 0.5) * 40

      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="logo-container" ref={bgRef}>
      <img ref={solidLogoRef} className="solid-logo" src={LogoS} alt="Logo" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        height="500"
        viewBox="0 0 375 374.999991"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
      >
        <g className="svg-container">
          <path
            ref={(el) => (outlineLogoRef.current[0] = el)}
            d="M 147.332031 59.957031 L 0.0078125 315.042969 L 212.046875 315.042969 L 186.046875 270.015625 L 78.003906 270.015625 L 147.238281 150.007812 L 242.472656 315.042969 L 294.5625 315.042969 Z M 147.332031 59.957031 "
            fill="none"
            stroke="yellow"
            strokeWidth="2"
          />
        </g>

        <g>
          <path
            ref={(el) => (outlineLogoRef.current[1] = el)}
            d="M 165.605469 59.957031 L 191.605469 104.984375 L 285.046875 104.984375 C 310.765625 104.984375 330.074219 124.292969 330.074219 150.007812 C 330.074219 175.726562 310.765625 195.035156 285.046875 195.035156 L 243.601562 195.035156 L 244.167969 196.070312 L 269.503906 240.0625 L 312.835938 315.042969 L 364.832031 315.042969 L 317.921875 233.84375 C 351.363281 220.75 375.007812 188.253906 375.007812 150.007812 C 375.007812 100.085938 334.878906 59.957031 284.953125 59.957031 Z M 165.605469 59.957031 "
            fill="none"
            stroke="yellow"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  )
}

export default Logo
