import { carregarJogos } from '../utils/carregarJogos.js';
import JogoViewModel from '../viewmodels/jogoViewModel.js';
import { criarJogo } from '../services/apiService.js';

const viewModel = new JogoViewModel();
const listaElement = document.getElementById('gerenciar-lista');

document.addEventListener('DOMContentLoaded', async () => {

  try {
    await carregarJogos(listaElement);
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }

  document.getElementById('form-jogo').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const nome = document.getElementById('nome-jogo').value.trim();
      const descricao = document.getElementById('descricao-jogo').value.trim();
      const produtora = document.getElementById('produtora-jogo').value.trim();
      const ano = parseInt(document.getElementById('ano-jogo').value, 10);
      const idadeMinima = parseInt(document.getElementById('idade-minima-jogo').value, 10);
  
      // Verifica se todos os campos estão preenchidos corretamente
      if (!nome || !descricao || !produtora || isNaN(ano) || isNaN(idadeMinima)) {
        throw new Error('Por favor, preencha todos os campos corretamente.');
      }
  
      // Chama o serviço para criar o jogo
      await criarJogo({ nome, descricao, produtora, ano, idadeMinima });
      await carregarJogos(listaElement); // Recarrega a lista
    } catch (error) {
      console.error('Erro ao criar o jogo:', error);
      alert(error.message); // Exibe um alerta em caso de erro
    }
  });

  listaElement.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      try {
        e.target.disabled = true;
        await viewModel.removerJogo(id);
        await carregarJogos(listaElement);
      } catch (error) {
        console.error('Erro ao excluir o jogo:', error);
      } finally {
        e.target.disabled = false;
      }
    }
  });
});
