// Carregar tarefas do localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Salvar tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Adicionar tarefa
function adicionarTarefa() {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const prioridade = document.getElementById("prioridade").value;

  if (!titulo) {
    alert("Digite o título da tarefa!");
    return;
  }

  const tarefa = {
    titulo,
    descricao,
    prioridade,
    concluida: false,
    criadaEm: new Date().toLocaleString()
  };

  tarefas.push(tarefa);
  salvarTarefas();
  renderizarTarefas();

  // Limpar inputs
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("prioridade").value = "baixa";
}

// Concluir/desmarcar tarefa
function concluirTarefa(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvarTarefas();
  renderizarTarefas();
}

// Remover tarefa
function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  renderizarTarefas();
}

// Renderizar lista de tarefas
function renderizarTarefas() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  if (tarefas.length === 0) {
    lista.innerHTML = "<p>Nenhuma tarefa adicionada.</p>";
    return;
  }

  tarefas.forEach((t, index) => {
    const div = document.createElement("div");
    div.className = "tarefa";
    if (t.concluida) div.classList.add("concluida");

    div.innerHTML = `
      <strong>${t.titulo}</strong> (${t.prioridade})<br>
      ${t.descricao ? t.descricao + "<br>" : ""}
      Criada em: ${t.criadaEm}<br>
      <button onclick="concluirTarefa(${index})">${t.concluida ? "Desmarcar" : "Concluir"}</button>
      <button onclick="removerTarefa(${index})">Remover</button>
    `;

    lista.appendChild(div);
  });
}

// Inicializa a lista ao carregar a página
renderizarTarefas();

