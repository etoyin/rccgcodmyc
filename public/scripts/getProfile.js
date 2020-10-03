$(document).ready(() => {
  const mainProfileBody = (x) => {
    return `
      <div class="">
        <div class="text-center">
          <img src=${x.image_name} class="profile_img rounded-circle img-responsive" />
          <h5></h5>
        </div>
        <div class="table-div">
          <table>
            <tbody>
              <tr>
                <td class="table_label"><b>Name: </b></td>
                <td class="">${x.name}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Email: </b></td>
                <td class="">${x.email}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Date of Birth: </b></td>
                <td class="">${x.dob}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Marital Status: </b></td>
                <td class="">${x.marital_status}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Highest Qualification: </b></td>
                <td class="">${x.education}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Baptized By Immersion?: </b></td>
                <td class="">${x.water_baptism}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Year Joined RCCG: </b></td>
                <td class="">${x.year_joined_rccg}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Year Became a Worker: </b></td>
                <td class="">${x.year_became_worker}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Year Ordained Last: </b></td>
                <td class="">${x.last_ordained_year}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Current Ordination: </b></td>
                <td class="">${x.ordination}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Department(s): </b></td>
                <td class="">${x.departments.split(",").join(", ")}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Training(s) received in RCCG: </b></td>
                <td class="">${x.training.split(",").join(", ")}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Position in Church: </b></td>
                <td class="">${x.position}</td>
              </tr>
              <tr>
                <td class="table_label"><b>Other Information: </b></td>
                <td class="">${x.other_comments}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  } 

  const getLocalStorage = JSON.parse(localStorage.getItem('admin-data'));
  const token = getLocalStorage ? getLocalStorage.token : '';
  console.log(token);
  async function getProfile(url) {
    
    return response.json() // parses JSON response into native JavaScript objects
  };

  let id = $('.hiddenP').text();
  let url = '/prof/' + id;
  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => response.json())
  .then(data => {
    let x = data.data ? data.data[0]: '';
    let name = (x.gender === 'male' ? 
              ( x.position == 'Pastorate' ? 'Pastor '+ x.name  : 'Bro. '+ x.name  ) : 
              ( x.position == 'Pastorate' ? 'Pastor(Mrs) '+ x.name : 'Sis. '+ x.name))
    if(data.success == 1){
      $('#profileName').append(name);
      $('.mainProfileBody').append(mainProfileBody(x));
    }else{
      $('.mainProfileBody').append(`<h3>${data.message}: Login to access this page</h3>`);
    }
    console.log(data)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  //getProfile(url).then(res => console.log(res) );
  //console.log(data)

})