export function criarCard(jogo) {
  const imagemSrc = jogo.imagem || 'https://via.placeholder.com/150';

  const card = document.createElement('div');
  card.className = 'col-md-4';

  card.innerHTML = `
    <div class="card">
      <img src="${imagemSrc}" class="card-img-top" alt="${jogo.nome}">
      <div class="card-body text-center">
        <h5 class="card-title">${jogo.nome}</h5>
      </div>
    </div>
  `;

  return card;
  }

  export function criarCardComBotoes(jogo, index) {
    const card = document.createElement('div');
    card.className = 'col-md-4';

    card.innerHTML = `
      <div class="card">
        <img src="${jogo.imagem}" class="card-img-top" alt="${jogo.nome}">
        <div class="card-body text-center">
          <h5 class="card-title">${jogo.nome}</h5>
          <div class="mt-3">
            <button class="btn btn-warning btn-sm" onclick="editarJogo(${index})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarJogo(${index})">Excluir</button>
          </div>
        </div>
      </div>
    `;

    return card;
  }
