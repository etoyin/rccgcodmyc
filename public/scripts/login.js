$(document).ready(() => {

  function pageRedirect() {
    window.location.replace('/');
  }

  
  $(".close").click(() => {
    //$(".modal").css("display", "none");
    pageRedirect();
  });
  let adminLocalStorage = JSON.parse(localStorage.getItem('user-data'));
  if(adminLocalStorage && adminLocalStorage.genMessage == 'LoggedIn'){
    $('.dashboard').append(`<a class="nav-link dashboard" href="/dashboard">Dashboard</a>`);
    if(!adminLocalStorage.admin){
      $('.profilePage').append(`<a class="nav-link profilePage" href="/profile/${adminLocalStorage.data.id}">Profile</a>`);
    }
    $('.auth').append(`<a class="nav-link logout" >Logout</a>`);
  }
  else{
    $('.auth').append(`<a class="nav-link login" href="/login">Login</a>`);
    $('.admin').append(`<a class="nav-link login" href="/admin_login">Admin Login</a>`);
    $('.register').append(`<a class="nav-link" href="/register">Register</a>`)
  }
  
  $('.logout').click(() => {
    localStorage.clear();
    pageRedirect();
  })


  $('#login').click((e) => {
    e.preventDefault();
    const email = $('input[name="admin"]').val();
    const password = $('input[name="password"]').val();

    const state = {email, password}
    console.log(state);
    

    fetch('/login', {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
    .then(res => res.json())
    .then(res => {
      //console.log(res);
      localStorage.setItem('user-data', JSON.stringify(res));
      //console.log(JSON.parse(localStorage.getItem('user-data')));
      if(res.message == 'Login successfully'){
        window.location.replace('/dashboard');
      }
      else{
        $('.error').text(`Wrong Username or Password`);
      }
    })

  })

})