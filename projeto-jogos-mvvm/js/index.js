import { carregarJogos } from '../utils/carregarJogos.js';
let jogosCarregados = false;

document.addEventListener('DOMContentLoaded', async () => {
  if (!jogosCarregados) {
    const listaElement = document.getElementById('jogos-lista');
    await carregarJogos(listaElement);
    jogosCarregados = true;
  }
});
