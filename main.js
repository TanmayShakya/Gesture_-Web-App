var prediction = "";

Webcam.set({
    height: 350,
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });

}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1eWG_URbY/model.json", modelReady);

function modelReady() {
    console.log("ModelReady", ml5.version)
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        prediction = result[0].label;
        document.getElementById("resultArray").innerHTML = prediction;
 speak()
        if(result[0].label == "Victory") {
            document.getElementById("emoji5").innerHTML = "&#9996;";
        }

        if (result[0].label == "Best") {
            document.getElementById("emoji5").innerHTML = "👍";
        }

        if(result[0].label == "Amazing") {
            document.getElementById("emoji5").innerHTML = "👌";
        }

        
    }
}


function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is " + prediction;
    var utterance = new  SpeechSynthesisUtterance(speak_data) 
  synth.speak(utterance);
}
