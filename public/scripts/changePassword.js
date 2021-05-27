$(document).ready(function(){
    ///////////For element dynamically generated///////////////////
    $(document.body).on('click', '.changePassword' ,function(){
        $("#changePasswordOverlay").css("display", "block");
    })
    $(".hideOverlay").click(function(){
        $("#changePasswordOverlay").css("display", "none");
    })

    $("#submitChangePassword").click(function(){
        let old = $("#old").val();
        let newP = $("#newP").val();
        let confirm = $("#confirm").val();
        let err = {}

        let confirmOld = old.length>0;
        err.old = confirmOld ? "" : "Input Old Password!";

        let confirmNew = newP.length > 5;
        err.newP = confirmNew ? "" : "Password must be more than 5 characters!";

        let confirmConfirm = confirm === newP;
        err.confirm = confirmConfirm ? "" : "Passwords dont match!";

        if(confirmConfirm && confirmNew && confirmOld){

        }else{
            $(".errorField").each(function(){
                let attr = $(this).attr("errorField");
                console.log(err[attr])
                if(err[attr].length > 0){
                    $(this).text(err[attr]).css("display", "block");
                }
                else{
                    $(this).css("display", "none").text("");
                }
            })
        }

    })
})