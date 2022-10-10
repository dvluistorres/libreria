function book(title , author, pages , read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
  }
  this.position = myLibrary.length
}

const cards = document.querySelector('.cards');

let myLibrary = [];



function addBookToLibrary() {
  /**Add element to array */
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("cbox1").checked;
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("pages").value = '';
  document.getElementById("cbox1").checked = '';
  book.prototype.toggleRead = function() {
    this.read = !this.read;
  }
  const newBook = new book(title , author, pages , read);
  myLibrary.push(newBook);
  myLibrary.sort();
  displayCards();
}


/**To revome cards before creating anothers */
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}


function displayCards(){
  const cartas = document.getElementsByClassName("card");
  if (cartas.length != 0) {
      removeElementsByClass('card');
  }

/**create cards */
let i = 0
  for (const book of myLibrary){
    //create checkbox
    const bookRead = document.createElement('input');
    bookRead.setAttribute('type', 'checkbox');
    bookRead.checked = book.read;
    bookRead.addEventListener('change', (Event) => book.toggleRead());
    const bookReadLabel = document.createElement('label');
    bookReadLabel.textContent = "Read?";
    bookReadLabel.setAttribute('style', 'visibility: hidden');
    //text of book info
    const bookInfo = document.createElement('p');
    bookInfo.setAttribute('class', 'bookInfo');
    bookInfo.setAttribute('style', 'white-space: pre-line');
    bookInfo.textContent = book.title + "\r\n" + book.author + "\r\n" + book.pages;
    //create remove button
    const bookRemove = document.createElement('button');
    bookRemove.textContent = "Delete";
    bookRemove.addEventListener('click', function(e) {
      if (confirm("Are you sure?")){
      const toBeRemoved = document.getElementsByClassName(`number${book.position}`)
      console.log(toBeRemoved)
      cards.removeChild(toBeRemoved[0]);
      myLibrary.pop(book.position);
      }
    });
    //create container
    const card = document.createElement('div');
    card.setAttribute('class', `card number${i}`);
    i++;
    card.setAttribute('draggable', 'false');
    //put elements in position
    cards.appendChild(card);
    card.appendChild(bookInfo);
    card.appendChild(bookRead);
    card.appendChild(bookRemove);
}}