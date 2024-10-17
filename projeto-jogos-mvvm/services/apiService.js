const API_URL = 'http://localhost:3000/api/jogo';

export async function listarJogos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao obter jogos');
    }
    console.log('Listando jogos...', response);
    return await response.json(); // Retorna a lista de jogos como JSON
  } catch (error) {
    console.error('Erro ao listar os jogos:', error);
    throw error;
  }
}

export async function obterJogoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Jogo não encontrado');
  }
  return await response.json();
}

export async function criarJogo(jogo, imagem) {
  const formData = new FormData();
  formData.append('nome', jogo.nome);
  formData.append('descricao', jogo.descricao);
  formData.append('produtora', jogo.produtora);
  formData.append('ano', jogo.ano);
  formData.append('idadeMinima', jogo.idadeMinima);

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao criar o jogo');
  }
  return await response.json();
}

export async function editarJogo(id, jogo) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jogo),
  });

  if (!response.ok) {
    throw new Error('Erro ao editar o jogo');
  }
  return await response.json();
}


export async function excluirJogo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir o jogo');
  }
  return await response.json();
}
