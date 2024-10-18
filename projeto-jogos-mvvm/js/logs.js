import { obterJogoPorId } from '../services/apiService.js';

const formBuscarJogo = document.getElementById('buscar-jogo-form');
const inputJogoId = document.getElementById('jogo-id');
const jogoDetalhes = document.getElementById('jogo-detalhes');

const jogoNome = document.getElementById('jogo-nome');
const jogoDescricao = document.getElementById('jogo-descricao');
const jogoProdutora = document.getElementById('jogo-produtora');
const jogoAno = document.getElementById('jogo-ano');
const jogoIdadeMinima = document.getElementById('jogo-idade-minima');
const historicoAlteracoes = document.getElementById('historico-alteracoes');

formBuscarJogo.addEventListener('submit', async (e) => {
  e.preventDefault();
  const jogoId = inputJogoId.value.trim();

  try {
    const jogo = await obterJogoPorId(jogoId);
    exibirJogoDetalhes(jogo);
  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
    alert('Jogo não encontrado!');
  }
});

function exibirJogoDetalhes(jogo) {
    jogoNome.textContent = `Nome: ${jogo.nome}`;
    jogoDescricao.textContent = `Descrição: ${jogo.descricao}`;
    jogoProdutora.textContent = `Produtora: ${jogo.produtora}`;
    jogoAno.textContent = `Ano de Lançamento: ${jogo.ano}`;
    jogoIdadeMinima.textContent = `Idade Mínima: ${jogo.idadeMinima} anos`;

    historicoAlteracoes.innerHTML = '';

    if (Array.isArray(jogo.historico) && jogo.historico.length > 0) {
      jogo.historico.forEach((alteracao) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${alteracao.data} - ${alteracao.alteracao}`;
        historicoAlteracoes.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = 'Nenhuma alteração recente.';
      historicoAlteracoes.appendChild(li);
    }

    jogoDetalhes.classList.remove('d-none');
  }
