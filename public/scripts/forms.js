//const axios = require('axios');
//const { default: Axios } = require('axios');

$(document).ready(() => {
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

  let image = '';
  $('input[name="image"]').change(function(){
    if(this.files[0].size <= 500000){
     image = $('input[name="image"]')[0].files[0];
    }
    else{
      image = ''
    }
  })

  $('#submit-form').click((e) => {
    e.preventDefault();
    const name = $('input[name="name"]').val();
    const address = $('input[name="address"]').val();
    const number = $('input[name="number"]').val();
    const email = $('input[name="email"]').val();
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
    const other_comments = $('textarea[name="other"]').val();

    const state = {
      name,
      address,
      email,
      number,
      dob,
      gender,
      marital_status,
      education,
      water_baptism,
      training,
      position,
      departments,
      year_became_worker,
      year_joined_rccg,
      image,
      ordination,
      last_ordained_year,
      other_comments
    }

    Object.keys(state).map((key, i) => {
      if(state[key] == undefined){
        state[key] = '';
      }
    });
    

    let validateName = name.length >= 5;
    let errorMessagesName = (validateName) ? '': 'Your name must be more than 5 characters';
    $('.nameError').text(errorMessagesName);


    let validateNumber = typeof(Number(number)) === 'number' && number.length >= 11;
    let errorMessagesNumber = (validateNumber) ? '': 'Number empty or not up to 11 characters';
    $('.numberError').text(errorMessagesNumber);
    console.log(validateNumber);
    
    let validateAddress = address.length >= 10;
    let errorMessagesAddress = (validateAddress) ? '': 'Address must be more than 10 characters';
    $('.addressError').text(errorMessagesAddress);

    let validateEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let errorMessagesEmail = (validateEmail) ? '': 'Email empty or not correct.';
    $('.emailError').text(errorMessagesEmail);

    let validateDob = dob.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
    let errorMessagesDob = (validateDob) ? '': 'Fill your date of birth in the right format';
    $('.dobError').text(errorMessagesDob);

    let validateGender = gender !== '';
    let errorMessagesGender = (validateGender) ? '': 'Select a gender';
    $('.genderError').text(errorMessagesGender);

    let validateMarital = marital_status !== '';
    let errorMessagesMarital = (validateMarital) ? '': 'Select your marital status';
    $('.maritalError').text(errorMessagesMarital);

    let validateEducation = education !== '';
    let errorMessagesEducation = (validateEducation) ? '': 'Select your education level';
    $('.educationError').text(errorMessagesEducation);

    let validateWaterBapt = water_baptism !== '';
    let errorMessagesBaptism = (validateWaterBapt) ? '': 'Select an option here';
    $('.baptismError').text(errorMessagesBaptism);

    let validateTraining = training.length !== 0;
    errorMessagesTraining = (validateTraining) ? '': 'Check at least one box';
    $('.trainingError').text(errorMessagesTraining);

    let validateDepartment = departments.length !== 0;
    let errorMessagesDepartment = (validateDepartment) ? '': 'Check at least one department';
    $('.departmentError').text(errorMessagesDepartment);

    let validatePosition = position !== '';
    let errorMessagesPosition = (validatePosition) ? '': 'Select your position';
    $('.positionError').text(errorMessagesPosition);

    let validateWorkerYear = year_became_worker.match(/([12]\d{3})/);
    let errorMessagesWorkerYear = (validateWorkerYear) ? '': 'Fill this field';
    $('.workerYearError').text(errorMessagesWorkerYear);

    let validateRccgYear = year_joined_rccg.match(/([12]\d{3})/);
    let errorMessagesRccgYear = (validateRccgYear) ? '': 'Fill this field';
    $('.rccgYearError').text(errorMessagesRccgYear);

    let validateImage = image !== '';
    let imageError = (validateImage) ? '': 'Upload an image with size not more than 500kb';
    $('.imageError').text(imageError);

 

    let formValidate = validateAddress && validateDob &&
                    validateDepartment && validateEducation &&
                    validateEmail && validateGender &&
                    validateImage && validateMarital &&
                    validateName && validateNumber &&
                    validatePosition && validateRccgYear &&
                    validateTraining && validateWaterBapt &&
                    validateWorkerYear;
    

    if(formValidate){
      const fd = new FormData();
      fd.append('name', state.name);
      fd.append('address', state.address);
      fd.append('email', state.email);
      fd.append('number', state.number);
      fd.append('dob', state.dob);
      fd.append('gender', state.gender);
      fd.append('marital_status', state.marital_status);
      fd.append('education', state.education);
      fd.append('ordination', state.ordination);
      fd.append('water_baptism', state.water_baptism);
      fd.append('training', state.training);
      fd.append('position', state.position);
      fd.append('departments', state.departments);
      fd.append('year_became_worker', state.year_became_worker);
      fd.append('year_joined_rccg', state.year_joined_rccg);
      fd.append('last_ordained_year', state.last_ordained_year);
      fd.append('uploaded_img', state.image);
      fd.append('other_comments', state.other_comments);
      
      console.log(fd);
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

      
    }

  })
})