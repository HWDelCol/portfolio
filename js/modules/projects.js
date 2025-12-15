import { fetchJSON } from "../core/utils.js";

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "project-tags";

  if (Array.isArray(project.tech)) {
    project.tech.forEach(tag => {
      const span = document.createElement("span");
      span.className = "project-tag";
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });
  }

  card.append(title, description, tagsContainer);
  return card;
}

/**
 * Renderiza projetos a partir do projects.json
 *
 * @param {string} containerId
 * @param {Object} options
 * @param {boolean} options.featuredOnly
 */
export async function renderProjects(
  containerId,
  { featuredOnly = false } = {}
) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  container.classList.add("projects-grid");

  try {
    const data = await fetchJSON("data/projects.json");

    if (!data || !Array.isArray(data.projects)) {
      throw new Error("Formato inválido de projects.json");
    }

    const projects = data.projects;

    const filteredProjects = projects.filter(
      project => !featuredOnly || project.featured === true
    );

    if (filteredProjects.length === 0) {
      container.innerHTML = "<p>Nenhum projeto disponível no momento.</p>";
      return;
    }

    filteredProjects.forEach(project => {
      const card = createProjectCard(project);
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
    container.innerHTML =
      "<p>Erro ao carregar projetos. Tente novamente mais tarde.</p>";
  }
}
