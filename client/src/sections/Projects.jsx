import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { projectsData } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaCloud, FaCode } from 'react-icons/fa';
import { FiTerminal } from 'react-icons/fi';

const categoryIcons = {
  security: <FaShieldAlt />,
  cloud: <FaCloud />,
  dev: <FaCode />,
};

const tagColors = ['', 'tag--cyan', 'tag--magenta', 'tag--purple'];

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
          <span className="terminal-title">projects.sh</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-line" style={{ animationDelay: '0s' }}>
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">ls ./projects</span>
          </div>
          <div className="terminal-line" style={{ animationDelay: '0.3s' }}>
            <span className="terminal-output">
              {lang === 'it'
                ? '// nessun progetto trovato — lavori in corso...'
                : '// no projects found — work in progress...'}
            </span>
          </div>
          <div className="terminal-line" style={{ animationDelay: '0.6s' }}>
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">git status</span>
          </div>
          <div className="terminal-line" style={{ animationDelay: '0.9s' }}>
            <span className="terminal-success">
              {lang === 'it'
                ? 'On branch main — nuovi progetti in arrivo presto.'
                : 'On branch main — new projects coming soon.'}
            </span>
          </div>
          <span className="terminal-cursor" />
        </div>
      </div>
    </motion.div>
  );
}

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

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.projects.tag}</span>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </div>

        {projectsData.length > 0 && (
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
        )}

        {filtered.length === 0 ? (
          <EmptyState lang={lang} />
        ) : (
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
        )}
      </div>
    </section>
  );
}
