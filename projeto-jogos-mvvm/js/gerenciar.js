import { renderizarTabela } from '../views/jogoView.js';
import { criarJogo } from '../services/apiService.js';
import JogoViewModel from '../viewmodels/jogoViewModel.js';
import { criarModalEdicao } from '../components/modalEditarJogo.js';

const listaElement = document.getElementById('gerenciar-lista');
const viewModel = new JogoViewModel();
const formJogo = $('#form-jogo');

function inicializarValidacao() {
  const hoje = new Date();
  const minAno = new Date(hoje.getFullYear() - 70, hoje.getMonth(), hoje.getDate());
  const maxAno = new Date(hoje.getFullYear() + 3, hoje.getMonth(), hoje.getDate());

  formJogo.validate({
    rules: {
      nome: { required: true, minlength: 3 },
      descricao: { required: true, minlength: 5 },
      produtora: { required: true },
      ano: {
        required: true,
        dateISO: true,
        min: minAno.toISOString().split('T')[0],
        max: maxAno.toISOString().split('T')[0],
      },
      idadeMinima: { required: true, number: true, min: 12 },
    },
    messages: {
      nome: { required: 'O nome é obrigatório', minlength: 'Mínimo 3 caracteres' },
      descricao: { required: 'A descrição é obrigatória', minlength: 'Mínimo 5 caracteres' },
      produtora: 'A produtora é obrigatória',
      ano: {
        required: 'A data de lançamento é obrigatória',
        dateISO: 'Formato: DD/MM/AAAA',
        min: `A data deve ser a partir de ${minAno.toISOString().split('T')[0]}`,
        max: `A data não pode ser superior a ${maxAno.toISOString().split('T')[0]}`,
      },
      idadeMinima: { required: 'A idade mínima é obrigatória', number: 'Digite um número válido', min: 'Mínimo 12' },
    },
    submitHandler: async function () {
      try {
        const novoJogo = {
          nome: $('#nome-jogo').val().trim(),
          descricao: $('#descricao-jogo').val().trim(),
          produtora: $('#produtora-jogo').val().trim(),
          ano: $('#ano-jogo').val(),
          idadeMinima: parseInt($('#idade-minima-jogo').val(), 10),
        };

        await criarJogo(novoJogo);
        await viewModel.carregarJogos();
        formJogo[0].reset();
      } catch (error) {
        console.error('Erro ao criar o jogo:', error);
        alert(error.message);
      }
    },
  });
}

criarModalEdicao(async (jogoEditado) => {
  try {
    await viewModel.editarJogo(jogoEditado);
    const jogosAtualizados = await viewModel.carregarJogos();
    renderizarTabela(jogosAtualizados, listaElement, onEdit, onDelete);
    $('#modal-editar').modal('hide');
  } catch (error) {
    console.error('Erro ao salvar o jogo:', error);
    alert('Erro ao salvar o jogo.');
  }
});

async function onSave(jogoEditado) {
  try {
    const jogosAtualizados = await viewModel.editarJogo(jogoEditado);
    renderizarTabela(jogosAtualizados, listaElement, onEdit, onDelete);
    $('#modal-editar').modal('hide');
  } catch (error) {
    console.error('Erro ao salvar o jogo:', error);
    alert('Erro ao salvar o jogo.');
  }
}

function onEdit(jogo) {
  document.getElementById('editar-id').value = jogo.id;
  document.getElementById('editar-nome').value = jogo.nome;
  document.getElementById('editar-descricao').value = jogo.descricao;
  document.getElementById('editar-produtora').value = jogo.produtora;
  document.getElementById('editar-ano').value = jogo.ano;
  document.getElementById('editar-idade-minima').value = jogo.idadeMinima;

  $('#modal-editar').modal('show');
}

async function onDelete(jogoId) {
  try {
    await viewModel.removerJogo(jogoId);
    renderizarTabela(viewModel, listaElement, onEdit, onDelete);
  } catch (error) {
    console.error('Erro ao excluir o jogo:', error);
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  inicializarValidacao();
  criarModalEdicao(onSave);

  try {
    await renderizarTabela(viewModel, listaElement, onEdit, onDelete);
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
});
