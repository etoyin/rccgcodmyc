$(document).ready(() => {



  const mainProfileBody = (x, images) => {
    return `
      <div class="">
        <div class="text-center">
          <img src=${x.image_name.split(",")[0]} class="profile_img rounded-circle img-responsive" />
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
          <div class='text-center'>
            <h5 style='line-height: 30px'>Certificates</h5>
          </div>
          <div class='image text-center'>
            ${images.join(",")}
          </div>
        </div>
        <div style="display: flex; justify-content: center;">
          <button id='edit' class='btn btn-primary'>Edit details</button>
        </div>
      </div>
    `
  } 

  const getLocalStorage = JSON.parse(localStorage.getItem('user-data'));
  const token = getLocalStorage ? getLocalStorage.token : '';
  console.log(getLocalStorage);
  async function getProfile(url) {
    return response.json(); // parses JSON response into native JavaScript objects
  };

  let id = $('.hiddenP').text();
  let url = '/profile/' + id;
  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.data[0].id);
    let x = data.data ? data.data[0]: '';
    let name = (x.gender === 'male' ? 
              ( x.position == 'Pastorate' ? 'Pastor '+ x.name  : 'Bro. '+ x.name  ) : 
              ( x.position == 'Pastorate' ? 'Pastor(Mrs) '+ x.name : 'Sis. '+ x.name));
    storageData = getLocalStorage ? getLocalStorage : '';
    console.log(x);
    if(data.success == 1 && (x.id == getLocalStorage.data.id || getLocalStorage.admin)){
      let images = [];
      let z = '';
    
      if(x.image_name.split(",").length > 1){
        for(let y=1; y<x.image_name.split(",").length; y++){
          z = `<img src=${x.image_name.split(",")[y]} class="profile_img img-responsive"/>`
          images.push(z);
        }
      }
      console.log(x.image_name.split(",")[1])
      $('#profileName').append(name);
      $('.mainProfileBody').append(mainProfileBody(x, images));
      $('#edit').on('click', function(){
        alert('kkk');
        window.location.replace('/update');
      });
    }else{
      $('.mainProfileBody').append(`<h3>Unauthorized to view this page</h3>`);
    }
    if(!data){
      $('.mainProfileBody').append(`<h3>Unauthorized to view this page</h3>`);
    }
    console.log(data)
  })
  .catch((error) => {
    console.error('Error:', error);
    $('.mainProfileBody').append(`<h3>Unauthorized to view this page</h3>`);
  });
  
  //getProfile(url).then(res => console.log(res) );
  //console.log(data)

})