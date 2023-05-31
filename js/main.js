const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav__item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        hamburger.classList.add('open');
        nav.classList.add('open');
        menuNav.classList.add('open');
        navItems.forEach(item => item.classList.add('open'));

        showMenu = true;
    } else {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItems.forEach(item => item.classList.remove('open'));

        showMenu = false;
    }
}

// Hide menu on resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && showMenu) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItems.forEach(item => item.classList.remove('open'));

        showMenu = false;
    }
});

//console Signup Showcase 
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = form.querySelector('[name="email"]').value;
    const password = form.querySelector('[name="password"]').value;
    const number = form.querySelector('[name="number"]').value;
    const text = form.querySelector('[name="text"]').value;

    console.log(`Email: ${email} Password: ${password} Number: ${number} Text: ${text}`);
});


// function onSignIn(googleUser) {
//     // Get the Google user's ID token
//     var id_token = googleUser.getAuthResponse().id_token;
//     // Send the ID token to your server for authentication
//     // You can use a library like Axios or Fetch to make the API call
//     axios.post('/api/google-auth', {
//         id_token: id_token
//     }).then(function (response) {
//         // Handle the response from your server
//         console.log(response.data);
//     }).catch(function (error) {
//         // Handle errors
//         console.log(error);
//     });
// }