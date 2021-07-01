const express = require("express");

// Database
const database = require("./database");

// Initialization
const booky = express();

// configuration
booky.use(express.json());

/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /language
Description     Get specific books based on languages
Access          PUBLIC
Parameter       lang
Methods         GET
*/

booky.get("/language/:lang",(req,res)=>{
    const getLanguage = database.books.filter((book) =>
    book.language===(req.params.lang)
  );

  if (getLanguage.length === 0) {
    return res.json({
      error: `No book found with the language of ${req.params.lang}`,
    });
  }

  return res.json({ book: getLanguage });
});

/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author", (req, res) => {
  return res.json({ authors: database.author });
});

/*
Route           /author/specific
Description     get specific authors
Access          PUBLIC
Parameter       id
Methods         GET
*/

booky.get("/author/specific/:Id",(req,res) =>{
    const getSpecificAuthor = database.author.filter((author) =>
    author.id===parseInt(req.params.Id)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No author found for the id of ${req.params.Id}`,
    });
  }

  return res.json({ author: getSpecificAuthor });
});


/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications", (req, res) => {
  return res.json({ publications: database.publication });
});

/*
Route           /publications/specific
Description     get specific publications
Access          PUBLIC
Parameter       Id
Methods         GET
*/

booky.get("/publicaions/specific/:Id",(req,res) =>{
    const getSpecificPublication = database.publication.filter((publication) =>
    publication.id===parseInt(req.params.Id)
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No publication found for the id of ${req.params.Id}`,
    });
  }

  return res.json({ publication: getSpecificPublication });
});

/*
Route           /publications/book
Description     get specific publications based on books
Access          PUBLIC
Parameter       ISBN
Methods         GET
*/

booky.get("/publications/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) =>
      publication.books.includes(req.params.isbn)
    );
  
    if (getSpecificPublication.length === 0) {
      return res.json({
        error: `No Publication found for the book of ${req.params.isbn}`,
      });
    }
  
    return res.json({ publication: getSpecificPublication });
  });

/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/book/add",(req,res)=>{
    const {newBook }= req.body;
    database.books.push(newBook);
    return res.json({books:database.books});

});

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/author/add",(req,res)=>{
    const {newAuthor }= req.body;
    database.author.push(newAuthor);
    return res.json({authors:database.author});
});

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/title/:isbn",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });
     return res.json({books: database.books});
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
    //update book Database

    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    //update author Database

    database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId))
        return author.books.push(req.params.isbn);
    });

    return res.json({books: database.books,author:database.author});
});

/*
Route           /publications/add
Description     add new publications
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/publications/add",(req,res)=>{
    const {newPublication }= req.body;
    database.publication.push(newPublication);
    return res.json({publications:database.publication});
});

/*
Route           /book/update/author
Description     Update author name 
Access          PUBLIC
Parameter       Id
Methods         PUT
*/

booky.put("/book/update/author/:Id",(req,res)=>{

    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.Id))
        {
            author.name=req.body.newAuthorName;
            return;
        }
        return res.json({author:database.author});
    });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       ISbn
Methods         DELETE
*/

booky.delete("/book/delete/:isbn",(req,res)=>{
   const updatedBookDatabase=database.books.filter(
     (book)=>book.ISBN !== req.params.isbn
   );

   database.books=updatedBookDatabase;
   return res.json({books: database.books}); 
});

/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameter       ISbn,author id
Methods         DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
  //update the book Database
  
  database.books.forEach((book)=>{
    if(book.ISBN ===req.params.isbn){
      const newAuthorList =book.authors.filter(
        (author)=>author !== parseInt(req.params.authorId)
        );
        book.authors = newAuthorList;
        return;
    }
  });

  //update the author Database

  database.authors.forEach((author)=>{
    if(author.id ===parseInt(req.params.authorId)){
      const newBooksList = author.books.filter(
        (book)=>book!== req.params.isbn
      ); 
      author.books=newBooksList;
      return;
    }
  });
    return res.json({
      message: "author was deleted",
      book:database.books,
      author:database.authors,
    });
});

/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameter       ISbn,publication id
Methods         DELETE
*/

booky.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
   //update publication Database
   database.publications.forEach((publication)=>{
     if(publication.id === parseInt(req.params.pubId)){
       const newBooksList =publication.books.filter(
         (book)=>book !== req.params.isbn
         );
         publication.books=newBooksList;
         return;

     }
   });

   //update book Database

   database.books.forEach((book)=>{
     if(book.ISBN=== req.params.isbn){ 
       book.publication=0; //no publication available
       return;
    }
   });
   return res.json({
     books:database.books,
     publications:database.publications,
   });
});

booky.listen(3000, () => console.log("Hey server is running! 😎"));
