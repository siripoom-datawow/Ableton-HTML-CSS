const mobileMenu = document.querySelector('.menu')
const mobileLink = document.querySelector('.mobile-link-container')
const nersletterForm = document.getElementById('newsletter-form')

mobileMenu.addEventListener('click',()=>{
  mobileLink.style.display === 'none' || mobileLink.style.display === '' ? mobileLink.style.display = 'flex' : mobileLink.style.display = 'none'
})


nersletterForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const email = document.querySelector('.email')
  window.alert(`${email.value} submitted`)
})
