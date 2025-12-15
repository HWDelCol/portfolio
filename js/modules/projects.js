// projects.js

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

  project.tags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "project-tag";
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  card.append(title, description, tagsContainer);
  return card;
}

export async function renderProjects(containerId, { featuredOnly = false } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  container.classList.add("projects-grid");

  const projects = await fetchJSON("data/projects.json");

  projects
    .filter(p => !featuredOnly || p.featured)
    .forEach(project => {
      container.appendChild(createProjectCard(project));
    });
}
