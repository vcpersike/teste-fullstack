import { listarJogos } from '../services/apiService.js';
import { criarCard } from '../components/cardJogo.js';

let jogosCarregados = false;

function renderizarJogos(jogos, listaElement) {
  console.log('Renderizando jogos...');
  listaElement.innerHTML = '';

  jogos.forEach((jogo) => {
    const card = criarCard(jogo);
    listaElement.appendChild(card);
  });
}

async function carregarJogos() {
  console.log('Executando carregarJogos...');

  if (jogosCarregados) {
    console.log('Jogos já carregados. Abortando chamada...');
    return;
  }

  try {
    const jogos = await listarJogos();
    const listaElement = document.getElementById('jogos-lista');
    renderizarJogos(jogos, listaElement);
    jogosCarregados = true;
    console.log('Jogos carregados com sucesso.');
  } catch (error) {
    console.error('Erro ao listar os jogos:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Página carregada');
  carregarJogos();
});
