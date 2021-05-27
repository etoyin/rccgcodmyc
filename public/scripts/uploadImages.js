$(document).ready(function(){
    let fileInput;
    let userDetails;
    $("#submitUpload").click(function(){
        $(".overlay_loader").css("display", "block");
        
        const typeOfFile = $(".typeOfFile").val();
        const getLocalStorage = JSON.parse(localStorage.getItem('user-data'));
        const token = getLocalStorage ? getLocalStorage.token : '';
        if(typeOfFile.length > 0 && fileInput.length){
            $("error").css("display", "none");
            let formData = new FormData();
            formData.append("type", typeOfFile);
            formData.append("name", userDetails.name);
            formData.append("id", userDetails.id);
            formData.append("file", fileInput[0]);
            fetch("/updateImage", {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(res => {
                $(".overlay_loader").css("display", "none");
                $(".overlay_success").css("width", "100%");
            })
        }else{
            $("error").css("display", "block");
        }
    })

    /////Delegated event//////
    $(document.body).on('click', '#uploadImages' ,function(){
        userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log("kkkkkkkkkkk");
         $(".overlay_upload_images").css("display", "block");
    });
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
        const dropZoneElement = inputElement.closest(".drop-zone");

        dropZoneElement.addEventListener('click', (e) => {
            inputElement.click();
        })
        inputElement.addEventListener('change', () => {
            if(inputElement.files.length){
                fileInput = inputElement.files;
                console.log(inputElement.files[0]);
                updateThumbnail(dropZoneElement, inputElement.files[0]);
            }
        })

        dropZoneElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("drop-zone--over")
        });
        ["dragleave", "dragend"].map((type) => {
            dropZoneElement.addEventListener(type, (e) => {
                dropZoneElement.classList.remove("drop-zone--over")
            });
        })

        dropZoneElement.addEventListener('drop', (e) => {
            e.preventDefault();

            if(e.dataTransfer.files.length){
                // let inputElement = $(this);
                inputElement.files = e.dataTransfer.files;
                fileInput = inputElement.files;
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            }

            dropZoneElement.classList.remove("drop-zone--over");
        });
    })


    function updateThumbnail(dropZoneElement, file){
        
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");


        //first time remove the prompt from div
        if(dropZoneElement.querySelector(".drop-zone__prompt")){
            dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }
        // first time there's no thumbnail element so we create it
        if(!thumbnailElement){
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone__thumb");
            dropZoneElement.appendChild(thumbnailElement);
        }

        thumbnailElement.dataset.label = file.name;

        if(file.type.startsWith("image/")){
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = function(){
                thumbnailElement.style.backgroundImage = `url("${reader.result}")`;
            }
        }
        else{
            $(".drop-zone__thumb").css("background-image", null)
        }
    }
})