import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faFigma } from '@fortawesome/free-brands-svg-icons'
import './FigmaModal.scss'

const FigmaModal = ({ isOpen, onClose, figmaUrl }) => {
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

  // Convert raw Figma URL to embed URL if needed
  const getEmbedUrl = (url) => {
    if (!url) return ''
    if (url.includes('figma.com/embed')) return url
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
  }

  const embedUrl = getEmbedUrl(figmaUrl)

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
            <span>Figma Project Preview</span>
          </div>
          <div className="modal-actions">
            {figmaUrl && (
              <a
                href={figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="modal-external-link"
                title="Buka langsung di Figma"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            )}
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

        <div className="figma-modal-body">
          {figmaUrl ? (
            <iframe
              title="Figma Project Preview"
              src={embedUrl}
              allowFullScreen
              className="figma-iframe"
            />
          ) : (
            <div className="figma-empty-state">
              <FontAwesomeIcon icon={faFigma} className="empty-icon" />
              <h3>Pratinjau Proyek Figma</h3>
              <p>
                Popup modal preview Figma sudah siap. Berikan link proyek
                Figma kamu agar preview langsung ditampilkan di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default FigmaModal

