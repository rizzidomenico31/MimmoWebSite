import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { FiMenu, FiX } from 'react-icons/fi';

const navKeys = ['about', 'skills', 'projects', 'experience', 'certs', 'contact'];

export default function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    navKeys.forEach((key) => {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#" className="navbar-logo">
          DR<span>.</span>
        </a>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navKeys.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className={activeSection === key ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
          <li>
            <button className="lang-switch" onClick={toggleLang}>
              {lang === 'it' ? '🇬🇧 EN' : '🇮🇹 IT'}
            </button>
          </li>
          {menuOpen && (
            <li>
              <button
                className="lang-switch"
                onClick={() => setMenuOpen(false)}
                style={{ marginTop: '20px' }}
              >
                <FiX /> Close
              </button>
            </li>
          )}
        </ul>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
