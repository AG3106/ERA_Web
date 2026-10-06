import { PageHeader } from '../components/motion';
import { ProjectStack, projectIntro } from '../sections/Projects';
import headerImg from '../assets/projects-header.png';

const ProjectsPage = () => (
  <>
    <PageHeader kicker="Projects" title="The builds" image={headerImg}>
      {projectIntro} Here are some of the notable ones.
    </PageHeader>
    <div className="bg-ink pt-10">
      <ProjectStack />
      <div className="h-[20vh]" />
    </div>
  </>
);

export default ProjectsPage;
