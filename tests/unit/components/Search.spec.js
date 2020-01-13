import Vue from 'vue'
import axios from 'axios'
import { shallowMount } from '@vue/test-utils'

import Search from '@/components/Search'

jest.mock('axios')

describe('components/Search', () => {
  let wrapper
  let input

  beforeEach(() => {
    wrapper = shallowMount(Search)
    input = wrapper.find('input')
    input.setValue('kingsman')
  })

  it('Should send a request to the right API and append the search parameter', () => {
    const response = { status: 200, data: { Response: 'True' } }

    axios.get.mockImplementation(async () => response)
    input.trigger('keyup.enter')

    expect(axios.get).toHaveBeenCalledWith(`https://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_KEY}&s=kingsman`)
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  it('Should emit the results if they are successfully retrieved', async () => {
    const movies = ['Kingsman: The Secret Service', 'Kingsman: The Golden Circle']
    const response = { status: 200, data: { Response: 'True', Search: movies } }

    axios.get.mockImplementation(async () => response)
    input.trigger('keyup.enter')

    await Vue.nextTick()

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted().search[0][0]).toEqual(movies)
  })

  it('Should not emit the results if the status is different than 200', () => {
    const response = { status: 500, data: { Response: 'True', Search: [1] } }

    axios.get.mockImplementation(async () => response)
    input.trigger('keyup.enter')

    expect(wrapper.emitted().search).toBeFalsy()
  })

  it('Should not emit the results if the response retrieved is False', () => {
    const response = { status: 200, data: { Response: 'False' } }

    axios.get.mockImplementation(async () => response)
    input.trigger('keyup.enter')

    expect(wrapper.emitted().search).toBeFalsy()
  })

  describe('Error handling', () => {
    it('Should display an error if the API sends back an Error property', async () => {
      const response = { status: 200, data: { Response: 'False', Error: 'Too many results' } }

      axios.get.mockImplementation(async () => response)
      input.trigger('keyup.enter')

      await Vue.nextTick()

      const error = wrapper.find('span')
      expect(error.text()).toBe(response.data.Error)
    })

    it('Should make the error disappear if a new search is successful', async () => {
      wrapper.vm.error = 'Too many results.'

      let error = wrapper.find('span')
      expect(error.exists()).toBe(true)

      const response = { status: 200, data: { Response: 'True', Search: ['foobar', 'hello'] } }
      axios.get.mockImplementation(async () => response)
      input.trigger('keyup.enter')

      await Vue.nextTick()

      error = wrapper.find('span')
      expect(error.exists()).toBe(false)
    })
  })
})
