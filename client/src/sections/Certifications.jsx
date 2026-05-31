import { useLang } from '../context/LanguageContext';
import { certificationsData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function EmptyState({ lang }) {
  return (
    <motion.div
      className="projects-empty"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="projects-empty-terminal">
        <div className="terminal-header">
          <span className="terminal-dot terminal-dot--red" />
          <span className="terminal-dot terminal-dot--yellow" />
          <span className="terminal-dot terminal-dot--green" />
          <span className="terminal-title">certifications.sh</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-line" style={{ animationDelay: '0s' }}>
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">ls ./certifications</span>
          </div>
          <div className="terminal-line" style={{ animationDelay: '0.3s' }}>
            <span className="terminal-output">
              {lang === 'it'
                ? '// nessuna certificazione trovata — esami in preparazione...'
                : '// no certifications found — exams in preparation...'}
            </span>
          </div>
          <div className="terminal-line" style={{ animationDelay: '0.6s' }}>
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">cat study_plan.txt</span>
          </div>
          <div className="terminal-line" style={{ animationDelay: '0.9s' }}>
            <span className="terminal-success">
              {lang === 'it'
                ? 'Certificazioni in arrivo — stay tuned.'
                : 'Certifications incoming — stay tuned.'}
            </span>
          </div>
          <span className="terminal-cursor" />
        </div>
      </div>
    </motion.div>
  );
}

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

        {certificationsData.length === 0 ? (
          <EmptyState lang={lang} />
        ) : (
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
        )}
      </div>
    </section>
  );
}
