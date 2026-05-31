import { useLang } from '../context/LanguageContext';
import { skillsData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Skills() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.skills.tag}</span>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </div>

        <div className="skills-grid">
          {skillsData.map((cat, ci) => (
            <motion.div
              key={cat.categoryKey}
              className="glass-card skill-category"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
            >
              <h3>
                <span className="cat-icon">{cat.icon}</span>
                {t.skills.categories[cat.categoryKey]}
              </h3>
              {cat.skills.map((skill, si) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    {inView && (
                      <div
                        className="skill-fill"
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${ci * 0.15 + si * 0.1}s`,
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
