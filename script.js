// Armazenar filmes em um array
let movies = [];

// Referências aos elementos do DOM
const movieForm = document.getElementById('movie-form');
const movieTableBody = document.getElementById('movie-table-body');
const filterGenre = document.getElementById('filter-genre');

// Função para adicionar filme
movieForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('movie-name').value;
  const genre = document.getElementById('movie-genre').value;
  const duration = document.getElementById('movie-duration').value;

  const movie = { name, genre, duration, watched: false };
  movies.push(movie);
  
  // Limpa o formulário
  movieForm.reset();

  renderMovies();
});

// Função para renderizar a lista de filmes
function renderMovies() {
  const filteredMovies = filterMovies();

  movieTableBody.innerHTML = '';

  filteredMovies.forEach((movie, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${movie.name}</td>
      <td>${movie.genre}</td>
      <td>${movie.duration}</td>
      <td><button onclick="toggleWatched(${index})">${movie.watched ? 'Assistido' : 'Marcar como Assistido'}</button></td>
    `;
    
    movieTableBody.appendChild(row);
  });
}

// Função para alternar o status de assistido
function toggleWatched(index) {
  movies[index].watched = !movies[index].watched;
  renderMovies();
}

// Função para filtrar filmes por gênero
function filterMovies() {
  const selectedGenre = filterGenre.value;

  if (selectedGenre === 'todos') {
    return movies;
  }

  return movies.filter(movie => movie.genre === selectedGenre);
}

// Atualizar a renderização dos filmes quando o filtro for alterado
filterGenre.addEventListener('change', renderMovies);

// Inicializa a renderização
renderMovies();
