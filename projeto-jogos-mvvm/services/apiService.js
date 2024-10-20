const API_URL = 'http://localhost:3000/api/jogo';

export async function listarJogos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao obter jogos');
    }
    return await response.json();
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

export async function criarJogo(jogo) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jogo),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro do servidor:', errorData);
    throw new Error('Erro ao criar o jogo');
  }
  return await response.json();
}

export async function editarJogo(jogo) {
  const response = await fetch(API_URL, {
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
