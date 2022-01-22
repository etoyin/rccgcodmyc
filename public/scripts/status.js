$(document).ready(function(){
    const getLocalStorage = JSON.parse(localStorage.getItem('user-data'));
    const token = getLocalStorage ? getLocalStorage.token : '';

    if(getLocalStorage && getLocalStorage.admin){
       $(".status-switch").css("display", "block")
    }
    $(".memberWithHiddenInput").find("input[type='checkbox']").each(function(i){
        $(this).on('change', function(){
            // alert();
            let data_id = $(this).attr("data-id");
            // alert(getLocalStorage.admin);
            // console.log(getLocalStorage.admin)
            if($(this).is(":checked")){
                // alert(data_id)
                let formdata = new FormData();
                formdata.append("id", data_id);
                formdata.append("status", 0);

                // console.log(formdata.getAll("id"));

                fetch('/status', {
                    method: 'PATCH',
                    headers: {
                      'Authorization': `Bearer ${token}`
                    },
                    body: formdata,
                })
                .then((res) => res.json())
                .then(res => {
                if (res.success){
                    $(this).prop('checked', 'true');
                    console.log("Yesssss!");
                }else{
                    $(this).prop('checked', 'false');
                }
                });
            }else{
                let formdata = new FormData();
                formdata.append("id", data_id);
                formdata.append("status", 1);

                fetch('/status', {
                    method: 'PATCH',
                    headers: {
                      'Authorization': `Bearer ${token}`
                    },
                    body: formdata,
                })
                .then((res) => res.json())
                .then(res => {
                console.log(res)
                if (res.success){
                    // console.log("nooooooooo")
                    // $(this).prop('checked', 'false');
                    
                }else{
                    // $(this).prop('checked', 'true');
                }
                });
            }
        })
        // let trai = state[attr];
        // for (let j in trai){
        //   if(trai[j] == $(this).val()){
        //     $(this).prop('checked', 'true');
        //   }
        // }
      });
})