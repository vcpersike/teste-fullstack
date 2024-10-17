import JogoModel from '../models/jogoModel.js';

export default class JogoViewModel {
  constructor() {
    this.model = new JogoModel();
  }

  async obterJogos() {
    try {
      return await this.model.getJogos();
    } catch (error) {
      console.error('Erro ao obter jogos:', error);
      return [];
    }
  }

  async adicionarJogo(jogo, imagem) {
    try {
      await this.model.adicionarJogo(jogo, imagem);
      console.log(`Jogo "${jogo.nome}" adicionado com sucesso.`);
    } catch (error) {
      console.error('Erro ao adicionar o jogo:', error);
    }
  }

  async editarJogo(index, novoNome) {
    try {
      await this.model.editarJogo(index, novoNome);
      console.log(`Jogo editado com sucesso para: ${novoNome}`);
    } catch (error) {
      console.error('Erro ao editar o jogo:', error);
    }
  }

  async deletarJogo(index) {
    try {
      await this.model.deletarJogo(index);
      console.log(`Jogo deletado com sucesso.`);
    } catch (error) {
      console.error('Erro ao deletar o jogo:', error);
    }
  }

  async obterLogs() {
    try {
      return await this.model.getLogs();
    } catch (error) {
      console.error('Erro ao obter logs:', error);
      return [];
    }
  }
}
