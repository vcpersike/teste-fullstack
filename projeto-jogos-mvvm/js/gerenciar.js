import { JogoViewModel } from '../viewmodels/jogoViewModel.js';
import { renderizarJogos } from '../views/jogoView.js';

const viewModel = new JogoViewModel();
const listaElement = document.getElementById('gerenciar-lista');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await carregarJogos(); // Faz a chamada uma vez ao carregar a página
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }

  // Adiciona evento ao formulário de criação
  document.getElementById('form-jogo').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o reload da página

    try {
      const nome = document.getElementById('nome-jogo').value;
      const descricao = document.getElementById('descricao-jogo').value;
      const produtora = document.getElementById('produtora-jogo').value;
      const ano = document.getElementById('ano-jogo').value;
      const idadeMinima = document.getElementById('idade-minima-jogo').value;

      // Cria o jogo e recarrega a lista
      await viewModel.adicionarJogo({ nome, descricao, produtora, ano, idadeMinima }, imagem);
      await carregarJogos(); // Recarrega a lista após adicionar um novo jogo
    } catch (error) {
      console.error('Erro ao criar o jogo:', error);
    }finally {
      botaoSalvar.disabled = false; // Reativa o botão após a requisição
    }
  });

  // Adiciona evento para excluir um jogo
  listaElement.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      try {
        e.target.disabled = true; // Desativa o botão de exclusão temporariamente
        await viewModel.removerJogo(id);
        await carregarJogos(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao excluir o jogo:', error);
      } finally {
        e.target.disabled = false; // Reativa o botão após a exclusão
      }
    }
  });
});

async function carregarJogos() {
  try {
    const jogos = await viewModel.obterJogos();
    renderizarJogos(jogos, listaElement); // Atualiza a view com a lista de jogos
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
}
