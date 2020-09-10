$(document).ready(() => {
  const departmentsArray = () => {
    let arr = [];
    $('.departments input[type="checkbox"]:checked').each(() => {
      arr.push($(this).val());
    });
    return arr;
  }
  const trainingInArray = () => {
    let arr = [];
    $('.training input[type="checkbox"]:checked').each(() => {
      arr.push($(this).val());
    });
    return arr;
  }

  $('button[type="submit"]').click((e) => {
    e.preventDefault();
    alert('yes');
    const name = $('input[name="name"]').val();
    const address = $('input[name="address"]').val();
    const number = $('input[name="number"]').val();
    const email = $('input[name="email"]').val();
    const dob = $('input[name="dob"]').val();
    const gender = $('select[name="gender"]').val();
    const marital_status = $('select[name="marital_status"]').val();
    const education = $('select[name="education"]').val();
    const water_baptism = $('select[name="water_baptism"]').val();
    const training = trainingInArray();
    const departments = departmentsArray();
    const last_ordained_year = $('input[name="last_ordained_year"]').val();
    const year_became_worker = $('input[name="year_became_worker"]').val();

  })
})