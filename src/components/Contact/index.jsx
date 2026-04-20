import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import Loader from 'react-loaders'
import { useEffect, useState, useRef } from 'react'
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef();
  const haloRef = useRef()

  const [notification, setNotification] = useState({ show: false, message: '', type: '' })

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin)
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      gsap.to(haloRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }))
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_dx9lh4n', 'template_vncmbzp', form.current,
        'SAvA-iLuQEpQ1dSL7',
      )
      .then(
        () => {
          setNotification({
            show: true,
            message: 'Pesan berhasil dikirim!',
            type: 'success'
          })
          form.current.reset()
        },
        (error) => {
          setNotification({
            show: true,
            message: 'Gagal mengirim pesan, silakan coba lagi.',
            type: 'error'
          })
          console.error('FAILED...', error.text);
        },
      );
  };



  return (
    <>
        <div className="container contact-page">
        <div className={`notification ${notification.show ? 'show' : ''} ${notification.type}`}>
          {notification.message}
        </div>
        <div className="halo" ref={haloRef}></div>
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
            <form ref={form} onSubmit={sendEmail}>
                <ul>
                <li className="half" >
                    <input type="text" name="name" placeholder="Nama" required />
                </li>
                <li className="half">
                    <input type="email" name="email" placeholder="Email" required />
                </li>
                <li>
                    <input
                    type="text"
                    name="subject"                    
                    placeholder="Subjek"
                    required
                    />
                </li>
                <li>
                    <textarea type="text" name="message" placeholder="Pesan" required></textarea>
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

export default ContactUs
