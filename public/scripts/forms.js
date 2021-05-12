//const axios = require('axios');
//const { default: Axios } = require('axios');
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
})
$(document).ready(() => {
  //SELECT HOD AND DEPARTMENT HEAD
  $('#position-input').on('change', function(){
    
    //compute();
    if($(this).val() == 'HOD'){
      $('.position-div').append(`
      <select type="text" class="hodDepartment form-control" name="hodDepartment" required>
        <option value="">Department</option>`
      + selectOptions +

      `</select>
      `)
    }
    else{
      $('select.hodDepartment').remove();
    }
  });

  const departmentsArray = () => {
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

  let profile = '', 
      bapt = '', 
      bc = '', 
      sod = '', 
      wt = '';
  
  $('input[id="profile"]').change(function(){
    if(this.files[0].size <= 1000000){
     profile = $('input[id="profile"]')[0].files[0]
    }
    else{
      profile = ''
    }
  });
  $('input[id="bapt"]').change(function(){
    if(this.files[0].size <= 1000000){
      bapt = $('input[id="bapt"]')[0].files[0]
    }
    else{
      bapt = ''
    }
  });
  $('input[id="wt"]').change(function(){
    if(this.files[0].size <= 1000000){
     wt = $('input[id="wt"]')[0].files[0]
    }
    else{
      wt = ''
    }
  });
  $('input[id="sod"]').change(function(){
    if(this.files[0].size <= 1000000){
    sod = $('input[id="sod"]')[0].files[0]
    }
    else{
      sod = ''
    }
  });
  $('input[id="bc"]').change(function(){
    if(this.files[0].size <= 1000000){
     bc = $('input[id="bc"]')[0].files[0]
    }
    else{
      bc = ''
    }
  })

  $('#submit-form').click((e) => {
    e.preventDefault();
    const name = $('input[name="name"]').val();
    const address = $('input[name="address"]').val();
    const number = $('input[name="number"]').val();
    const email = $('input[name="email"]').val();
    const password = $('input[name="password"]').val();
    const confirm_password = $('input[name="confirm_password"]').val();
    const dob = $('input[name="dob"]').val();
    const gender = $('select[name="gender"]').val();
    const marital_status = $('select[name="marital_status"]').val();
    const education = $('select[name="education"]').val();
    const water_baptism = $('select[name="water_baptism"]').val();
    const ordination = $('select[name="ordination"]').val();
    const training = trainingInArray();
    const departments = departmentsArray();
    const last_ordained_year = $('input[name="last_ordained_year"]').val();
    const year_became_worker = $('input[name="year_became_worker"]').val();
    const year_joined_rccg = $('input[name="year_joined_rccg"]').val();
    const position = $('select[name="position"]').val();
    const hodDepartment = $('select[name="hodDepartment"]').val();
    const other_comments = $('textarea[name="other"]').val();

    const state = {
      name,
      address,
      email,
      number,
      password,
      dob,
      gender,
      marital_status,
      education,
      water_baptism,
      training,
      position,
      hodDepartment,
      departments,
      year_became_worker,
      year_joined_rccg,
      profile,
      bapt,
      wt,
      bc,
      sod,
      ordination,
      last_ordained_year,
      other_comments
    }
    const errorMessages = {
      name: '',
      number: '',
      address: '',
      email: '',
      password: '',
      confirm_password: '',
      dob: '',
      gender: '',
      marital: '',
      education: '',
      baptism: '',
      training: '',
      department: '',
      position: '',
      workerYear: '',
      rccgYear: '',
      imageError: '',
      hodDepartment: ''
    }

    Object.keys(state).map((key, i) => {
      if(state[key] == undefined){
        state[key] = '';
      }
    });    
    let validateBapt = true, 
        validateBc = true, 
        validateSod = true, 
        validateWt = true;

    let validateName = name.length >= 5;
    errorMessages.name = (validateName) ? '': 'Your name must be more than 5 characters';
    $('.nameError').text(errorMessages.name);

    let validatePassword = password.length >= 6;
    errorMessages.password = (validatePassword) ? '': 'Password must be more than 6 characters';
    $('.passwordError').text(errorMessages.password);

    let validateConfirmPassword = password === confirm_password;
    errorMessages.confirm_password = (validateConfirmPassword) ? '': 'Password does not match!';
    $('.passwordConfirmError').text(errorMessages.confirm_password);

    let validateNumber = typeof(Number(number)) === 'number' && number.length >= 11;
    errorMessages.number = (validateNumber) ? '': 'Number empty or not up to 11 characters';
    $('.numberError').text(errorMessages.number);
    
    let validateAddress = address.length >= 10;
    errorMessages.address = (validateAddress) ? '': 'Address must be more than 10 characters';
    $('.addressError').text(errorMessages.address);


    let validateEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(String(email).toLowerCase());;
    errorMessages.email = (validateEmail) ? '': 'Email empty or not correct.';
    $('.emailError').text(errorMessages.email);

    let validateDob = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(String(dob));
    errorMessages.dob = (validateDob) ? '': 'Fill your date of birth in the right format';
    $('.dobError').text(errorMessages.dob);

    let validateGender = gender !== '';
    errorMessages.gender = (validateGender) ? '': 'Select a gender';
    $('.genderError').text(errorMessages.gender);

    let validateMarital = marital_status !== '';
    errorMessages.marital = (validateMarital) ? '': 'Select your marital status';
    $('.maritalError').text(errorMessages.marital);

    let validateEducation = education !== '';
    errorMessages.education = (validateEducation) ? '': 'Select your education level';
    $('.educationError').text(errorMessages.education);

    let validateWaterBapt = water_baptism !== '';
    errorMessages.baptism = (validateWaterBapt) ? '': 'Select whether you are baptized or not';
    $('.baptismError').text(errorMessages.baptism);

    let validateTraining = training.length !== 0;
    errorMessages.training = (validateTraining) ? '': 'Check at least one church training';
    $('.trainingError').text(errorMessages.training);

    let validateDepartment = departments.length !== 0;
    errorMessages.department = (validateDepartment) ? '': 'Check at least one department';
    $('.departmentError').text(errorMessages.department);

    console.log(departments.includes(hodDepartment));
    let validatePosition = false;
    if(position == 'HOD'){
      if(hodDepartment !== '' && departments.includes(hodDepartment)){
        validatePosition = true;
        errorMessages.hodDepartment = '';
      }else{
        validatePosition = false;
        errorMessages.hodDepartment = `
        You have not selected a department you head or
        You need to you up and check the department you just selected as HOD
        `;
      }
    }else{
      validatePosition = position !== '';
      errorMessages.position = (validatePosition) ? '': 'Select your position in church';
      $('.positionError').text(errorMessages.position);
    }

    

    let validateHodDepartment = hodDepartment !== '';
    $('.hodDepartmentError').text(errorMessages.hodDepartment);

    let validateWorkerYear = year_became_worker.match(/([12]\d{3})/);
    errorMessages.workerYear = (validateWorkerYear) ? '': 'Indicate year became worker';
    $('.workerYearError').text(errorMessages.workerYear);

    let validateRccgYear = year_joined_rccg.match(/([12]\d{3})/);
    errorMessages.rccgYear = (validateRccgYear) ? '': 'Indicate year joined RCCG';
    $('.rccgYearError').text(errorMessages.rccgYear);

    let validateImage = profile !== '';
    errorMessages.imageError = (validateImage) ? '': 'Upload an image with size not more than 500kb';
    $('.imageError').text(errorMessages.imageError);

    if( $('input[id="bapt"]')[0].files[0]){
      validateBapt = $('input[id="bapt"]')[0].files[0] && bapt !== '';
      errorMessages.imageError = (validateBapt) ? '': 'Upload an image with size not more than 500kb';
      $('.imageError').text(errorMessages.imageError);
    }

    if( $('input[id="wt"]')[0].files[0]){
      validateWt = $('input[id="wt"]')[0].files[0] && wt !== '';
      errorMessages.imageError = (validateWt) ? '': 'Upload an image with size not more than 500kb';
      $('.imageError').text(errorMessages.imageError);
    }

    if( $('input[id="sod"]')[0].files[0]){
      validateSod = $('input[id="sod"]')[0].files[0] && sod !== '';
      errorMessages.imageError = (validateSod) ? '': 'Upload an image with size not more than 500kb';
      $('.imageError').text(errorMessages.imageError);
    }

    if( $('input[id="bc"]')[0].files[0]){
      validateBc = $('input[id="bc"]')[0].files[0] && bc !== '';
      errorMessages.imageError = (validateBc) ? '': 'Upload an image with size not more than 500kb';
      $('.imageError').text(errorMessages.imageError);
    }

    //let hodDepartmentTrue = $('select[name="position"]').val() == 'HOD' && validateHodDepartment ;
 
    let formValidate = validateAddress && validateDob &&
                    validateDepartment && validateEducation &&
                    validatePassword && validateConfirmPassword &&
                    validateEmail && validateGender &&
                    validateImage && validateMarital &&
                    validateName && validateNumber &&
                    validatePosition && validateRccgYear &&
                    validateTraining && validateWaterBapt && 
                    (validateWorkerYear || validateBapt ||
                    validateBc || validateWt ||
                    validateSod);
    
    console.log(formValidate);
    console.log(validatePosition);

    if(formValidate){
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
      fd.append('image', state.profile);
      fd.append('image', state.bapt);
      fd.append('image', state.wt);
      fd.append('image', state.sod);
      fd.append('image', state.bc);
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
      .then(result => {
        console.log('Success:', result);
        if(result.success == 1){
          $('.alert').removeClass('alert-danger');
          $('.alert').addClass('alert-success');
          $('.alert').append('<strong>Success!</strong> Data sent successfully');
          localStorage.setItem('user-data', JSON.stringify(res));
          setTimeout(pageRedirect(), 5000);
        }
        else{
          $('.alert').removeClass('alert-success');
          $('.alert').addClass('alert-danger');
          $('.alert').append('<strong>Danger!</strong> Not succesful, You might have used the email before. Try again with another!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }else{
      let str = '';
      let errArr = Object.keys(errorMessages).map((key, i) => {
        if(errorMessages[key].length > 0){
          return `<p key=${i}>${errorMessages[key]}</p>`
        }else{
          return ''
        }
      });
      //remove commas from array and convert to str
      for(let i=0; i<errArr.length; i++){
        str+=errArr[i];
      }
      
      $('#modal').append(`
        <div class="modal-content">
          <span class="close">&times;</span>
          <div>${str}</div>
        </div>
      `).addClass('modal').css('display', 'block');
      $('.close').click(function(){
        $('#modal').removeClass('modal');
        $('#modal').css('display', 'none');
        $('.modal-content').remove();

      })
    }

  })
})