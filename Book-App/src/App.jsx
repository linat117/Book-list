import { useState, useEffect } from 'react'; 
import AddBookForm from './AddBookForm';      
import BookList from './BookList';            

function App() {
  // State to hold all books, initially with 3 predefined books
  const [books, setBooks] = useState([
    { id: 1, title: 'Atomic Habits', author: 'James Clear' },
    { id: 2, title: 'The Psychology of Money', author: 'Morgan Housel' },
    { id: 3, title: 'Deep Work', author: 'Cal Newport' }
  ]);

  // State to keep track of the book currently being edited; null means no editing
  const [editingBook, setEditingBook] = useState(null);

  // State to store the current search input text
  const [searchTerm, setSearchTerm] = useState('');

  // State for toggling dark mode on/off (default off)
  const [darkMode, setDarkMode] = useState(false);

  // useEffect runs every time darkMode changes
  // It updates the document body attribute `data-theme` for CSS styling purposes
  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Function to handle adding a new book or updating an existing one
  const addBook = (book) => {
    if (editingBook) {
      // If editingBook exists, update the matching book by id
      setBooks(books.map((b) => 
        b.id === editingBook.id ? { ...b, ...book } : b
      ));
      setEditingBook(null); // Reset editing mode after update
    } else {
      // If not editing, add a new book with a unique id based on current timestamp
      setBooks([
        ...books, // Keep existing books
        { id: Date.now(), title: book.title, author: book.author } // Add new book
      ]);
    }
  };

  // Function to delete a book by filtering it out of the books array
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Function to start editing a book; sets editingBook state to selected book
  const editBook = (book) => {
    setEditingBook(book);
  };

  // Filter books based on search term entered (case-insensitive match on title or author)
  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container">
      {/* App header with title and dark mode toggle button */}
      <header className="app-header">
        <h1 className="app-title">📚 Book Library</h1>
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)} // Toggle darkMode state on click
        >
          {darkMode ? '☀️' : '🌙'} {/* Show sun icon if dark, moon icon if light */}
        </button>
      </header>

      {/* Search input field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm} // Controlled input bound to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on user input
        />
      </div>

      {/* Section for add/edit book form */}
      <div className="book-form">
        {/* Pass addBook handler and editingBook data as props */}
        <AddBookForm onAddBook={addBook} editingBook={editingBook} />
      </div>

      {/* Book list component */}
      <BookList 
        books={filteredBooks}     // Pass filtered list based on search term
        onDelete={deleteBook}     // Pass delete handler
        onEdit={editBook}         // Pass edit handler
      />

      {/* Display stats about total books and search results */}
      <div className="book-stats">
        <span>Total Books: {books.length}</span>
        {/* Show filtered count only if there is a search term */}
        {searchTerm && <span>Showing {filteredBooks.length} results</span>}
      </div>
    </div>
  );
}

export default App;
