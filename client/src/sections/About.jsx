import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.about.tag}</span>
          <h2 className="section-title">{t.about.title}</h2>
        </div>

        <motion.div
          className="about-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="about-image-wrapper">
            <div className="about-image-frame">
              <div className="about-image-placeholder">🛡️</div>
            </div>
          </div>

          <div className="about-info">
            <h3>
              {'>'} Domenico Rizzi
            </h3>
            <p className="about-text">{t.about.bio}</p>
            <p className="about-text">{t.about.bio2}</p>

            <div className="about-stats">
              {[
                { number: '10+', label: t.about.stats.projects },
                { number: '6+', label: t.about.stats.certs },
                { number: '3+', label: t.about.stats.experience },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="glass-card stat-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
