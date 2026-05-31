import { useLang } from '../context/LanguageContext';
import { useTypewriter } from '../hooks/useTypewriter';
import ParticleNetwork from '../components/ParticleNetwork';
import { motion } from 'framer-motion';

export default function Hero() {
  const { t } = useLang();
  const { displayedLines, done } = useTypewriter(t.hero.lines);

  return (
    <section className="hero" id="hero">
      <ParticleNetwork />
      <div className="scan-line" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="hero-terminal">
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot--red" />
            <span className="terminal-dot terminal-dot--yellow" />
            <span className="terminal-dot terminal-dot--green" />
            <span className="terminal-title">{t.hero.terminalTitle}</span>
          </div>
          <div className="terminal-body">
            {displayedLines.map((line, i) => (
              <div
                key={i}
                className="terminal-line"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className={`terminal-${line.type}`}>{line.text}</span>
                {!line.done && <span className="terminal-cursor" />}
              </div>
            ))}
            {done && <span className="terminal-cursor" />}
          </div>
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="hero-buttons">
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); history.pushState(null, '', '/'); }}
              >
                {t.hero.btnProjects}
              </a>
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); history.pushState(null, '', '/'); }}
              >
                {t.hero.btnContact}
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
