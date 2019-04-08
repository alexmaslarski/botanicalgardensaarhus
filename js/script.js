$(document).ready(function () {
    var collectionItem = $("#herbaryArticle div");


    /*JSON*/
    var cameraNumber = 0; //Camera chooser
    //JSON Data fetch
    function collectData(url, callback_Function) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback_Function(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    }
    var jsonElements;
    
    
    var url; //url variable
    //we create a new scanner with the attributes video - showing where to display the camera, and mirror, which unmirrores the picture.
    let scanner = new Instascan.Scanner({
        video: document.getElementById('preview'),
        mirror: false,
    });

    //this event listener triggers a function when the scanner scans and passes the content as a parameter.
    scanner.addListener('scan', function (content) {
        /*alert(content);*/
        //the content in our case is a url pointing to a JSON file and we keep it into the url variable
        url = content;
        //we then call the collectData function with the url and showData function as parameters.
        collectData(url, showData);

    });




    //JSON Show data
    function showData(jsonData) {
        jsonElements = JSON.parse(jsonData.responseText); //Parsing the object
        console.log(jsonElements);
        $('#plantScanned').show(); //Showing the scanned plant
        $('.scannerPreview').hide(); //Hiding the camera view
        //setting the elements and info
        $('#plantNameScan').text(jsonElements.name);
        $('#plantInfoName').text(jsonElements.name);
        $('#plantImage').attr("src", jsonElements.image);

        $('#plantInfoDescription').text(jsonElements.description);
        $('#plantGeographyDescription').text(jsonElements.location.locationDescription);
        console.log(jsonElements.location.locations.length);

        //reset locations and recipies
        $('.locationList').empty();
        $('#recipies').empty();
        //cycle through the locations and display them as new elements
        for (var i = 0; i < jsonElements.location.locations.length; i++) {
            console.log(i);

            $('.locationList').append('<li><i class="fas fa-map-marker-alt"></i> ' + jsonElements.location.locations[i] + '</li>');
        }
        //cycle through recipies and display them as new elements
        for (var i = 0; i < jsonElements.recipies.length; i++) {
            console.log(i);
            $('#recipies').append('<div class="craftingRecipe"><img src="' + jsonElements.recipies[i].image + '" alt=""><h2>' + jsonElements.recipies[i].title + '</h2></div>');
        }
        $('#recipies').append('<div class="clearfix"></div>'); //adding a clearfix to clear the float


        console.log($("#herbaryArticle div").has(jsonElements.id).prevObject[0].id);
        console.log($("#herbaryArticle div").has(jsonElements.id).prevObject.length);

        var hasId = false; //a variable that shows if we have already scanned a certain plant

        //cycles through all elements in the collection
        for (var i = 0; i < $("#herbaryArticle div").has(jsonElements.id).prevObject.length; i++) {
            //checks if the current element has the same id as the new element scanned
            if ($("#herbaryArticle div").has(jsonElements.id).prevObject[i].id == jsonElements.id) {
                hasId = true; //if we have the same id, we change the variable to true
                console.log("Same Id");
            }

        }




        //we check if the hasID variable is false
        if (hasId == false) {
            //and if it is we append the new element to the collection
            $('#herbaryArticle').append('<div class="craftingRecipe" id="' + jsonElements.id + '" data-link="' + url + '"><img src="' + jsonElements.image + '" alt=""><h2>' + jsonElements.name + '</h2></div>');
            $('#plantNameScan').text('*NEW* ' + jsonElements.name);

            //we remove the mystery plant placeholder
            $('#mysteryPlant').remove();
            collectionItem = $("#herbaryArticle div");

        }

    }

    $("#herbaryArticle").on("click","div", function () {
        var itemClickedLink = $(this).attr("data-link");
        collectData(itemClickedLink, showData);
        
        if(itemClickedLink!==undefined){
            $('#plantInfo').show().siblings('main').hide();
        //stops camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[0]);
            }
        });

        $('#description').show().siblings('article').hide();
        $('.tabs').show();
        $('#navigation').hide();
        }
        
        
    });

    //Navigation between pages part

    /*Menu Open and close*/
    $('#burgerMenu').click(function () {
        $('#navigation').toggle();
    });


    /*Navigation between pages*/
    $("#logo").click(function () {
        //shows the home screen and hides all other siblings
        $('#home').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
        //stops the camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });
    $("#backToHome").click(function () {
        $('#home').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
        //stops the camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });

    $('.goToScan').click(function () {
        $('#scannerPage').show().siblings('main').hide();
        $('.scannerPreview').show();
        //starts the camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.start(cameras[cameraNumber]);

            } else {
                console.error("Please enable Camera!");
            }
        });
        $('.tabs').hide();
        $('#navigation').hide();
        $('#plantScanned').hide();


    });
    $('#learnMoreBtn').click(function () {
        $('#plantInfo').show().siblings('main').hide();
        //stops camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[0]);
            }
        });

        $('#description').show().siblings('article').hide();
        $('.tabs').show();
        $('#navigation').hide();

    });

    $('.goToCraft').click(function () {
        $('#craftingItems').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
        //stops camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });
    $('.goToTasks').click(function () {
        $('#tasksTab').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
        //stops camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });
    $('.goToHerbary').click(function () {
        $('#herbaryTab').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
        //stops camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });
    
    $('.goToInfo').click(function () {
        $('#infoTab').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
        //stops camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });
    
    $('#tequilaRecipe').click(function () {
        $('#crafting').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
        //stops camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });

    /*Navigation between tabs in plantinfo*/
    $('#descTab').click(function () {
        $('#description').show().siblings('article').hide();
    });
    $('#geoTab').click(function () {
        $('#geography').show().siblings('article').hide();
    });
    $('#recipiesTab').click(function () {
        $('#recipies').show().siblings('article').hide();
    });
    $('#ecoTab').click(function () {
        $('#eco').show().siblings('article').hide();
    });

    //camera button on the bottom nav bar
    $('#cameraBtn').click(function () {
        $('#scannerPage').show().siblings('main').hide();
        $('.scannerPreview').show();
        //starts camera
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.start(cameras[cameraNumber]);
            } else {
                console.error("Please enable Camera!");
            }
        });
        $('.tabs').hide();
        $('#navigation').hide();
        $('#plantScanned').hide();
    });







});
