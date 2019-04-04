$(document).ready(function () {
    
    /*JSON*/
    var cameraNumber = 0;
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

    function showData(jsonData) {
        jsonElements = JSON.parse(jsonData.responseText);
        console.log(jsonElements);
        $('#plantScanned').show();
        $('.scannerPreview').hide();
        $('#plantNameScan').text(jsonElements.name);
        $('#plantInfoName').text(jsonElements.name);
        $('#plantImage').attr("src", jsonElements.image);
        
        $('#plantInfoDescription').text(jsonElements.description);
        $('#plantGeographyDescription').text(jsonElements.location.locationDescription);
        console.log(jsonElements.location.locations.length);
        $('.locationList').empty();
        $('#recipies').empty();
        for (var i = 0; i < jsonElements.location.locations.length; i++) {
            console.log(i);

            $('.locationList').append('<li><i class="fas fa-map-marker-alt"></i> ' + jsonElements.location.locations[i] + '</li>');
        }

        for (var i = 0; i < jsonElements.recipies.length; i++) {
            console.log(i);
            $('#recipies').append('<div class="craftingRecipe"><img src="' + jsonElements.recipies[i].image + '" alt=""><h2>' + jsonElements.recipies[i].title + '</h2></div>');
        }
        $('#recipies').append('<div class="clearfix"></div>');
        
        
        console.log($("#herbaryArticle div").has(jsonElements.id).prevObject[0].id);
        console.log($("#herbaryArticle div").has(jsonElements.id).prevObject.length);
        
        var hasId = false;
        for(var i=0;i<$("#herbaryArticle div").has(jsonElements.id).prevObject.length;i++ ){
            if($("#herbaryArticle div").has(jsonElements.id).prevObject[i].id==jsonElements.id){
                hasId=true;
                console.log("Same Id");
            }
            
        }
        
        
        
        
        
        if(hasId==false){
            $('#herbaryArticle').append('<div class="craftingRecipe" id="'+jsonElements.id+'"><img src="'+jsonElements.image+'" alt=""><h2>'+jsonElements.name+'</h2></div>');
            $('#plantNameScan').text('*NEW* '+jsonElements.name);
            $('#mysteryPlant').remove();
            
        }

    }
    var url;
    let scanner = new Instascan.Scanner({
        video: document.getElementById('preview'),
        mirror: false,
    });
    scanner.addListener('scan', function (content) {
        /*alert(content);*/
        url = content;
        collectData(url, showData);

    });
    /*Menu Open and close*/
    $('#burgerMenu').click(function () {
        $('#navigation').toggle();
    });


    /*Navigation between pages*/
    $("#logo").click(function () {
        $('#home').show().siblings('main').hide();
        $('.tabs').hide();
        $('#navigation').hide();
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
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                scanner.stop(cameras[cameraNumber]);
            }
        });
    });

    $('.goToScan').click(function () {
        $('#scannerPage').show().siblings('main').hide();
        $('.scannerPreview').show();
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
    $('#cameraBtn').click(function () {
        $('#scannerPage').show().siblings('main').hide();
        $('.scannerPreview').show();
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
