var firebaseConfig =  {
    apiKey: "AIzaSyAAmEFtDUANb6-mpsm1nGp6PvEYS2QxoLU",
    authDomain: "chillout-5d9bc.firebaseapp.com",
    databaseURL: "https://chillout-5d9bc.firebaseio.com",
    projectId: "chillout-5d9bc",
    storageBucket: "chillout-5d9bc.appspot.com",
    messagingSenderId: "63977987613",
    appId: "1:63977987613:web:043315131d6781119af0f4",
    measurementId: "G-9F1VT0MF76"

};

firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#addTrainBtn").on("click",function(event){
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

trainData.ref().push(newTrain);

alert("Train Added!");

$("#trainNameInput").val("");
$("#destination").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");

return false;
    
})
// Get data from Firebase
trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})