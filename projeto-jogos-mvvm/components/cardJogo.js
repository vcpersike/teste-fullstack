export function criarCard(jogo) {
  const imagemSrc = jogo.imagem || 'https://via.placeholder.com/150';

  const card = document.createElement('div');
  card.className = 'col-md-4';

  card.innerHTML = `
    <div class="card">
      <div class="card-body text-center">
        <h5 class="card-title">${jogo.nome}</h5>
        <p class="card-text"><strong>Descrição:</strong> ${jogo.descricao}</p>
        <p class="card-text"><strong>Produtora:</strong> ${jogo.produtora}</p>
        <p class="card-text"><strong>Ano:</strong> ${jogo.ano}</p>
        <p class="card-text"><strong>Idade Mínima:</strong> ${jogo.idadeMinima} anos</p>
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
