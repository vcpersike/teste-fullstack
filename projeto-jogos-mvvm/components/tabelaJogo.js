export function criarTabelaJogos(jogos, onEdit, onDelete) {
  const tbody = document.createElement('tbody');

  jogos.forEach((jogo) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${jogo.nome}</td>
      <td>${jogo.descricao}</td>
      <td>${jogo.produtora}</td>
      <td>${jogo.ano}</td>
      <td>${jogo.idadeMinima}</td>
      <td>
        <button class="btn btn-warning btn-sm mr-2" data-id="${jogo.id}">Editar</button>
        <button class="btn btn-danger btn-sm" data-id="${jogo.id}">Excluir</button>
      </td>
    `;

    row.querySelector('.btn-warning').addEventListener('click', () => onEdit(jogo));
    row.querySelector('.btn-danger').addEventListener('click', () => onDelete(jogo.id));

    tbody.appendChild(row);
  });

  const table = document.createElement('table');
  table.className = 'table table-striped';
  table.appendChild(tbody);

  return table;
}
