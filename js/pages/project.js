import { fetchJSON } from "../core/utils.js";

const container = document.getElementById("project-detail");

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

if (!projectId) {
  container.innerHTML = "<p>Projeto não encontrado.</p>";
  throw new Error("ID do projeto ausente");
}

async function loadProject() {
  const data = await fetchJSON("data/projects.json");
  const project = data.projects.find(p => p.id === projectId);

  if (!project) {
    container.innerHTML = "<p>Projeto não encontrado.</p>";
    return;
  }

  container.innerHTML = `
    <h1>${project.title}</h1>
    <p>${project.long_description}</p>

    <h3>Tecnologias</h3>
    <ul>
      ${project.tech.map(t => `<li>${t}</li>`).join("")}
    </ul>

    <div class="project-actions">
      ${project.repository ? `<a href="${project.repository}" target="_blank">GitHub</a>` : ""}
    </div>
  `;
}

loadProject();
