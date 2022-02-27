prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width : 350,
    height : 300,
    Image_format : 'png', 
    png_quality : 90,
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takesnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id = "captured_image" src= " '+data_uri+'"/>';

});
}

console.log('ml5version:' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PJLgzPObR/model.json' , modelLoaded);

function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
     var synth = window.speechSynthesis;
     speakdata_1 = "The First Prediction is " + prediction_1;
     speakdata_2 = "And the second prediction is " + prediction_2;
     var utterThis = new SpeechSynthesisUtterance(speakdata_1+speakdata_2);
     synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image")
    classifier.classify(img,gotResult)
    
}

function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        prediction_1 = result[0].label
        prediction_2 = result[1].label

        document.getElementById("result_emotion_name").innerHTML = prediction_1
        document.getElementById("result_emotion_name2").innerHTML = prediction_2
        speak()

        if(prediction_1 == "surprised"){
            document.getElementById("result_emoji").innerHTML = "&#128562;"
        }

        if(prediction_1 == "Happy"){
            document.getElementById("result_emoji").innerHTML = "&#128522;"
        }

        if(prediction_1 == "sad"){
            document.getElementById("result_emoji").innerHTML = "&#128532;"
        }
        
        if(prediction_1 == "angry"){
            document.getElementById("result_emoji").innerHTML = "&#128545;"
        }

        if(prediction_2 == "surprised"){
            document.getElementById("result_emoji_2").innerHTML = "&#128562;"
        }

        if(prediction_2 == "Happy"){
            document.getElementById("result_emoji_2").innerHTML = "&#128522;"
        }

        if(prediction_2 == "sad"){
            document.getElementById("result_emoji_2").innerHTML = "&#128532;"
        }
        
        if(prediction_2 == "angry"){
            document.getElementById("result_emoji_2").innerHTML = "&#128545;"
        }


    }
}


