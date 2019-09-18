import React, { Component } from "react";
import MoviesTable from "./MoviesTable";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Sidebar from "./common/sidebar";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Link from "react-router-dom/Link";
import SearchBox from './common/searchBox';

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Movies", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery:"", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1});
  }

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      searchQuery,
      selectedGenre,
      sortColumn,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) 
    filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
   else if (selectedGenre && selectedGenre._id)
        filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn } = this.state;

    if (count === 0) {
      return (
        <p className="text-danger lead mt-3">
          There are no Movies in the database
        </p>
      );
    }

    const { totalCount, data: movies, searchQuery } = this.getPageData();

    return (
      <React.Fragment>
        <div className="container row">
          <div className="col-2 pt-4">
            <Sidebar
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-10">
            <Link to="/movies/new" className="btn btn-primary">New Movie</Link>
            <p className="text-success lead mt-3">
              Now Showing {totalCount} Movies in the database
            </p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
