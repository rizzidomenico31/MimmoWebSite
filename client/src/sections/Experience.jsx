import { useLang } from '../context/LanguageContext';
import { experienceData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Experience() {
  const { t, lang } = useLang();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.experience.tag}</span>
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </div>

        <div className="timeline">
          {experienceData.map((item, i) => (
            <motion.div
              key={item.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="timeline-dot" />
              <div className="glass-card">
                <span className="timeline-date">
                  {lang === 'it' ? item.dateIt : item.dateEn}
                </span>
                <h3>{lang === 'it' ? item.titleIt : item.titleEn}</h3>
                <span className="timeline-company">{item.company}</span>
                <p className="timeline-desc">
                  {lang === 'it' ? item.descIt : item.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
