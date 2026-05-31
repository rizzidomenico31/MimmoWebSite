import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { projectsData } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaCloud, FaCode } from 'react-icons/fa';

const categoryIcons = {
  security: <FaShieldAlt />,
  cloud: <FaCloud />,
  dev: <FaCode />,
};

const tagColors = ['', 'tag--cyan', 'tag--magenta', 'tag--purple'];

export default function Projects() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState('all');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filters = [
    { key: 'all', label: t.projects.filterAll },
    { key: 'security', label: t.projects.filterSecurity },
    { key: 'cloud', label: t.projects.filterCloud },
    { key: 'dev', label: t.projects.filterDev },
  ];

  const filtered = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const statusClass = {
    active: 'project-status--active',
    completed: 'project-status--completed',
    progress: 'project-status--progress',
  };

  const statusLabel = {
    active: 'Active',
    completed: 'Completed',
    progress: 'In Progress',
  };

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.projects.tag}</span>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </div>

        <div className="projects-filter">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="glass-card project-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="card-top">
                  <span className="project-icon">
                    {categoryIcons[project.category]}
                  </span>
                  <span className={`project-status ${statusClass[project.status]}`}>
                    {statusLabel[project.status]}
                  </span>
                </div>

                <h3>{project.title}</h3>
                <p className="project-desc">
                  {lang === 'it' ? project.descIt : project.descEn}
                </p>

                <div className="project-tags">
                  {project.tags.map((tag, ti) => (
                    <span key={tag} className={`tag ${tagColors[ti % tagColors.length]}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      <FaGithub /> {t.projects.viewCode}
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> {t.projects.liveDemo}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
