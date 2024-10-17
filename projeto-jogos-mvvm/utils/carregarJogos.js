import { listarJogos } from '../services/apiService.js';
import { renderizarJogos } from '../views/jogoView.js';

export async function carregarJogos(listaElement) {

  try {
    const jogos = await listarJogos();
    renderizarJogos(jogos, listaElement);
  } catch (error) {
    console.error('Erro ao listar os jogos:', error);
  }
}
