import { listarJogos, criarJogo, excluirJogo, editarJogo } from '../services/apiService.js';
import JogoModel from '../models/jogoModel.js';

export default class JogoViewModel {
  constructor() {
    this.jogos = [];
  }

  async carregarJogos() {
    try {
      const dadosJogos = await listarJogos();
      this.jogos = dadosJogos;
      return this.jogos;
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
      throw error;
    }
  }

  async adicionarJogo(jogoData) {
    try {
      const novoJogo = await criarJogo(jogoData);
      this.jogos.push(new JogoModel(novoJogo));
    } catch (error) {
      console.error('Erro ao adicionar jogo:', error);
      throw error;
    }
  }

  async removerJogo(id) {
    try {
      await excluirJogo(id);
      this.jogos = this.jogos.filter(jogo => jogo.id !== id);
    } catch (error) {
      console.error('Erro ao remover jogo:', error);
      throw error;
    }
  }

  async editarJogo(id, jogoData) {
    try {
      await editarJogo(id, jogoData);
      const index = this.jogos.findIndex(jogo => jogo.id === id);
      if (index !== -1) {
        this.jogos[index] = new JogoModel({ id, ...jogoData });
      }
    } catch (error) {
      console.error('Erro ao editar jogo:', error);
      throw error;
    }
  }
}
