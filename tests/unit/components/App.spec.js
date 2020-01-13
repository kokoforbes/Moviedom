import { shallowMount } from '@vue/test-utils'

import App from '@/App'
import Search from '@/components/Search'
import MovieList from '@/components/MovieList'

describe('App', () => {
  it('Should change movie results when search event is triggered', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.vm.movies).toEqual([])

    const movies = ['Kingsman: The Secret Service', 'Kingsman: The Golden Circle']
    let search = wrapper.find(Search)
    search.vm.$emit('search', movies)

    expect(wrapper.vm.movies).toBe(movies)
  })

  it('Should pass the movies prop to MovieList', () => {
    const wrapper = shallowMount(App)
    const movieList = wrapper.find(MovieList)
    expect(movieList.props().movies).toBe(wrapper.vm.movies)
  })
})
