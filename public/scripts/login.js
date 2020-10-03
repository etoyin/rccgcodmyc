$(document).ready(() => {

  function pageRedirect() {
    window.location.replace('/');
  }

  $(".close").click(() => {
    //$(".modal").css("display", "none");
    pageRedirect();
  });
  let local = JSON.parse(localStorage.getItem('admin-data'));
  if(local && local.message == 'Login successfully'){
    $('.auth').append(`<a class="nav-link logout" href="" >Logout</a>`)
  }
  else{
    $('.auth').append(`<a class="nav-link login" href="/login">Login</a>`)
  }
  
  $('.logout').click(() => {
    fetch('/logout', {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => console.log(res));

    localStorage.clear();
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
      console.log(res);
      localStorage.setItem('admin-data', JSON.stringify(res));
      console.log(JSON.parse(localStorage.getItem('admin-data')));
      if(res.message == 'Login successfully'){
        window.location.replace('/all-workers');
      }
      else{
        $('.error').text(`Wrong Username or Password`);
      }
    })

  })

})