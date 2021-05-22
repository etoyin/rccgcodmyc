let departments = [ "Technical", 
                    "Sanitation", 
                    "Drama", 
                    "Sunday School", 
                    "Security",
                    "Protocol",
                    "Ushering",
                    "Media",
                    "Prayer",
                    "Sign Language",
                    "Teen/Children",
                    "Welfare"
                  ];

let selectOptions = departments.map((department) => {
  return ('<option value="'+department+'">'+department+'</option>')
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
  

$(document).ready(function(){
  $("#successOk").click(function(){
    window.location.replace("/");
  })
  $("#submitBtn").on("click", function(e){
    e.preventDefault();
    let valid = true;
    
    if(avatar == ""){
      valid  = false;
      $("#avatar").addClass("invalid");
        let attr = $("#avatar").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "block");
            }
        });
    }else{
      $("#avatar").removeClass("invalid");
        let attr = $("#avatar").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "none");
            }
        });
    }
    if(sod == ""){
      console.log("no value")
    }
    else if(sod == null){
      valid  = false;
      $("#sod").addClass("invalid");
        let attr = $("#sod").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "block");
            }
        });
    }else{
      $("#sod").removeClass("invalid");
        let attr = $("#sod").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "none");
            }
        });
    }
    if(bapt == ""){
      console.log("no value")
    }
    else if(bapt == null){
      valid  = false;
      $("#bapt").addClass("invalid");
        let attr = $("#bapt").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "block");
            }
        });
    }else{
      $("#bapt").removeClass("invalid");
        let attr = $("#bapt").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "none");
            }
        });
    }
    if(worker == ""){
      console.log("no value")
    }
    else if(worker == null){
      valid  = false;
      $("#worker").addClass("invalid");
        let attr = $("#worker").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "block");
            }
        });
    }else{
      $("#worker").removeClass("invalid");
        let attr = $("#worker").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "none");
            }
        });
    }
    if(bibleCol == ""){
      console.log("no value")
    }
    else if(bibleCol == null){
      valid  = false;
      $("#bibleCol").addClass("invalid");
        let attr = $("#bibleCol").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "block");
            }
        });
    }else{
      $("#bibleCol").removeClass("invalid");
        let attr = $("#bibleCol").attr("id");
        $(".errorField").each(function(){
          if($(this).attr("errorField") == attr){
              $(this).css("display", "none");
            }
        });
    }
    if(valid){
      $(".overlay_loader").css("width", "100%");
      const fd = new FormData();
      fd.append('name', state.name);
      fd.append('address', state.address);
      fd.append('email', state.email);
      fd.append('password', state.password);
      fd.append('number', state.number);
      fd.append('dob', state.dob);
      fd.append('gender', state.gender);
      fd.append('marital_status', state.marital_status);
      fd.append('education', state.education);
      fd.append('ordination', state.ordination);
      fd.append('water_baptism', state.water_baptism);
      fd.append('training', state.training);
      fd.append('position', state.position);
      fd.append('hodDepartment', state.hodDepartment);
      fd.append('departments', state.departments);
      fd.append('year_became_worker', state.year_became_worker);
      fd.append('year_joined_rccg', state.year_joined_rccg);
      fd.append('last_ordained_year', state.last_ordained_year);
      fd.append('image', state.avatar);
      fd.append('image', state.bapt);
      fd.append('image', state.worker);
      fd.append('image', state.sod);
      fd.append('image', state.bibleCol);
      fd.append('other_comments', state.other_comments);
      
      function pageRedirect() {
        window.location.replace('/');
      }
    
      fetch('/register', {
        method: 'POST',
        body: fd,
      })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if(res.success == 1){
          $(".overlay_loader").css("width", "0%");
          $(".overlay_success").css("width", "100%");
        }else{
          $(".overlay_loader").css("width", "0%");
          alert("Your email address might have been used for registration before")
        }
      })
    }
  });
  
  
  $("input, select, textarea").addClass("form-control");
  
  $("#nextBtn").click(function(){
    if (currentTab < ($(".tab").length - 1)) {
      nextPrev(1)
    }
  })
  $("#prevBtn").click(function(){
    nextPrev(-1)
  })
  let avatar="",bapt="",worker="",sod="",bibleCol="";
  $('input[id="avatar"]').change(function(){
    if(this.files[0].size <= 1000000){
     avatar = $('input[id="avatar"]')[0].files[0];
    }
    else{
      avatar = ''
    }
    state.avatar = avatar;
  });
  $('input[id="bibleCol"]').change(function(){
    if(this.files[0].size <= 1000000){
     bibleCol = $('input[id="bibleCol"]')[0].files[0];
    }
    else{
      bibleCol = null
    }
    state.bibleCol = bibleCol
  });
  $('input[id="worker"]').change(function(){
    if(this.files[0].size <= 1000000){
     worker = $('input[id="worker"]')[0].files[0];
    }
    else{
      worker = null
    }
    state.worker = worker
  });
  $('input[id="sod"]').change(function(){
    if(this.files[0].size <= 1000000){
     sod = $('input[id="sod"]')[0].files[0];
    }
    else{
      sod = null
    }
    state.sod = sod;
  });
  $('input[id="bapt"]').change(function(){
    if(this.files[0].size <= 1000000){
     bapt = $('input[id="bapt"]')[0].files[0]
    }
    else{
      bapt = null
    }
    state.bapt = bapt
  });
  let state = {};
  let pswd = "";
  let departments;
  let trainings;
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  let tabs = $(".tab");
  $(".tab").each(function(i, each){
    $(this).find(".position").on('change', function(){
      if($(this).val() == 'HOD'){
        $(".hodDepartment-parent").html(`<p>
        <p class="errorField" errorField="hodDepartment">select the depart you are heading</p>
        <select type="text" errorField="hodDepartment" class="hodDepartment input required" id="hodDepartment">
          <option value="">Department</option>
          ${selectOptions}
        </select></p>
        `)
      }
      else{
        $('select.hodDepartment').remove();
      }
    })
  	if(n == i){
    	$(this).css("display", "block")
    }
  });
  
  if (n == 0) {
    $("#prevBtn").css("display","none");
  } else {
      $("#prevBtn").css("display","inline");
  }
  if (n == (tabs.length - 1)) {
    $("#nextBtn").css("display", "none");
    $("#submitBtn").css("display", "inline");
  } else {
    $("#nextBtn").css("display", "inline");
    $("#submitBtn").css("display", "none");
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  let tabs = $(".tab");
  
  departments = departmentsInArray();
  trainings = trainingInArray();

  console.log(validateForm());


  if (n == 1 && !validateForm()) return false;

  
  $(".tab").each(function(i){
  	if(currentTab == i){
      $(this).find(".input").each(function(){
        if($(this).attr("data-type") == "checkbox"){
          if($(this).attr("data-department") == "departments"){
            state.department = departments;
          }
           if($(this).attr("data-training") == "trainings"){
            state.training = trainings;
          }
        } else if($(this).attr("type") == "file"){
          if($(this).attr("data-avatar") == "avatar"){
            state.avatar = avatar;
          }
           if($(this).attr("data-bapt") == "bapt"){
            state.bapt = bapt;
          }
          if($(this).attr("data-worker") == "worker"){
            state.worker = worker;
          }
          if($(this).attr("data-sod") == "sod"){
            state.sod = sod;
          }
          if($(this).attr("data-bibleCol") == "bibleCol"){
            state.bible = bibleCol;
          }
        }      
        else{
          let attr = $(this).attr("id");
          state[attr] = $(this).val();
        }
      })
      console.log(state);
    	$(this).css("display", "none")
    }
  });
  
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= tabs.length) {
    // ... the form gets submitted:
    
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let valid = true;
  
  $(".tab").each(function(i){
  	if(currentTab == i){
      $(this).find(".notRequired").each(function(){
        if($(this).val() == ""){
          valid = true
        }
        else{
          if($(this).val() == null){
            valid  = false;
            $(this).addClass("invalid");
            let attr = $(this).attr("id");
            $(".errorField").each(function(){
              if($(this).attr("errorField") == attr){
                  $(this).css("display", "block");
                }
            });
          }else{
            $(this).removeClass("invalid");
            let attr = $(this).attr("id");
            $(".errorField").each(function(){
              if($(this).attr("errorField") == attr){
                  $(this).css("display", "none");
                }
            });
          }
        }
      })
    	$(this).find(".required").each(function(i){
        console.log(i);
        switch($(this).attr("id")){
          case "email":
            let emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(String($(this).val()).toLowerCase());
            if(!emailValid){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
              console.log("hhhhhhh")
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
            };
            break;
          case "password":
            if($(this).val().length < 6){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
              pswd = $(this).val();
              // console.log("hhhhhhh")
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
            }
            break;
          case "confirm_password":
            if($(this).val() != pswd){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
              console.log("hhhhhhh")
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
            }
            break;
          case "phone":
            if(typeof(Number($(this).val())) !== 'number' || $(this).val().length < 11){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });

            }
            break;
          case "dob":
            let validDob = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(String($(this).val()));
            if(!validDob){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
            }
            break;
          case "position":
            if($(this).val() == "HOD"){
              let hodDepartment = $(".hodDepartment").val();
              if(hodDepartment == '' || !departments.includes(hodDepartment)){
                valid  = false;
                $(this).addClass("invalid");
                  let attr = $(this).attr("id");
                  $(".errorField").each(function(){
                    if($(this).attr("errorField") == attr){
                        $(this).css("display", "block");
                      }
                  });
              }else{
                $(this).removeClass("invalid");
                  let attr = $(this).attr("id");
                  $(".errorField").each(function(){
                    if($(this).attr("errorField") == attr){
                        $(this).css("display", "none");
                      }
                  });

              }
            }else{
              if($(this).val().length < 1){
                valid  = false;
                $(this).addClass("invalid");
                  let attr = $(this).attr("id");
                  $(".errorField").each(function(){
                    if($(this).attr("errorField") == attr){
                        $(this).css("display", "block");
                      }
                  });
              }else{
                console.log("hhhhhhh")
                $(this).removeClass("invalid");
                  let attr = $(this).attr("id");
                  $(".errorField").each(function(){
                    if($(this).attr("errorField") == attr){
                        $(this).css("display", "none");
                      }
                  });
                  
              }
              
            }
            break;
          case "training":
            if(trainings.length < 1){
              console.log(trainings.length)
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
                console.log(trainings);
                valid = true;
                console.log(valid);
            }
            break;
          case "department":
            if(departments.length < 1){
              console.log("jjjjjjjjjjjjjjjjjj");
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
              console.log("hhhhhhh")
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
            }
            break;
          case "year_joined_rccg":
            let vall = $(this).val();
            if(!vall.match(/([12]\d{3})/)){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
              console.log("hhhhhhh")
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
            }
            break;
          case "year_became_worker":
            let val = $(this).val();
            if(!val.match(/([12]\d{3})/)){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
              console.log("hhhhhhh")
            	$(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "none");
                    }
                });
            }
            break;
          case "avatar":
            if(avatar == ""){
              valid  = false;
              $(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                  if($(this).attr("errorField") == attr){
                      $(this).css("display", "block");
                    }
                });
            }else{
              console.log("hhhhhhh")
              $(this).removeClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                  if($(this).attr("errorField") == attr){
                      $(this).css("display", "none");
                    }
                });
            }
            break;
          default:
            if($(this).val().length < 1){
            	valid  = false;
            	$(this).addClass("invalid");
                let attr = $(this).attr("id");
                $(".errorField").each(function(){
                	if($(this).attr("errorField") == attr){
                    	$(this).css("display", "block");
                    }
                });
            }else{
            	$(this).removeClass("invalid");
              let attr = $(this).attr("id");
              $(".errorField").each(function(){
                if($(this).attr("errorField") == attr){
                    $(this).css("display", "none");
                  }
              });
            }
        }
        
      })
    }
  });
    // If the valid status is true, mark the step as finished and valid:
  console.log(valid)
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
})








