import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepository(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      owner: 'Lucão',
    });

    const repo = response.data;
    setRepository([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repoUpdated = repositories.filter((item) => item.id !== id);

    setRepository(repoUpdated);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
