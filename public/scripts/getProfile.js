$(document).ready(() => {
  $("#successReload").click(function(){
    window.location.reload();
  })

  const mainProfileBody = (x,profilePics, images) => {
    return `
    <div class="cards-container">
           
      <div
        class="cards-results-map vertical-center-row "
        style="align-items: flex-start" 
      >
          
        <section class='horizontal-center-column flex-start'>
          <div class="MainContent-header-second vertical-center-row">
                <p>Profile</p>
              </div>

          <div class="profileCard horizontal-center-column">
            <!-- profile card start from div up -->
            <p class="midHeadText full-width">Name</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="name" class="editable midHeadText2">${x.name}</p>
              <p id="nameBtn" class="midHeadText2" editMessage="name" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs edit"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Email Address</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="email" class="midHeadText2 editable">${x.email}</p>
              <p id="emailBtn" class="midHeadText2" style="color: dodgerblue">
                <!-- <i class="fas fa-edit fa-xs"></i>Edit -->
              </p>
            </span>
            <p class="midHeadText full-width">Address</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="address" style="width: 50%" class="midHeadText2 editable">${x.address}</p>
              <p id="addressBtn" class="midHeadText2" editMessage="address" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Phone</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="number" class="editable midHeadText2">${x.number}</p>
              <p  id="numberBtn" class="midHeadText2" editMessage="number" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Date of Birth</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="dob" class="editable midHeadText2">${x.dob}</p>
              <p id="dobBtn" class="midHeadText2" editMessage="dob" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Marital Status</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="marital_status" contenteditable class="editable midHeadText2">${x.marital_status}</p>
              <p id="marital_statusBtn" class="midHeadText2" editMessage="marital_status" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Education</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="education" contenteditable class="midHeadText2">${x.education}</p>
              <p id="educationBtn" class="midHeadText2" editMessage="education" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Baptised in Water</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="water_baptism" contenteditable class="midHeadText2">${x.water_baptism}</p>
              <p id="water_baptismBtn" class="midHeadText2" editMessage="water_baptism" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Church Training</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="training" style="width: 50%" class="midHeadText2">${x.training}</p>
              <p id="trainingBtn" class="midHeadText2" editMessage="training" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Departments</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="departments" style="width: 50%" class="midHeadText2">${x.departments}</p>
              <p id="departmentsBtn" class="midHeadText2" editMessage="departments" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Ordination Status</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="ordination" class="midHeadText2">${x.ordination}</p>
              <p id="ordinationBtn" class="midHeadText2" editMessage="ordination" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Year you were ordained last</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="last_ordained_year" contenteditable class="midHeadText2">${x.last_ordained_year}</p>
              <p id="last_ordained_yearBtn" class="midHeadText2" editMessage="last_ordained_year" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Year you became a Worker</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="year_became_worker" class="midHeadText2">${x.year_became_worker}</p>
              <p id="year_became_workerBtn" class="midHeadText2" editMessage="year_became_worker" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Year you joined RCCG</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="year_joined_rccg" class="midHeadText2">${x.year_joined_rccg}</p>
              <p id="year_joined_rccgBtn" class="midHeadText2" editMessage="year_joined_rccg" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Current Position in the Church</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="position" class="midHeadText2">${x.position}</p>
              <p id="positionBtn" class="midHeadText2" editMessage="position" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
            <p class="midHeadText full-width">Other information</p>
            <span
              class="vertical-center-row flex-space-betweeen full-width"
            >
              <p id="other_comments" class="midHeadText2">${x.other_comments}</p>
              <p id="other_commentsBtn" class="midHeadText2" editMessage="other_comments" style="color: dodgerblue">
                <i class="fas fa-edit fa-xs"></i>Edit
              </p>
            </span>
          </div>
        </section>

        <section>
          <div class="MainContent-header-second vertical-center-row">
          <p>Images</p>
          </div>

          <div class="profile-card-with-avater horizontal-center-column flex-space-betweeen">
            <button id="uploadImages" class="profileBtn" style="font-size: smaller; margin: 10px">Upload Certificates</button>
          </div>

          <div class="profile-card-with-avater horizontal-center-column flex-space-betweeen">
            <img class="s" width="100%" height="100%" src=${profilePics} />
          </div>
          ${images.join("")}    
          <div class="profile-card-with-avater horizontal-center-column flex-space-betweeen">
            <button class="changePassword profileBtn" style="font-size: smaller; margin: 10px">Change Password</button>
          </div>

        </section>


    </div>
  </div>
    
    
    `
  }

  const getLocalStorage = JSON.parse(localStorage.getItem('user-data'));
  const token = getLocalStorage ? getLocalStorage.token : '';
  async function getProfile(url) {
    return response.json(); // parses JSON response into native JavaScript objects
  };
  $(".hideOverlay").click(function(){
    $("#editOverlay").css("display", "none");
    $(".overlay_upload_images").css("display", "none")
  })
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
    let x = data.data ? data.data[0]: '';
    localStorage.setItem("userDetails", JSON.stringify(x));
    let name = (x.gender === 'male' ? 
              ( x.position == 'Pastorate' ? 'Pastor '+ x.name  : 'Bro. '+ x.name  ) : 
              ( x.position == 'Pastorate' ? 'Pastor(Mrs) '+ x.name : 'Sis. '+ x.name));
    storageData = getLocalStorage ? getLocalStorage : '';
    if(data.success == 1 && (x.id == getLocalStorage.data.id || getLocalStorage.admin)){
      let images = [];
      let z = '';
      let allImages = x.image_name.split(",");
      if(x.baptismalCertificate){
        allImages.push(x.baptismalCertificate);
      }
      if(x.workersCertificate){
        allImages.push(x.workersCertificate);
      }
      if(x.sodCertificate){
        allImages.push(x.sodCertificate);
      }
      if(x.collegeCertificate){
        allImages.push(x.collegeCertificate);
      }
      if(allImages.length > 1){
        for(let y=1; y < allImages.length; y++){
          z = `
            <div class="profile-card-with-avater horizontal-center-column flex-space-betweeen">
              <img src=${allImages[y]} class="" width="100%" height="100%"/>
            </div>
          `
          images.push(z);
        }
      }
      $('#profileName').append(name);
      $('.mainProfileBody').append(mainProfileBody(x, /*the first one which is the profile pics*/allImages[0], images));
    }else{
      $('.mainProfileBody').append(`<h3>Unauthorized to view this page</h3>`);
    }
    if(!data){
      $('.mainProfileBody').append(`<h3>Unauthorized to view this page</h3>`);
    }
    return data
  })
  .then((res) => {    
    let attr
    let state = res.data[0];
    state.training = state.training.split(",");
    state.departments = state.departments.split(",");
    state.password = "";
    $("p[editMessage]").on('click', function(){
      $("#editOverlay").css("display", "block");
      attr = $(this).attr("editMessage");
      $("span[valueToEdit]").text(attr);
      switch (attr) {
        case "number":
          $(".inputDiv").html(`<input id="editInput" type="number" class="form-control EditMsgCard-input" />`);
          break;
        case "dob":
          $(".inputDiv").html(`<input id="editInput" type="date" class="form-control EditMsgCard-input" />`);
          break;
        case "gender":
          $(".inputDiv").html(`
              <select id="editInput" errorField="gender" class="required input">
                <option value="">Select Gender</option>
                  <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
          `);
          break;
        case "marital_status":
          $(".inputDiv").html(`
              <select id="editInput" errorField="marital_status" class="input required">
                <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widow(er)">Widow(er)</option>
              </select>
          `);
          break;
        case "education":
          $(".inputDiv").html(`
              <select id="editInput" errorField="education" class="input required">
                <option value="">Select Education Qualification</option>
                <option value="PhD">PhD</option>
                <option value="Masters">Masters</option>
                <option value="PGD">PGD</option>
                <option value="Bachelor">Bachelor</option>
                <option value="HND">HND</option>
                <option value="OND">OND</option>
                <option value="NCE">NCE</option>
                <option value="Trade Certificate">Trade Certificate</option>
                <option value="SSCE">SSCE</option>
                <option value="BECE">BECE</option>
              </select>
          `);
          break;
        case "water_baptism":
          $(".inputDiv").html(`
              <select type="text" errorField="water_baptism" id="editInput" class="input required">
                <option value="">Water Baptism</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
          `);
          break;
        case "training":
          $(".inputDiv").html(`
              <div errorField="training" id="training" class="training required input" data-training="trainings" data-type="checkbox">
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="believer" value="Believer's Class">
                <label class="custom-control-label" for="believer" >
                  Believer's Class
                </label>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="baptC" value="Baptismal Class">
                <label class="custom-control-label" for="baptC">
                  Baptismal Class
                </label>
              </div> 
              <div class="training input custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="workC" value="Workers-in-training">
                <label class="custom-control-label" for="workC">
                  Workers-in-trainin
                </label>
              </div>
              <div class="training input custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="sodC" value="School of Disciples">
                <label class="custom-control-label" for="sodC">
                  School of Disciples
                </label>
              </div>
              <div class="training input custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="bible" value="Bible College">
                <label class="custom-control-label" for="bible">
                  Bible College
                </label>
              </div>
            </div>
          `);
          $(".training").find("input[type='checkbox']").each(function(i){
            let trai = state[attr];
            for (let j in trai){
              if(trai[j] == $(this).val()){
                $(this).prop('checked', 'true');
              }
            }
          });
          break;
        case "departments":
          $(".inputDiv").html(`
            <div errorField="departments" id="department" class="departments flexContainer" data-department="departments" data-type="checkbox">
              <div class="flex-item-left">
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="tech" value="Technical">
                  <label class="custom-control-label" for="tech">
                    Technical
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="san" value="Sanitation">
                  <label class="custom-control-label" for="san">
                    Sanitation
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="dra" value="Drama">
                  <label class="custom-control-label" for="dra">
                    Drama
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="cho" value="Choir">
                  <label class="custom-control-label" for="cho">
                    Choir
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="teen" value="Teens and Children">
                  <label class="custom-control-label" for="teen">
                    Teens/Children
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="sun" value="Sunday School">
                  <label class="custom-control-label" for="sun">
                    Sunday School
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="secu" value="Security">
                  <label class="custom-control-label" for="secu">
                    Security
                  </label>
                </div>
              </div>

              <div class="flex-item-right">
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="prot" value="Protocol">
                  <label class="custom-control-label" for="prot">
                    Protocol
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="wel" value="Welfare">
                  <label class="custom-control-label" for="wel">
                    Welfare
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="info" value="Information Bureau">
                  <label class="custom-control-label" for="info">
                    Information Bureau
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="ush" value="Ushering">
                  <label class="custom-control-label" for="ush">
                    Ushering
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="med" value="Media">
                  <label class="custom-control-label" for="med">
                    Media
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="pray" value="Prayer">
                  <label class="custom-control-label" for="pray">
                    Prayer
                  </label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="sig" value="Sign Language">
                  <label class="custom-control-label" for="sig">
                    Sign Language
                  </label>
                </div>
              </div>
            </div>
          `);
          $(".departments").find("input[type='checkbox']").each(function(i){
            let deptmt = state[attr];
            for (let j in deptmt){
              if(deptmt[j] == $(this).val()){
                $(this).prop('checked', 'true');
              }
            }
          });
          break;
        case "ordination":
          $(".inputDiv").html(`
            <select type="text" class="input" id="editInput">
              <option value="">Ordination Status</option>
              <option value="deacon">Deacon</option>
              <option value="asst_pastor">Assistant Pastor</option>
              <option value="pastor">Pastor</option>
            </select>
          `);
          break;
        case "last_year_ordained":
          $(".inputDiv").html(`
            <input 
            type="number"
            max="2021"
            min="1960"
            class="input" 
            id="editInput" 
            placeholder="Year Last Ordination">
          `);
          break;
        case "year_became_worker":
          $(".inputDiv").html(`
            <input 
            errorField="year_became_worker"
            type="number"
            max="2021"
            min="1960"
            class="input required" 
            id="editInput"
            placeholder="Year Became Worker *">
          `);
          break;
        case "year_joined_rccg":
          $(".inputDiv").html(`
            <input 
            errorField="year_joined_rccg"
            type="number"
            max="2021"
            min="1960"
            class="input required" 
            id="editInput" 
            placeholder="Year Joined RCCG *">
          `)
          break;
        case "position":
          $(".inputDiv").html(`
            <select id="editInput" errorField="position" type="text" class="input position required">
              <option value="">Current Position in Church</option>
              <option value="Worker">Worker</option>
              <option value="HOD">HOD</option>
              <option value="Minister">Minister</option>
              <option value="Pastorate">Pastorate</option>
            </select>
          `)
          break;
        default:
          $(".inputDiv").html(`<input type="text" class="form-control" >`)
          break;
      }

      $("#editInput").val(state[attr]);
      
      
    });
    $(".closeSuccess").click(function(){
      window.location.reload();
    });

    const departmentsInArray = () => {
      let arr = [];
      $('.departments input[type="checkbox"]:checked').each(function(){
        arr.push($(this).val());
      });
      return arr;
    }
    const trainingInArray = () => {
      let arr = [];
      $('.training input[type="checkbox"]:checked').each(function(){
        arr.push($(this).val());
      });
      return arr;
    }

    $("#submit").on('click', function(){
      let value;
      if(attr == "training"){
        value = trainingInArray();
      }else if(attr == "departments"){
        value = departmentsInArray();
      }else{
        value = $("#editInput").val();
      }
      state[attr] = value;

      console.log(state)
      if(value.length < 1){
        $(".errorClass").text("You need to fill in something!").css("display", "block");
      }else{
        $(".errorClass").css("display", "none").text("");
      }
      
      if(value.length > 0){
      $(".overlay_loader").css("display", "block");
        const getStorage = JSON.parse(localStorage.getItem('user-data'));
        const token = getStorage ? getStorage.token : '';
        let formData = new FormData();
        formData.append(attr, value);
        for(i in state){
          if(state[i] !== value){
            formData.append(i, state[i]);
          }
        }
        console.log(formData.getAll("name"));
        let options = {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        };

        fetch('/update', options)
        .then((res) => res.json())
        .then(res => {
          console.log(res)
          if (res.success){
            $(".overlay_loader").css("display", "none");
            $(".overlay_success").css("width", "100%");
            //$('.form').append(`<div class='alert alert-success'>${res.message}</div>`);
            
          }else{
            $(".overlay_loader").css("display", "none");
            //$('.form').append(`<div class='alert alert-danger'>Unsuccessful!</div>`)
            alert("Token Expired! Login to continue");
            //window.location.reload();
          }
        });
      }
    })

  })
  .catch((error) => {
    console.error('Error:', error);
    $('.mainProfileBody').append(`<h3>Unauthorized to view this page</h3>`);
  });
  
  //getProfile(url).then(res => console.log(res) );
  //console.log(data)

})