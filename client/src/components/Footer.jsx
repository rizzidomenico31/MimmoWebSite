import { useLang } from '../context/LanguageContext';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="footer-copy">{t.footer.copy}</p>
        <div className="footer-socials">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:domenico.rizzi@email.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
