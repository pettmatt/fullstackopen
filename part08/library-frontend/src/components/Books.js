const Books = ({ show, resultBooks }) => {
  if (!show) return null
  if (!resultBooks) return <div><p>No books found</p></div>
  if (resultBooks.loading) return <div><p>Loading . . .</p></div>
  
  const books = resultBooks.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
