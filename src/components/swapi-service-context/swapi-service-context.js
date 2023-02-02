import React from 'react';

const {
  Provider: GenresProvider,
  Consumer: GenresConsumer
} = React.createContext();

const {
  Provider: RateMovieProvider,
  Consumer: RateMovieConsumer
} = React.createContext();

export {
  GenresProvider,
  GenresConsumer,
  RateMovieProvider,
  RateMovieConsumer
};