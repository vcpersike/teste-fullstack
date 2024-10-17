export function criarCard(jogo) {
  const card = document.createElement('div');
  card.className = 'col-md-4';

  card.innerHTML = `
    <div class="card">
      <div class="card-body text-center">
      <h5 class="card-title">${jogo.nome}</h5>
      <p class="card-text text-start text-primary mb-0">
        <strong>Descrição:</strong> ${jogo.descricao}
      </p>
      <p class="card-text text-start text-primary mb-0">
        <strong>Produtora:</strong> ${jogo.produtora}
      </p>
      <p class="card-text text-start text-primary mb-0">
        <strong>Idade Mínima:</strong> ${jogo.idadeMinima} anos
      </p>
      <p class="card-text text-start text-primary mb-0">
        <strong>Ano:</strong>${jogo.ano}
      </p>
    </div>
    </div>
  `;

  return card;
  }

  
