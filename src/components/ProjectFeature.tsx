import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import MediaPlaceholder from "./MediaPlaceholder";

type Props = { project: Project; index: number };

export default function ProjectFeature({ project, index }: Props) {
  const reverse = index % 2 === 1;
  return (
    <motion.article
      className={`project-feature project-${project.theme} ${reverse ? "is-reversed" : ""}`}
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-visual">
        <span className="project-index">{project.id}</span>
        <MediaPlaceholder
          src={project.image}
          alt={project.imageAlt}
          label={project.note}
        />
        <span className="visual-caption">FIG. {project.id} — FIELD NOTES FROM THE BUILD</span>
      </div>

      <div className="project-copy">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-intro">{project.intro}</p>
        <div className="contribution">
          <span className="eyebrow">WHAT I WORKED ON</span>
          <ul>
            {project.contribution.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="tool-list">
          {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
        </div>
        <a className="text-link" href="#contact">
          Discuss this project <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}
