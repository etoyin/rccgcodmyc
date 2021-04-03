$(document).ready(() => {

  function pageRedirect() {
    window.location.replace('/');
  }

  
  $(".close").click(() => {
    //$(".modal").css("display", "none");
    pageRedirect();
  });

  $('#admin_login').click((e) => {
    e.preventDefault();
    const email = $('input[name="admin"]').val();
    const password = $('input[name="password"]').val();

    const state = {email, password}
    console.log(state);
    

    fetch('/admin_login', {
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
      if(res.genMessage == 'LoggedIn'){
        window.location.replace('/all-workers');
      }
      else{
        $('.error').text(`Wrong Username or Password`);
      }
    })

  })

})