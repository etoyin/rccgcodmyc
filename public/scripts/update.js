//const axios = require('axios');
//const { default: Axios } = require('axios');
let u_departments = [ "Technical", 
                    "Sanitation", 
                    "Drama", 
                    "Sunday School", 
                    "Security",
                    "Protocol",
                    "Ushering",
                    "Media",
                    "Prayer",
                    "Sign Language",
                  ];

let u_selectOptions = u_departments.map((department) => {
  return ('<option value="'+department+'">'+department+'</option>')
});


$(document).ready(function(){
  const getStorage = JSON.parse(localStorage.getItem('user-data'));
  const data = getStorage.data;
  console.log(getStorage);
    $('input[name="u_name"]').val(data.name);
    $('input[name="u_address"]').val(data.address);
    $('input[name="u_number"]').val(data.number);
    $('input[name="u_email"]').val(data.email);
    $('input[name="u_password"]').val();
    $('input[name="u_confirm_password"]').val();
    $('input[name="u_dob"]').val(data.dob);
    $('select[name="u_gender"]').val(data.gender);
    $('select[name="u_marital_status"]').val(data.marital_status);
    $('select[name="u_education"]').val(data.education);
    $('select[name="u_water_baptism"]').val(data.water_baptism);
    $('select[name="u_ordination"]').val(data.ordination);
    $('input[name="u_last_ordained_year"]').val(data.last_ordained_year);
    $('input[name="u_year_became_worker"]').val(data.year_became_worker);
    $('input[name="u_year_joined_rccg"]').val(data.year_joined_rccg);
    $('select[name="u_position"]').val(data.position);
    $('select[name="u_hodDepartment"]').val(data.hodDepartment);
    $('textarea[name="u_other"]').val(data.other);





    $('#u_position-input').on('change', function(){
    
      //compute();
      if($(this).val() == 'HOD'){
        $('.position-div').append(`
        <select type="text" class="hodDepartment form-control" name="u_hodDepartment" required>
          <option value="">Department</option>`
        + u_selectOptions +
  
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
  
    let u_profile = '', 
        u_bapt = '', 
        u_bc = '', 
        u_sod = '', 
        u_wt = '';
    
    $('input[id="profile"]').change(function(){
      if(this.files[0].size <= 1000000){
       u_profile = $('input[id="profile"]')[0].files[0]
      }
      else{
        u_profile = ''
      }
    });
    $('input[id="bapt"]').change(function(){
      if(this.files[0].size <= 1000000){
        u_bapt = $('input[id="bapt"]')[0].files[0]
      }
      else{
        u_bapt = ''
      }
    });
    $('input[id="wt"]').change(function(){
      if(this.files[0].size <= 1000000){
       u_wt = $('input[id="wt"]')[0].files[0]
      }
      else{
        u_wt = ''
      }
    });
    $('input[id="sod"]').change(function(){
      if(this.files[0].size <= 1000000){
      u_sod = $('input[id="sod"]')[0].files[0]
      }
      else{
        u_sod = ''
      }
    });
    $('input[id="bc"]').change(function(){
      if(this.files[0].size <= 1000000){
       u_bc = $('input[id="bc"]')[0].files[0]
      }
      else{
        u_bc = ''
      }
    })
  
    $('#update-form').click((e) => {
      e.preventDefault();
      const u_name = $('input[name="u_name"]').val();
      const u_address = $('input[name="u_address"]').val();
      const u_number = $('input[name="u_number"]').val();
      const u_email = $('input[name="u_email"]').val();
      const u_password = $('input[name="u_password"]').val();
      const u_confirm_password = $('input[name="u_confirm_password"]').val();
      const u_dob = $('input[name="u_dob"]').val();
      const u_gender = $('select[name="u_gender"]').val();
      const u_marital_status = $('select[name="u_marital_status"]').val();
      const u_education = $('select[name="u_education"]').val();
      const u_water_baptism = $('select[name="u_water_baptism"]').val();
      const u_ordination = $('select[name="u_ordination"]').val();
      const u_training = trainingInArray();
      const u_departments = departmentsArray();
      const u_last_ordained_year = $('input[name="u_last_ordained_year"]').val();
      const u_year_became_worker = $('input[name="u_year_became_worker"]').val();
      const u_year_joined_rccg = $('input[name="u_year_joined_rccg"]').val();
      const u_position = $('select[name="u_position"]').val();
      const u_hodDepartment = $('select[name="u_hodDepartment"]').val();
      const u_other_comments = $('textarea[name="u_other"]').val();
  
      const state = {
        u_name,
        u_address,
        u_email,
        u_number,
        u_password,
        u_dob,
        u_gender,
        u_marital_status,
        u_education,
        u_water_baptism,
        u_training,
        u_position,
        u_hodDepartment,
        u_departments,
        u_year_became_worker,
        u_year_joined_rccg,
        u_profile,
        u_bapt,
        u_wt,
        u_bc,
        u_sod,
        u_ordination,
        u_last_ordained_year,
        u_other_comments
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
  
      let validateName = u_name.length >= 5;
      errorMessages.name = (validateName) ? '': 'Your name must be more than 5 characters';
      $('.nameError').text(errorMessages.name);
  
      let validatePassword = u_password.length >= 6;
      errorMessages.password = (validatePassword) ? '': 'Password must be more than 6 characters';
      $('.passwordError').text(errorMessages.password);
  
      let validateConfirmPassword = u_password === u_confirm_password;
      errorMessages.confirm_password = (validateConfirmPassword) ? '': 'Password does not match!';
      $('.passwordConfirmError').text(errorMessages.confirm_password);
  
      let validateNumber = typeof(Number(u_number)) === 'number' && u_number.length >= 11;
      errorMessages.number = (validateNumber) ? '': 'Number empty or not up to 11 characters';
      $('.numberError').text(errorMessages.number);
      
      let validateAddress = u_address.length >= 10;
      errorMessages.address = (validateAddress) ? '': 'Address must be more than 10 characters';
      $('.addressError').text(errorMessages.address);
  
  
      let validateEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(String(u_email).toLowerCase());;
      errorMessages.email = (validateEmail) ? '': 'Email empty or not correct.';
      $('.emailError').text(errorMessages.email);
  
      let validateDob = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(String(u_dob));
      errorMessages.dob = (validateDob) ? '': 'Fill your date of birth in the right format';
      $('.dobError').text(errorMessages.dob);
  
      let validateGender = u_gender !== '';
      errorMessages.gender = (validateGender) ? '': 'Select a gender';
      $('.genderError').text(errorMessages.gender);
  
      let validateMarital = u_marital_status !== '';
      errorMessages.marital = (validateMarital) ? '': 'Select your marital status';
      $('.maritalError').text(errorMessages.marital);
  
      let validateEducation = u_education !== '';
      errorMessages.education = (validateEducation) ? '': 'Select your education level';
      $('.educationError').text(errorMessages.education);
  
      let validateWaterBapt = u_water_baptism !== '';
      errorMessages.baptism = (validateWaterBapt) ? '': 'Select whether you are baptized or not';
      $('.baptismError').text(errorMessages.baptism);
  
      let validateTraining = u_training.length !== 0;
      errorMessages.training = (validateTraining) ? '': 'Check at least one church training';
      $('.trainingError').text(errorMessages.training);
  
      let validateDepartment = u_departments.length !== 0;
      errorMessages.department = (validateDepartment) ? '': 'Check at least one department';
      $('.departmentError').text(errorMessages.department);
  
      //console.log(departments.includes(hodDepartment));
      let validatePosition = false;
      if(u_position == 'HOD'){
        if(u_hodDepartment !== '' && u_departments.includes(u_hodDepartment)){
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
        validatePosition = u_position !== '';
        errorMessages.position = (validatePosition) ? '': 'Select your position in church';
        $('.positionError').text(errorMessages.position);
      }
  
      
  
      let validateHodDepartment = u_hodDepartment !== '';
      $('.hodDepartmentError').text(errorMessages.hodDepartment);
  
      let validateWorkerYear = /\b(19|[2-9][0-9])\d{2}\b/.test(u_year_became_worker);
      errorMessages.workerYear = (validateWorkerYear) ? '': 'Indicate year became worker';
      $('.workerYearError').text(errorMessages.workerYear);
  
      let validateRccgYear = /\b(19|[2-9][0-9])\d{2}\b/.test(u_year_joined_rccg);
      console.log();
      errorMessages.rccgYear = (validateRccgYear) ? '': 'Indicate year joined RCCG';
      $('.rccgYearError').text(errorMessages.rccgYear);
  
      let validateImage = u_profile !== '';
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
  
      //let hodDepartmentTrue = $('select[name="u_position"]').val() == 'HOD' && validateHodDepartment ;
   
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
      
      const token = getStorage ? getStorage.token : '';
      console.log(formValidate);
      console.log(validateRccgYear);
  
      if(true){
        const fd = new FormData();
        fd.append('name', state.u_name);
        fd.append('address', state.u_address);
        fd.append('email', state.u_email);
        fd.append('password', state.u_password);
        fd.append('number', state.u_number);
        fd.append('dob', state.u_dob);
        fd.append('gender', state.u_gender);
        fd.append('marital_status', state.u_marital_status);
        fd.append('education', state.u_education);
        fd.append('ordination', state.u_ordination);
        fd.append('water_baptism', state.u_water_baptism);
        fd.append('training', state.u_training);
        fd.append('position', state.u_position);
        fd.append('hodDepartment', state.u_hodDepartment);
        fd.append('departments', state.u_departments);
        fd.append('year_became_worker', state.u_year_became_worker);
        fd.append('year_joined_rccg', state.u_year_joined_rccg);
        fd.append('last_ordained_year', state.u_last_ordained_year);
        fd.append('image', state.u_profile);
        fd.append('image', state.u_bapt);
        fd.append('image', state.u_wt);
        fd.append('image', state.u_sod);
        fd.append('image', state.u_bc);
        fd.append('other_comments', state.u_other_comments);
        fd.append('id', getStorage.data.id);

        console.log(state);
        console.log(fd);
        function pageRedirect() {
          window.location.replace('/profile/' + getStorage.data.id);
        };
        let options = {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: fd,
        };
        delete options.headers['Content-Type'];// to allow browser set automatically
        fetch('/update', options)
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log('Success:', result);
          if(result.success == 1){
            $('.alert').removeClass('alert-danger');
            $('.alert').addClass('alert-success');
            $('.alert').append('<strong>Success!</strong> Profile Updated successfully');
            localStorage.setItem('user-data', JSON.stringify(result));
            setTimeout(pageRedirect(), 5000);
          }
          else{
            $('.alert').removeClass('alert-success');
            $('.alert').addClass('alert-danger');
            $('.alert').append('<strong>Danger!</strong> Not succesfull!');
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