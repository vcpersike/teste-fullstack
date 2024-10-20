export function renderizarFooter() {
    const footer = document.createElement('footer');
    footer.className = 'bg-dark text-white text-center py-3 mt-5';
    footer.innerHTML = `
      <div class="container">
        <p>© 2024 Gestão de Jogos. Todos os direitos reservados.</p>
      </div>
    `;
    document.body.appendChild(footer);
  }
