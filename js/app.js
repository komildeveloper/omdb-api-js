'use strict'

const elList = document.querySelector('.list')
const elTemplate = document.querySelector('.template').content
const elNextBtn = document.querySelector('.next')
const elPrevBtn = document.querySelector('.prev')
const elPagination = document.querySelector('.pagination')

const API_KEY = '747ee042'
let search = 'shrek'
let page = 1

const renderMovies = (movies, element) => {
	const moviesFragment = document.createDocumentFragment()

	element.innerHTML = null

	movies.forEach(movie => {
		const clonedFilmTemplate = elTemplate.cloneNode(true)
		clonedFilmTemplate.querySelector('.film__image').src = `${movie.Poster}`
		clonedFilmTemplate.querySelector(
			'.film__title'
		).textContent = `${movie.Title}`
		clonedFilmTemplate.querySelector(
			'.film__year'
		).textContent = `${movie.Year}`
		clonedFilmTemplate.querySelector(
			'.film__category'
		).textContent = `${movie.Type}`

		moviesFragment.appendChild(clonedFilmTemplate)
	})

	element.appendChild(moviesFragment)
}

const getMovies = async () => {
	const request = await fetch(
		`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}&type=movie`
	)
	const data = await request.json()

	const pageResults = data.totalResults / 10

	if (data.Response === 'True' && data.Search.length > 0) {
		renderMovies(data.Search, elList)
	}
}

getMovies()

input.addEventListener('change', e => {
	search = e.target.value
	getMovies()
	e.target.value = ''
})

elNextBtn.addEventListener('click', () => {
	page++
	getMovies()
})

elPrevBtn.addEventListener('click', () => {
	page--
	getMovies()
})
