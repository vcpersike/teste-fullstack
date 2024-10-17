import { carregarJogos } from '../utils/carregarJogos.js';
import { renderizarJogos } from '../views/jogoView.js';

const listaElement = document.getElementById('jogos-lista');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await carregarJogos(listaElement, renderizarJogos); 
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
});