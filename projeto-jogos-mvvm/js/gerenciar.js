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
        dateISO: 'Formato: AAAA-MM-DD',
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
    const id = document.getElementById('editar-id').value;
    await viewModel.editarJogo(id, jogoEditado); // Passa o ID corretamente
    const jogos = await viewModel.carregarJogos();
    renderizarTabela(jogos, listaElement, onEdit, onDelete);
    $('#modal-editar').modal('hide'); // Fecha o modal
  } catch (error) {
    console.error('Erro ao salvar o jogo:', error);
    alert('Erro ao salvar o jogo.');
  }
});

function onEdit(jogo) {
  // Preenche o modal com os dados do jogo
  document.getElementById('editar-id').value = jogo.id;
  document.getElementById('editar-nome').value = jogo.nome;
  document.getElementById('editar-descricao').value = jogo.descricao;
  document.getElementById('editar-produtora').value = jogo.produtora;
  document.getElementById('editar-ano').value = jogo.ano;
  document.getElementById('editar-idade-minima').value = jogo.idadeMinima;

  // Abre o modal de edição
  $('#modal-editar').modal('show');
}

async function onDelete(jogoId) {
  try {
    await viewModel.removerJogo(jogoId);
    const jogos = await viewModel.carregarJogos();
    renderizarTabela(jogos, listaElement, onEdit, onDelete);
    alert('Jogo excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir o jogo:', error);
    alert('Erro ao excluir o jogo.');
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  inicializarValidacao(); 

  try {
    await renderizarTabela(viewModel, listaElement, onEdit, onDelete); 
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
});
