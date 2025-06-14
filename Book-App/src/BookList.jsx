import React from "react";

function BookList({ books, onDelete, onEdit }) {
  // If there are no books, show a friendly empty state message with an icon
  if (books.length === 0) {
    return (
      <div className="empty-state">
        {/* SVG icon of a book */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          />
        </svg>
        <p>Your bookshelf is empty. Add your first book!</p>
      </div>
    );
  }

  // Create an array to hold rows of books for layout
  const rows = [];

  // Determine how many books per row based on window width (responsive)
  // If screen width less than 768px (mobile/tablet), show 6 books per row; else 8 books per row
  const booksPerRow = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 8;

  // Split the books array into chunks (rows) based on booksPerRow count
  for (let i = 0; i < books.length; i += booksPerRow) {
    rows.push(books.slice(i, i + booksPerRow));
  }

  return (
    <div className="bookshelf-container">
      <div className="bookshelf">
        {/* Map through each row of books */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="bookshelf-row-container">
            <div className="bookshelf-row">
              {/* Map through each book in the row */}
              {row.map((book) => {
                // Randomly assign a color class for the book spine for some visual variety (color-1 to color-8)
                const colorClass = `color-${Math.floor(Math.random() * 8) + 1}`;

                return (
                  // Each book is represented by a "book-spine" div
                  <div 
                    key={book.id} 
                    className={`book-spine ${colorClass}`}
                    onClick={() => onEdit(book)} // Clicking the book triggers edit mode for that book
                  >
                    {/* Content of the book spine: title and author */}
                    <div className="book-spine-content">
                      <h3>{book.title}</h3>
                      <p>by {book.author}</p>
                    </div>

                    {/* Book action buttons for edit and delete */}
                    <div className="book-actions">
                      {/* Edit button */}
                      <button 
                        className="edit-btn" 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the parent onClick (edit on book div)
                          onEdit(book);          // Call edit function with current book
                        }}
                        aria-label="Edit book" // Accessibility label
                      >
                        {/* Pencil SVG icon */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>

                      {/* Delete button */}
                      <button 
                        className="delete-btn" 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the parent onClick (edit on book div)
                          onDelete(book.id);    // Call delete function with current book's id
                        }}
                        aria-label="Delete book" // Accessibility label
                      >
                        {/* Trash bin SVG icon */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Decorative bookshelf shelf under each row */}
            <div className="bookshelf-shelf"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
