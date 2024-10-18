export function renderizarHeader() {
    const header = document.createElement('header');
    header.className = 'bg-primary text-white py-3';
    header.innerHTML = `
      <div class="container d-flex justify-content-between align-items-center">
        <h2 class="mb-0">Gestão de Jogos</h2>
        <nav class="d-flex">
          <a href="index.html" class="text-white mx-2">Lista</a>
          <a href="gerenciar.html" class="text-white mx-2">Gerenciar</a>
          <a href="logs.html" class="text-white mx-2">Buscar</a>
        </nav>
      </div>
    `;
    document.body.prepend(header);
  }
  