const myLibrary = [] //Books Array


function Book(name, author, pages, read) { // Books Object
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read
}

const handleAddBookButtonClick = () => {
    const dialog = document.getElementById("modal")
    const addNewBook = document.getElementById("addBook")
    addNewBook.addEventListener('click', () => {
        dialog.showModal()
    }) //Open the modal for the BookInfo

    const form = document.querySelector("#modal form");
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o recarregamento da página

        if (form.checkValidity()) {
            getBookInfo();   // Chama getBookInfo apenas se o formulário for válido
            dialog.close(); // Fecha o modal
        } else {
            // Opcional: força a exibição das mensagens de validação do formulário
            form.reportValidity();
        }
    });
    const close = document.getElementById("close")
    close.addEventListener('click',()=>{
        dialog.close()
    })
}


const getBookInfo = () => { //get the values of the inputs

    const bookName = document.getElementById("bookName").value

    const bookAuthor = document.getElementById("bookAuthor").value

    const bookPages = document.getElementById("bookPages").value

    const bookRead = document.getElementById("bookRead").checked

    const newBook = new Book(bookName, bookAuthor, bookPages, bookRead)
    myLibrary.push(newBook) //creat a new object in the library with the values of the inputs

    addBooktoList() // call the addBooktoList function / it render the Book in the DOM

    document.getElementById("bookName").value = ""
    document.getElementById("bookAuthor").value =
        document.getElementById("bookPages").value = ""
    document.getElementById("bookRead").checked = false //Clean the Inputs for a new book

}

const createHtmlElement = (type, className, innerHTML) => { //function to create HTML elements easily 
    const element = document.createElement(type)

    element.type = type,
        element.className = className,
        element.innerHTML = innerHTML

    return element

}


const addBooktoList = () => {

    let bookList = document.getElementById("bookList") // get the container where all the books will
    bookList.innerHTML = ""

    myLibrary.forEach((book, index) => {
        const bookContainer = createHtmlElement("div", "bookContainer", "") //create the main div for the book

        bookList.appendChild(bookContainer)
        bookContainer.setAttribute("data-index", index) //associates the book with it's index

        bookContainer.appendChild(createHtmlElement("p", "bookName", book.name))
        bookContainer.appendChild(createHtmlElement("p", "bookAuthor", `By ${book.author}`))
        bookContainer.appendChild(createHtmlElement("p", "bookpages", `${book.pages} Pages`))

        const bookReadedDiv = createHtmlElement("div", "bookReadedDiv", "")
        bookContainer.appendChild(bookReadedDiv)

        const bookReaded = createHtmlElement("button", "bookReaded", "Not Readed")
        
        bookReadedDiv.appendChild(bookReaded)
        bookReaded.addEventListener('click', () => {
            if(bookReaded.innerHTML === "Not Readed" ){
                bookReaded.style.backgroundColor = "rgba(11, 187, 84, 0.541)"  
                bookReaded.innerHTML = "Readed!"
                bookContainer.style.borderLeft = "6px solid rgb(13, 196, 104)"
            }
            else{
                bookReaded.style.backgroundColor = "rgba(169,3,41, 0.541)"  
                bookReaded.innerHTML = "Not Readed"
                bookContainer.style.borderLeft = "6px solid rgba(169,3,41,1)"
            }

        })
        if (book.read) {
            bookReaded.innerHTML = "Readed!"
            bookReaded.style.backgroundColor = "rgba(11, 187, 84, 0.541)"
            bookContainer.style.borderLeft = "6px solid rgb(13, 196, 104)"
            
            
        }
        const btnDiv = createHtmlElement("div","btnDiv","")
        bookContainer.appendChild(btnDiv)

        const deleteBook = createHtmlElement("button", "deleteBook", "");
        deleteBook.innerHTML = '<i class="fas fa-trash"></i>'; // Replace text with delete icon
        btnDiv.appendChild(deleteBook);
        deleteBook.addEventListener('click', () => {
            deleteFromLibrary(index);
        });

        const editBook = createHtmlElement("button", "editBook", "");
        editBook.innerHTML = '<i class="fas fa-edit"></i>'; // Replace text with edit icon
        btnDiv.appendChild(editBook);
        editBook.addEventListener('click', () => {
            editCurrentBook(book, index);
        });
        
    });
};
const deleteFromLibrary = (index) => {

    myLibrary.splice(index, 1)
    addBooktoList()
    console.log(myLibrary)


}



let selectCurrentBook = null

const editCurrentBook = (book, index) => {

    selectCurrentBook = index

    const editDialog = document.getElementById("editModal")
    editDialog.showModal()



    const bookName = document.getElementById("editBookName").value = book.name

    const bookAuthor = document.getElementById("editBookAuthor").value = book.author

    const bookPages = document.getElementById("editBookPages").value = book.pages

    const bookRead = document.getElementById("editBookRead").checked = book.read

    

}
const editClose = document.getElementById("editClose")
    editClose.addEventListener('click',()=>{
        const editDialog = document.getElementById("editModal")
    editDialog.showModal()
        editDialog.close()
    })





const editBookSubmit = document.getElementById("editBtn");

editBookSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const editDialog = document.getElementById("editModal");
    const book = myLibrary[selectCurrentBook];

    const editForm = document.querySelector("#editModal form");
    
    if (editForm.checkValidity()) {
        book.name = document.getElementById("editBookName").value;
        book.author = document.getElementById("editBookAuthor").value;
        book.pages = document.getElementById("editBookPages").value;
        book.read = document.getElementById("editBookRead").checked;

        addBooktoList();
        editDialog.close();

        document.getElementById("editBookName").value = "";
        document.getElementById("editBookAuthor").value = "";
        document.getElementById("editBookPages").value = "";
        document.getElementById("editBookRead").checked = false;
    } else {
      
        editForm.reportValidity();
    }
});



handleAddBookButtonClick()