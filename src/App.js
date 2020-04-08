import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  // This is a variable that stores all the projects.
  // It's only used this way because we haven's created a database for it yet.
  const [repositories, setRepositories] = useState([]);  
  
  // useEffect is responsible for accessing the API (backend), bringing the data available 
  // and storing this data into our immutable variable - it uses the setRepositories function
  // in order to be able to 're-create' the variable, since it's immutable.
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // async Function responsible for adding a new repository into the list.
  // At this moment it's static information (not dynamic).
  async function handleAddRepository() {
    // this first variable access the POST root for adding a new repository
    const response =  await api.post('repositories', {
      title: "Desafio React.js 04",
      url: "http://github.com/test04",
      techs: ["React", "Node.js"]
    })

    // this variable grabs the data create above and stored in the variable above
    const repository = response.data;

    // then the useState() function is run to re-create our list with the new item
    setRepositories([...repositories, repository]);
  }

  // Very simple async funtion responsible for deleting a specific item from the list.
  // It receives as a parameter the parameter of the chosen repository.
  async function handleRemoveRepository(id) {
    // Access the DELETE route from the API passing the ID of the repository as parameter.
    await api.delete(`repositories/${id}`)

    // Uses the setRepository function - which is a parameter of the useState() to re-create
    // our list of repositories. In this case we want to remove the repository with the provided
    // ID, that's why we use filter excluding any repository that happens to hold that it.
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">

          { /* This map() method is very interesting. In this case it's allowing us to iterate through each item
          of our list of repositories. For each item it's creating a List Item (<li>) inside the <ul> */ }
          {repositories.map(repository => <li key={repository.id}>{repository.title}
          
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          
          </li>)}         

          
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    
  );
}

export default App;
