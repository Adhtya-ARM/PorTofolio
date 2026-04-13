import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import LogoTitle from '../../assets/images/logo-ar.png'
import Logo from './Logo'
import './index.scss'
import Loader from 'react-loaders'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const blkArray = ['i', 'e', ' ', 'M', 'a', 'h', 'a', 't', 'm', 'a']
  const dpnArray = [' A', 'd', 'h', 'i', 't', 'y', 'a']
  const jobArray = ['W','e','b',' ','D','e','v','e','l','o','p','e','r','.']

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  //ini tidak dimasukan dalam return, menurut AI
  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i</span>
            <span className={`${letterClass} _13`}>, </span>
            <br />
            <span className={`${letterClass} _14`}>I</span>
            <span className={`${letterClass} _15`}>'</span>
            <span className={`${letterClass} _16`}>m</span>
            <span className={`${letterClass} _17`}> </span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={dpnArray}
              idx={18}
            />
            <img src={LogoTitle} alt="developer" />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={blkArray}
              idx={29}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={37}
            />
          </h1>
          <h2> Data Analyst / Machine Learning Enthusiast</h2>
          <br />
          <Link to="/contact" className="flat-button">
            Ayo Ngobrol
          </Link>
        </div>
        <Logo />
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Home
