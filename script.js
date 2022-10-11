function book(title , author, pages , read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
  }
  this.position = ""
}

const cards = document.querySelector('.cards');

let myLibrary = [];



function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("cbox1").checked;
  if (title == "" || author == "" || pages == "" || typeof(pages) == "NaN") {
    alert("Please fill all the fields");
    return
  }
  /**Add element to array */
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("pages").value = '';
  document.getElementById("cbox1").checked = '';
  book.prototype.toggleRead = function() {
    this.read = !this.read;
    changeImg(this.position, this.read);
  }
  const newBook = new book(title , author, pages , read);
  myLibrary.push(newBook);
  myLibrary.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  displayCards();
}


/**To revome cards before creating anothers */
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

function changeImg(position , read){
  const card = document.getElementsByClassName(`number${position}`)[0];
  card.firstChild.setAttribute('src', read ? "./images/openBook.svg" : "./images/closedBook.svg")

}


function displayCards(){
  const cartas = document.getElementsByClassName("card");
  if (cartas.length != 0) {
      removeElementsByClass('card');
  }
  /**create cards */
  let i = 0
  for (const book of myLibrary){
    book.position = i;
    //create checkbox
    const label = document.createElement('div');
    label.setAttribute('class','options');
    const bookRead = document.createElement('input');
    bookRead.setAttribute('type', 'checkbox');
    bookRead.setAttribute('class', 'checkbox');
    bookRead.checked = book.read;
    bookRead.addEventListener('change', (Event) => book.toggleRead());
    const bookReadLabel = document.createElement('label');
    bookReadLabel.setAttribute('class', 'askread');
    bookReadLabel.textContent = "Read?";
    bookReadLabel.setAttribute('style', 'display: inline');
    //text of book info
    const bookInfo = document.createElement('p');
    bookInfo.setAttribute('class', 'bookInfo');
    bookInfo.setAttribute('style', 'white-space: pre-line');
    bookInfo.textContent = book.title + "\r\n" + book.author + "\r\n" + book.pages + " pages";
    //create remove button
    const bookRemove = document.createElement('button');
    //bookRemove.textContent = "Delete";
    const svgIcon = document.createElement('img');
    svgIcon.setAttribute('class','deleteIcon');
    svgIcon.setAttribute('src' , "./images/delete.svg");
    svgIcon.setAttribute('style' , "role:img");
    svgIcon.setAttribute('style' , "height:10");
    svgIcon.setAttribute('style' , "width:10");
    svgIcon.setAttribute('style' , "viewBox:0 0 10 10");
    svgIcon.setAttribute('style' , "aria-hidden:true");
    svgIcon.setAttribute('style' , "focusable:false");
    bookRemove.addEventListener('click', function(e) {
      if (confirm("Are you sure?")){
      const toBeRemoved = document.getElementsByClassName(`number${book.position}`)
      cards.removeChild(toBeRemoved[0]);
      myLibrary.splice(book.position , 1);
      console.table(myLibrary);
      }
    });
    //create container
    const card = document.createElement('div');
    card.setAttribute('class', `card number${i}`);
    i++;
    card.setAttribute('draggable', 'false');
    //put svg img in book
    const bookImg = document.createElement('img');
    bookImg.setAttribute('class','bookImg');
    bookImg.setAttribute('src', book.read ? "./images/openBook.svg" : "./images/closedBook.svg");
    bookImg.setAttribute('alt', book.read ? "Open book" : "Closed book");
    //bookImg.addEventListener('click', (Event) => changeCustomImg());
    //put elements in position
    card.appendChild(bookImg)
    card.appendChild(bookInfo);
    card.appendChild(bookRead);
    label.appendChild(bookRead);
    label.appendChild(bookReadLabel);
    bookRemove.appendChild(svgIcon);
    label.appendChild(bookRemove);
    card.appendChild(label);
    cards.appendChild(card);
  };
};