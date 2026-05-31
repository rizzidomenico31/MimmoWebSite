import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.contact.tag}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <motion.div
          className="contact-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-info">
            <h3>{'>'} {t.contact.infoTitle}</h3>
            <p>{t.contact.infoText}</p>

            <div className="contact-links">
              <a href="mailto:info@mimmorizzi.com" className="contact-link-item">
                <FaEnvelope className="link-icon" />
                info@mimmorizzi.com
              </a>
              <a href="https://github.com/rizzidomenico31" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <FaGithub className="link-icon" />
                github.com/rizzidomenico31
              </a>
              <a href="https://www.linkedin.com/in/domenico-rizzi/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <FaLinkedin className="link-icon" />
                linkedin.com/in/domenico-rizzi
              </a>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t.contact.labelName}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t.contact.labelEmail}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t.contact.labelSubject}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t.contact.labelMessage}</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={sending}>
              <FaPaperPlane />
              {sending ? t.contact.btnSending : t.contact.btnSend}
            </button>

            {status === 'success' && (
              <div className="form-status form-status--success">{t.contact.successMsg}</div>
            )}
            {status === 'error' && (
              <div className="form-status form-status--error">{t.contact.errorMsg}</div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
