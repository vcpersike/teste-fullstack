import JogoViewModel from '../viewmodels/jogoViewModel.js';
import { criarCard, criarCardComBotoes } from '../components/cardJogo.js';

const viewModel = new JogoViewModel();

export function renderizarLista() {
  const lista = document.getElementById('jogos-lista');
  if (!lista) {
    console.error('Elemento com ID "jogos-lista" não encontrado.');
    return;
  }

  lista.innerHTML = '';

  viewModel.obterJogos().forEach((jogo) => {
    const card = criarCard(jogo);
    lista.appendChild(card);
  });
}

export function renderizarGerenciamento() {
  const lista = document.getElementById('gerenciar-lista');
  if (!lista) {
    console.error('Elemento com ID "gerenciar-lista" não encontrado.');
    return;
  }

  lista.innerHTML = '';

  viewModel.obterJogos().forEach((jogo, index) => {
    const card = criarCardComBotoes(jogo, index);
    lista.appendChild(card);
  });
}

export function renderizarLogs() {
  const lista = document.getElementById('logs-lista');
  lista.innerHTML = '';
  viewModel.obterLogs().forEach((log) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = log;
    lista.appendChild(li);
  });
}

export function adicionarEventoAdicionarJogo() {
  const form = document.getElementById('form-jogo');
  if (!form) {
    console.error('Formulário não encontrado.');
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nomeJogo = document.getElementById('nome-jogo').value;
    const imagemJogo = document.getElementById('imagem-jogo').value;

    viewModel.adicionarJogo(nomeJogo, imagemJogo);
    renderizarGerenciamento();
    form.reset();
  });
}

window.editarJogo = (index) => {
  const novoNome = prompt('Digite o novo nome do jogo:');
  if (novoNome) {
    viewModel.editarJogo(index, novoNome);
    renderizarGerenciamento();
  }
};

window.deletarJogo = (index) => {
  viewModel.deletarJogo(index);
  renderizarGerenciamento();
};

