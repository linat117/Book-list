import { useState, useEffect } from 'react'; 

function AddBookForm({ onAddBook, editingBook }) {
  // State for the book title input
  const [title, setTitle] = useState("");

  // State for the author input
  const [author, setAuthor] = useState("");

  // State to track focus for inputs to add styling (focused / not focused)
  const [isFocused, setIsFocused] = useState({
    title: false,
    author: false
  });

  // useEffect runs when editingBook changes
  // If editingBook exists, it populates the form fields with that book's data
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
    }
  }, [editingBook]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit

    // Validation: ignore submission if title or author is empty
    if (!title || !author) return;

    // Call the onAddBook function passed as prop with current title & author
    onAddBook({ title, author });

    // If NOT editing (adding new book), clear the inputs after submit
    if (!editingBook) {
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <div className="form-container">
      {/* Form header with dynamic title based on edit mode */}
      <div className="form-header">
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <div className="form-header-decoration"></div>
      </div>

      {/* The actual form */}
      <form onSubmit={handleSubmit} className="book-form">

        {/* Title input group with dynamic classes for focus and value */}
        <div className={`form-group ${isFocused.title ? 'focused' : ''} ${title ? 'has-value' : ''}`}>
          <label htmlFor="title">Book Title</label>

          <div className="input-wrapper">
            <input
              type="text"
              id="title"
              value={title} // Controlled input bound to title state
              onChange={(e) => setTitle(e.target.value)} // Update title state on input change

              // When input is focused, set isFocused.title to true for styling
              onFocus={() => setIsFocused(prev => ({ ...prev, title: true }))}

              // When input loses focus, set isFocused.title to false
              onBlur={() => setIsFocused(prev => ({ ...prev, title: false }))}
            />
            {/* Extra decoration element for UI */}
            <span className="input-decoration"></span>
          </div>
        </div>

        {/* Author input group, same logic as title input */}
        <div className={`form-group ${isFocused.author ? 'focused' : ''} ${author ? 'has-value' : ''}`}>
          <label htmlFor="author">Author</label>

          <div className="input-wrapper">
            <input
              type="text"
              id="author"
              value={author} // Controlled input bound to author state
              onChange={(e) => setAuthor(e.target.value)} // Update author state on input change

              onFocus={() => setIsFocused(prev => ({ ...prev, author: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, author: false }))}
            />
            <span className="input-decoration"></span>
          </div>
        </div>

        {/* Submit button, changes text and icon depending on add/edit mode */}
        <button type="submit" className="submit-btn">
          {editingBook ? (
            <>
              {/* Edit icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
              Update Book
            </>
          ) : (
            <>
              {/* Add icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              Add to Collection
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddBookForm;
