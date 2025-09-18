const API_URL = 'http://192.168.50.63:3000/alunos';

export async function fetchAlunos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function addAluno(aluno) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Erro desconhecido');
  }
  return await res.json();
}

export async function updateAluno(id, aluno) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Erro desconhecido');
  }
  return await res.json();
}

export async function deleteAluno(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Erro desconhecido');
  }
  return await res.json();
}

export async function fetchAlunoById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}
