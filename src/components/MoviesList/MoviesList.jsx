export const MoviesList = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => {
        return <li key={id}>{title}</li>;
      })}
    </ul>
  );
};
