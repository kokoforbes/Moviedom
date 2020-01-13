import { shallowMount } from '@vue/test-utils'

import MovieListItem from '@/components/MovieListItem'

describe('components/MovieListItem', () => {
  it('Should redirect to IMDb movie by clicking on more', () => {
    const movie = {
      Title: 'Kingsman: The Secret Service',
      Year: '2014',
      imdbID: 'tt2802144'
    }

    const wrapper = shallowMount(MovieListItem, {
      propsData: {
        movie
      }
    })

    let link = wrapper.find('a')
    expect(link.attributes().href).toBe(`https://www.imdb.com/title/${movie.imdbID}`)
  })
})
