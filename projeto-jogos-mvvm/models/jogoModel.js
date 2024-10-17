class JogoModel {
    constructor() {
      this.jogos = JSON.parse(localStorage.getItem('jogos')) || [];
      this.logs = JSON.parse(localStorage.getItem('logs')) || [];
    }

    getJogos() {

      return this.jogos;
    }

    adicionarJogo(nome, descricao, produtora, ano, idadeMinima) {

      const novoJogo = {
        nome: nome,
        descricao: descricao,
        produtora: produtora,
        ano: ano,
        idadeMinima: idadeMinima,
      };

      this.jogos.push(novoJogo);
      this.salvarJogos();
      this.adicionarLog(`Adicionado: ${nome}`);

    }

    editarJogo(index, novoNome) {
      const nomeAntigo = this.jogos[index].nome;
      this.jogos[index].nome = novoNome;
      this.salvarJogos();
      this.adicionarLog(`Editado: ${nomeAntigo} para ${novoNome}`);
    }

    deletarJogo(index) {
      const nome = this.jogos[index].nome;
      this.jogos.splice(index, 1);
      this.salvarJogos();
      this.adicionarLog(`Deletado: ${nome}`);
    }

    adicionarLog(mensagem) {
      const timestamp = new Date().toLocaleString();
      this.logs.push(`[${timestamp}] ${mensagem}`);
      localStorage.setItem('logs', JSON.stringify(this.logs));
    }

    getLogs() {
      return this.logs;
    }

    salvarJogos() {
      localStorage.setItem('jogos', JSON.stringify(this.jogos));
    }

  }

  export default JogoModel;
