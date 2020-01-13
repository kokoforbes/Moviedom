<template>
  <div id="app">
    <Search @search="changeMovieResults" />
    <movie-list :movies="movies"></movie-list>
  </div>
</template>

<script>
import Search from './components/Search'
import MovieList from './components/MovieList'

export default {
  name: 'app',
  components: {
    Search,
    MovieList
  },
  data () {
    return {
      movies: []
    }
  },
  methods: {
    changeMovieResults (results) {
      this.movies = results
    }
  }
}
</script>

<style>
:root {
  --blue-darkest: #131c25;
  --blue-light: #169cfc;
  --white: #e3e4e5;
  --grey-light: #919191;
  --yellow: #e3b044;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Lato";
  font-weight: 400;
}
</style>
