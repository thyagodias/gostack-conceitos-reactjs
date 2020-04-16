import React, { useState, useEffect } from 'react'
import api from './services/api'
import './styles.css'

function App () {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository () {
    api
      .post('repositories', {
        title: 'Teste',
        url: 'teste.com',
        techs: ['Node.js']
      })
      .then(response => {
        setRepositories([...repositories, response.data])
      })
  }

  async function handleRemoveRepository (id) {
    api.delete(`repositories/${id}`).then(() => {
      const repositoryIndex = repositories.findIndex(
        repository => repository.id === id
      )
      let newRepositories = repositories
      newRepositories.splice(repositoryIndex, 1)
      console.log(newRepositories)

      setRepositories([...newRepositories])
    })
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map(repository => (
          <li key={repository.id}>
            📁 <b>{repository.title}</b>
            <p>
              <a href={repository.url}>{repository.url}</a>
            </p>
            <p>Techs: {repository.techs}</p>❤ {repository.likes} likes
            <p>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </p>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
