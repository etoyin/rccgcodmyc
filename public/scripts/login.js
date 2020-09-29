$(document).ready(() => {

  function pageRedirect() {
    window.location.replace('/');
  }

  $(".close").click(() => {
    //$(".modal").css("display", "none");
    pageRedirect();
  });
})