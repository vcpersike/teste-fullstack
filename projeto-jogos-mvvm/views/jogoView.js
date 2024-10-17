import { criarCard } from '../components/cardJogo.js';
import { criarTabelaJogos } from '../components/tabelaJogo.js';

export async function renderizarJogos(viewModel, element) {
  try {
    const jogos = await viewModel.carregarJogos();
    element.innerHTML = '';
    jogos.forEach((jogo) => {
      const card = criarCard(jogo);
      element.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao renderizar jogos como cards:', error);
  }
}

export async function renderizarTabela(viewModel, element, onEdit, onDelete) {
  try {
    const jogos = await viewModel.carregarJogos();
    element.innerHTML = '';
    const tabela = criarTabelaJogos(jogos, onEdit, onDelete);
    element.appendChild(tabela);
  } catch (error) {
    console.error('Erro ao renderizar jogos como tabela:', error);
  }
}

