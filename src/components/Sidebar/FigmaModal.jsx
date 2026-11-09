import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faFigma } from '@fortawesome/free-brands-svg-icons'
import './FigmaModal.scss'

// Daftar 4 Proyek Portofolio Figma kamu
const defaultFigmaProjects = [
  {
    id: 'tpq',
    title: 'SI TPQ Ar-Rahman',
    url: 'https://www.figma.com/proto/36evZKYoWQQ3mx6ilaylmE/TPQ-Ar-Rahman?node-id=1-671&t=XWu9ziJzLuh2dkav-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A671&show-proto-sidebar=1',
  },
  {
    id: 'tiket-bus',
    title: 'Aplikasi Tiket Bus',
    url: 'https://www.figma.com/proto/vXmUmKEekbASiuIFEI8MUg/Aplikasi-Tiket-Bus?node-id=4-329&t=FpmHRq0rFcRSq2iH-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A329',
  },
  {
    id: 'manganime',
    title: 'Design Ui Manganime',
    url: 'https://www.figma.com/proto/Mdn0wUlC3MQ8fwYxei7Nlb/Design-Ui-Manganime?node-id=10-5&t=kx8EXkBE8lyg9Hyt-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A5&show-proto-sidebar=1',
  },
  {
    id: 'wedding',
    title: 'Wedding Organizer Web',
    url: 'https://www.figma.com/proto/z7I8UYmHtKZHYmTZsJAUoQ/Wedding-Organizer-Web?node-id=1-29&p=f&t=L3RNeEGAXYcJCc6n-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A29',
  },
]

const FigmaModal = ({ isOpen, onClose, projects = defaultFigmaProjects }) => {
  const [activeProject, setActiveProject] = useState(projects[0])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Fungsi pembantu: Mengubah URL desain Figma menjadi format resmi Embed Figma
  const getEmbedUrl = (url) => {
    if (!url) return ''
    if (url.includes('figma.com/embed')) return url
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
  }

  return createPortal(
    <div className="figma-modal-overlay" onClick={onClose}>
      <div
        className="figma-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="figma-modal-header">
          <div className="modal-title">
            <FontAwesomeIcon icon={faFigma} className="figma-icon-title" />
            <span>Portofolio Desain Figma</span>
          </div>
          <div className="modal-actions">
            <a
              href={activeProject.url}
              target="_blank"
              rel="noreferrer"
              className="modal-external-link"
              title={`Buka ${activeProject.title} langsung di Figma`}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Tutup Preview"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* Tab navigasi untuk memilih di antara 4 proyek Figma */}
        <div className="figma-modal-tabs">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`tab-btn ${activeProject.id === project.id ? 'active' : ''}`}
              onClick={() => setActiveProject(project)}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Area Preview iFrame Figma */}
        <div className="figma-modal-body">
          <iframe
            key={activeProject.id}
            title={activeProject.title}
            src={getEmbedUrl(activeProject.url)}
            allowFullScreen
            className="figma-iframe"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default FigmaModal

