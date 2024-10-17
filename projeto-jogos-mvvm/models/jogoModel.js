export default class JogoModel {
  constructor({ id, nome, descricao, produtora, ano, idadeMinima }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.produtora = produtora;
    this.ano = ano;
    this.idadeMinima = idadeMinima;
  }
}
