$(document).ready(() => {


  const getLocalStorage = JSON.parse(localStorage.getItem('admin-data'));
  const token = getLocalStorage ? getLocalStorage.token : '';
  console.log(token);
  async function getProfile(url) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    return response.json() // parses JSON response into native JavaScript objects
  };
  $('.eachUser').each( function(){
    $(this).click( function(){
      let id = $(this).children('.hidden-id').text();
      let url = '/profile/' + id;
      console.log(url)
      getProfile(url).then(res => {
        console.log(res)
      });
      
      ;
    });
  });

})