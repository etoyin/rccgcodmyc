$(document).ready(function(){
    // let userDetails;
    ///////////For element dynamically generated///////////////////
    $(document.body).on('click', '.changePassword' ,function(){
        $("#changePasswordOverlay").css("display", "block");
    })
    $(".hideOverlay").click(function(){
        $("#changePasswordOverlay").css("display", "none");
    })

    $("#submitChangePassword").click(function(){
        $(".overlay_loader").css("display", "block");
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

        console.log(confirmConfirm)
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const getLocalStorage = JSON.parse(localStorage.getItem('user-data'));
        const token = getLocalStorage ? getLocalStorage.token : '';
        console.log(userDetails)
        //confirmConfirm && confirmNew && confirmOld
        if(confirmConfirm && confirmNew && confirmOld){
            $("error").css("display", "none");
            let formData = new FormData();
            formData.append("old", old);
            formData.append("email", userDetails.email);
            formData.append("id", userDetails.id);
            formData.append("newP", newP);
            fetch("/updatePassword", {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.success){
                    $(".overlay_loader").css("display", "none");
                    $(".overlay_success").css("width", "100%");
                }
                else{
                    alert("Your password is incorrect!")
                    $(".overlay_loader").css("display", "none");
                    // $(".overlay_success").css("width", "100%");
                }
                
            })

        }else{
            $(".overlay_loader").css("display", "none");
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