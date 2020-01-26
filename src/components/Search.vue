<template>
  <div class="search">
    <input
      v-model="searchQuery"
      @keyup.enter="search"
      class="search__input"
      placeholder="Search your movies..."
    />
    <div class="error" v-if="error">
      <i class="fas fa-exclamation-circle error__icon"></i>
      <span class="error__text">{{ error }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const BASE_URL = `https://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_KEY}`

export default {
  name: 'search',
  data () {
    return {
      searchQuery: '',
      error: ''
    }
  },
  methods: {
    async search () {
      let response = await axios.get(`${BASE_URL}&s=${this.searchQuery}`)
      if (response.status === 200) {
        let data = response.data
        if (data.Response === 'True') {
          this.error = ''
          return this.$emit('search', data.Search)
        }
        this.error = data.Error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &__input {
    font-size: 5rem;
    font-family: inherit;
    font-weight: 700;
    background-color: transparent;
    border: none;
    color: var(--white);
    border-left: 0.5rem solid var(--blue-light);
    padding: 1.5rem;

    &:focus {
      outline: none;
    }
     @media screen and (max-width: 900px) {
      font-size: 4rem;
    }

    @media screen and (max-width: 600px) {
      font-size: 3rem;
      padding: 1.2rem;
    }
  }
}

.error {
  margin-top: 1.5rem;
  font-size: 2rem;

  &__icon {
    color: var(--yellow);
  }

  &__text {
    color: var(--white);
    margin-left: 1rem;
  }
}
</style>
