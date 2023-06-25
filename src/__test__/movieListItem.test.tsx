import { screen, render, waitFor } from '@testing-library/react'
import MovieListItems from '../components/MovieListItems'
import CustomTestRender from './AppProvder'

describe("Movie List Items", () => {

    test("display loading icon when loading is false ", () => {
        CustomTestRender(<MovieListItems />)
        const loadingElement = screen.getByTitle('loading')
        expect(loadingElement).toBeInTheDocument()
    })
    test("Movie List should not display before loading", () => {
        CustomTestRender(<MovieListItems />)

        const movieListContainerElement = screen.queryByTitle('movielistcontainer')
        expect(movieListContainerElement).not.toBeInTheDocument()
    })
    test("Seach Input Box should be display", () => {
        CustomTestRender(<MovieListItems />)

        const SearchElement = screen.findByRole('searchbox')
        expect(SearchElement).not.toBe(null)
    })

    test('movie Details should not to be diplayed before selecting any movie', () => {
        CustomTestRender(<MovieListItems />)
        const countElement = screen.queryByTitle('movie-details')
        expect(countElement).not.toBeInTheDocument()
      })
})