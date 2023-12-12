class BookShop {
  discountRateByBookNumber ;
  topRatedBooks;
  setDiscountRateByBookNumber (promotions) {
    this.discountRateByBookNumber = {...promotions}
  }

  setTopRatedBooks (books){
    this.topRatedBooks = books
  }

  priceSummation (data) {
    let result = []
    const bookPrice = 80
    let transaction = {...data}

    while (Object.keys(transaction).length !== 0 ) {
      let sum = []

      Object.keys(transaction).map(key => {
          if (transaction[key] == 0){
            delete transaction[key]
          } else {
            sum.push(transaction[key])
            transaction[key] -= 1
          }
        })
        const basePrice = sum.length*bookPrice
        const newResult = sum.length > 1
            ? basePrice*this.discountRateByBookNumber[sum.length]
            : basePrice
        result.push(newResult)
    }
    return result.reduce((prev,curr)=>prev+curr,0)
  }
}


const BookShopA = new BookShop()
BookShopA.setDiscountRateByBookNumber({2:0.95, 3:0.9, 4:0.8,  5:0.75});
BookShopA.setTopRatedBooks(['Book_a', 'Book_b', 'Book_c', 'Book_d', 'Book_e'])

const booksList = document.querySelector('.book-container')

const booksDivElements = BookShopA.topRatedBooks.map((book)=>{
  const bookElement = document.createElement('div');
  bookElement.classList.add('book-card');

  const bookName = document.createElement('h2')
  bookName.classList.add('book-name')
  bookName.innerHTML = book

  const addDelElement = document.createElement('div');
  addDelElement.classList.add('add-del');

  const buttonDel = document.createElement('button')
  buttonDel.classList.add('del')
  buttonDel.innerHTML = "-"
  buttonDel.addEventListener('click',()=>{
    inputBook.value = inputBook.value == 0? 0 : Number(inputBook.value) - 1;
  })

  const buttonAdd = document.createElement('button')
  buttonAdd.classList.add('add')
  buttonAdd.innerHTML = "+"
  buttonAdd.addEventListener('click',()=>{
    inputBook.value = Number(inputBook.value) + 1;
  })


  const inputBook = document.createElement('input')
  inputBook.classList.add('input-Book')
  inputBook.classList.add(`sum-${book}`)

  inputBook.value = 0

  addDelElement.appendChild(buttonDel)
  addDelElement.appendChild(inputBook)
  addDelElement.appendChild(buttonAdd)

  bookElement.appendChild(bookName)
  bookElement.appendChild(addDelElement)

  return bookElement
})

  booksDivElements.map((bookElement)=>{
    booksList.appendChild(bookElement)
  })



const submitBtn = document.querySelector('.submit-btn')
const total = document.querySelector('.total')
const discount = document.querySelector('.discount')
const summation = document.querySelector('.summation')
const thanks = document.querySelector('.thanks')


submitBtn.addEventListener('click', ()=>{
  const transactionData = {}
  let sumBook = 0
  const bookPrice = 80

  BookShopA.topRatedBooks.forEach( book=> {
    let numBook = document.querySelector(`.sum-${book}`)
    transactionData[book] = Number(numBook.value)
    sumBook += Number(numBook.value)
    numBook.value = 0
  });
  total.innerHTML = `Total prices: ${bookPrice*sumBook} $`
  summation.innerHTML = `Summation: ${BookShopA.priceSummation(transactionData)} $`
  discount.innerHTML = `Discount: ${bookPrice*sumBook - BookShopA.priceSummation(transactionData)} $`
  thanks.innerHTML = 'Thanks you ❤️️'
})
