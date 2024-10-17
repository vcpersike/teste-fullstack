import { listarJogos } from '../services/apiService.js';

/**
 * Carrega e renderiza a lista de jogos com base na função de renderização fornecida.
 * 
 * @param {HTMLElement} element - O elemento onde a lista será renderizada.
 * @param {Function} renderFunction - Função responsável por renderizar os jogos (tabela ou cards).
 */
export async function carregarJogos(element, renderFunction) {
  if (!element) {
    console.error('Elemento de lista não encontrado.');
    return; // Para evitar erros se o elemento não existir
  }
  try {
   
    const jogos = await listarJogos(); // Obtém os jogos da API
    element.innerHTML = '';
    if (typeof renderFunction !== 'function') {
      throw new Error('A função de renderização fornecida não é válida.');
    } // Limpa o conteúdo anterior
    renderFunction(jogos, element); // Usa a função de renderização fornecida
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
}
