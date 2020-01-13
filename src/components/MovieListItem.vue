<template>
  <div>
    <li>
      <img :src="imageURL" />
      <a :href="`https://www.imdb.com/title/${movie.imdbID}`" target="_blank"
        >More</a
      >
      <p>{{ movie.Title }}</p>
      <span>{{ movie.Year }}</span>
    </li>
  </div>
</template>

<script>
import unknownImage from '@/assets/unknown.jpg'
export default {
  name: 'movie-list-item',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageURL () {
      if (this.movie.Poster === 'N/A') {
        return unknownImage
      } else {
        return this.movie.Poster
      }
    }
  }
}
</script>

<style></style>
