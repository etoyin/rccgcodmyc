$(document).ready(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const department = urlParams.get('department').toUpperCase();

  $('#department_header').text('THE ' + department + ' DEPARTMENT')
  $('#hod_caption').text('HOD, ' + department)
})