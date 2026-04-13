import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import Loader from 'react-loaders'
import { useEffect, useState } from 'react'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [formData,setFormData] = useState({name: '', email: '', subject: '', message: ''})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const sendEmail = (e) => {
    e.preventDefault()
    
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
        <div className="container contact-page">
        <div className="text-zone">
            <h1>
            <AnimatedLetters
                letterClass={letterClass}
                strArray={['C', 'O', 'N', 'T', 'A', 'C', 'T', ' ', 'M', 'E', '!']}
                idx={15}
            ></AnimatedLetters>
            </h1>
            <p>
            Saya terbuka untuk freelance, khususnya berupa proyek pengembangan web
            dan jasa desain. Apabila Anda memiliki kebutuhan atau pertanyaan lain,
            silakan untuk menghubungi saya melalui formulir yang tersedia.
            </p>
            <div className="contact-form">
            <form onSubmit={sendEmail}>
                <ul>
                <li className="half" >
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" required />
                </li>
                <li className="half">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </li>
                <li>
                    <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subjek"
                    required
                    />
                </li>
                <li>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder='Pesan' required></textarea>
                </li>
                <li>
                    <input type="submit" className="flat-button" value="KIRIM" />
                </li>
                </ul>
            </form>
            </div>
        </div>
        </div>
        <Loader type="pacman" />
    </>
  )
}

export default Contact
