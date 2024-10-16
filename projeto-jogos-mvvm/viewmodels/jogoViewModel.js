import JogoModel from '../models/jogoModel.js';

class JogoViewModel {
  constructor() {
    this.model = new JogoModel();
  }

  obterJogos() {
    return this.model.getJogos();
  }

  adicionarJogo(nome, imagem) {
    this.model.adicionarJogo(nome, imagem);
  }

  editarJogo(index, novoNome) {
    this.model.editarJogo(index, novoNome);
  }

  deletarJogo(index) {
    this.model.deletarJogo(index);
  }

  obterLogs() {
    return this.model.getLogs();
  }
}

export default JogoViewModel;
