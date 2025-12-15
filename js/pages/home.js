import { renderProjects } from "../modules/projects.js";
import { highlightActiveLink } from "../modules/navigation.js";

renderProjects("projects-container", { featuredOnly: true });
highlightActiveLink();