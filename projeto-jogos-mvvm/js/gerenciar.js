import { carregarJogos } from '../utils/carregarJogos.js';
import { criarJogo } from '../services/apiService.js';

const listaElement = document.getElementById('gerenciar-lista');
const formJogo = $('#form-jogo'); // jQuery selector

// Verifique se a função validate está disponível
console.log('jQuery:', $);
console.log('jQuery Validation:', $.fn.validate);

/**
 * Inicializa a validação do formulário
 */
function inicializarValidacao() {
  formJogo.validate({
    rules: {
      nome: { required: true, minlength: 3 },
      descricao: { required: true, minlength: 5 },
      produtora: { required: true },
      ano: { required: true, dateISO: true },
      idadeMinima: { required: true, number: true, min: 0 },
    },
    messages: {
      nome: { required: 'O nome é obrigatório', minlength: 'Mínimo 3 caracteres' },
      descricao: { required: 'A descrição é obrigatória', minlength: 'Mínimo 5 caracteres' },
      produtora: 'A produtora é obrigatória',
      ano: { required: 'O ano é obrigatório', dateISO: 'Formato: AAAA-MM-DD' },
      idadeMinima: { required: 'A idade mínima é obrigatória', number: 'Digite um número válido', min: 'Mínimo 0' },
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
        console.log('Novo jogo:', novoJogo);
        await criarJogo(novoJogo);
        await carregarJogos(listaElement);
        formJogo[0].reset();
      } catch (error) {
        console.error('Erro ao criar o jogo:', error);
        alert(error.message);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await carregarJogos(listaElement);
    inicializarValidacao();
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
});
