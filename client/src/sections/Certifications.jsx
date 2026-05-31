import { useLang } from '../context/LanguageContext';
import { certificationsData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Certifications() {
  const { t, lang } = useLang();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="section" id="certs" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.certs.tag}</span>
          <h2 className="section-title">{t.certs.title}</h2>
          <p className="section-subtitle">{t.certs.subtitle}</p>
        </div>

        <div className="certs-grid">
          {certificationsData.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="glass-card cert-card"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="cert-icon">{cert.icon}</span>
              <h3>{cert.name}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-date">
                {lang === 'it' ? cert.dateIt : cert.dateEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
