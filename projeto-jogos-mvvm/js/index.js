import { renderizarJogos } from '../views/jogoView.js';
import JogoViewModel from '../viewmodels/jogoViewModel.js';

const viewModel = new JogoViewModel();
const listaElement = document.getElementById('jogos-lista');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await renderizarJogos(viewModel, listaElement);
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
});
