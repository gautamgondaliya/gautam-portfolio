import { featuredProjects, workProjects } from "@/utils/data/projects-data";
import SectionHeading from "../../helper/section-heading";
import ProjectCard from "./project-card";

function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        number="01"
        eyebrow="Featured work"
        title="AI products I built and shipped, end to end."
        description="Both are live. Both are solo builds: agent design, retrieval, backend, frontend and infrastructure. The decisions below are the ones I would defend in a design review."
      />

      <div className="space-y-10">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} variant="featured" index={i} />
        ))}
      </div>

      <div className="mt-24">
        <SectionHeading
          number="02"
          eyebrow="At scale"
          title="Production systems built for clients."
          description="Platforms I architected and built at SDLC Corp, where traffic spikes and payment correctness were the hard problems."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {workProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} variant="compact" delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
