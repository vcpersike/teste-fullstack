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

  async adicionarJogo(jogo) {
    try {
      await criarJogo(jogo);
      await this.carregarJogos();
    } catch (error) {
      console.error('Erro ao adicionar jogo:', error);
      throw error;
    }
  }

  async removerJogo(id) {
    try {
      await excluirJogo(id);
      await this.carregarJogos();
    } catch (error) {
      console.error('Erro ao excluir jogo:', error);
      throw error;
    }
  }

  async atualizarJogo(jogoEditado) {
    try {
      await editarJogo(jogoEditado.id, jogoEditado);
      await this.carregarJogos();
    } catch (error) {
      console.error('Erro ao editar jogo:', error);
      throw error;
    }
  }

  async editarJogo(jogoEditado) {
    try {
      await editarJogo(jogoEditado);
      this.jogos = await this.carregarJogos();
      return this.jogos;
    } catch (error) {
      console.error('Erro ao editar jogo:', error);
      throw error;
    }
  }
}
