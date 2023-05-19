import { Component } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from '../services/moviesApi';
import { MoviesList } from './MoviesList/MoviesList';

export class App extends Component {
  state = {
    movies: [],
    isListShown: false,
    isLoading: false,
    page: 1,
  };

  componentDidUpdate(__, prevState) {
    const { isListShown, page } = this.state;
    if (
      (prevState.isListShown !== isListShown || page !== prevState.page) &&
      isListShown
    ) {
      this.setState({ isLoading: true });
      fetchMovies(page)
        .then(({ data: { results } }) => {
          this.setState(prevState => {
            return { movies: [...prevState.movies, ...results] };
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }

    if (prevState.isListShown !== isListShown && isListShown === false) {
      this.setState({
        movies: [],
        page: 1,
      });
    }
  }

  onVisibilityChanged = () => {
    this.setState(prevState => {
      return { isListShown: !prevState.isListShown };
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isListShown, movies } = this.state;
    return (
      <>
        <Button
          clickHandler={this.onVisibilityChanged}
          text={isListShown ? 'Hide movies list' : 'Show movies list'}
        />
        {isListShown && (
          <>
            <MoviesList movies={movies} />{' '}
            <Button text="Load more" clickHandler={this.loadMore} />
          </>
        )}
      </>
    );
  }
}
