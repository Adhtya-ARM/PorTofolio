import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import LogoS from '../../assets/images/logo-ar.png'
import LogoSubtitle from '../../assets/images/logo_aam.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => (
  <div className="nav-bar">
    <Link to="/" className="logo">
      <img src={LogoS} alt="logo" />
      <img className="sub-logo" src={LogoSubtitle} alt="Adhitya" />
    </Link>
    <nav>
      <NavLink
        exact="true" 
        activeclassname="active" 
        className="home-link"
        to="/"
      >
        <FontAwesomeIcon icon={faHouse} color="#4d4d4e" />
      </NavLink>
      <NavLink
        exact="true" 
        activeclassname="active" 
        className="about-link"
        to="/about"
      >
        <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
      </NavLink>
      <NavLink
        exact="true" 
        activeclassname="active" 
        className="contact-link"
        to="/contact"
      >
        <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
      </NavLink>
    </nav>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://adhityportofolio.my.canva.site"
        >
          <FontAwesomeIcon icon={faGlobe} color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/adhityaarie85/"
        >
          <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Adhtya-ARM"
        >
          <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/adhity_rie/"
        >
          <FontAwesomeIcon icon={faInstagram} color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/@adhityaariemahatma8788"
        >
          <FontAwesomeIcon icon={faYoutube} color="#4d4d4e" />
        </a>
      </li>
    </ul>
  </div>
)

export default Sidebar
