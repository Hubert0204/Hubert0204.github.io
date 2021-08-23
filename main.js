// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAUFKpArU7PibSyXfQAzA6DOv6g-JM0HtY",
    authDomain: "login-394d7.firebaseapp.com",
    databaseURL:"https://login-394d7-default-rtdb.firebaseio.com/",
    projectId: "login-394d7",
    storageBucket: "login-394d7.appspot.com",
    messagingSenderId: "348552744650",
    appId: "1:348552744650:web:19709de9570ad62eeaee33",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.database().goOnline();
var database = firebase.database()
var time = new Date()
var m = time.getMonth()+1
var d = time.getDate()
if(m < 10){m = "0" + (time.getMonth()+1)}
if(d < 10){d = "0" + time.getDate()}
var Nowtime = "" + time.getFullYear() + m + d

function Login(){
    var userId = document.getElementById('userId').value
    var code = document.getElementById('Code').value
    var version = document.getElementById('Version').value
    database.ref('ServerOnline').once("value").then(function(snapshot){
        var val = snapshot.val()
        if(val == 1){
            database.ref('Version').once("value").then(function(snapshot){
                var val = snapshot.val();
                    if(val == version){
                        if(userId != ''){
                            database.ref('User/' + userId).once("value").then(function(snapshot){
                                var val = snapshot.val();
                                if(val != null){
                                    if(val.Code == code){
                                        document.getElementById('LoginCheck').innerText = "Success"
                                    }
                                    else{
                                        document.getElementById('LoginCheck').innerText = "Error"
                                    }
                                }
                            })
                        }
                        else{
                            document.getElementById('LoginCheck').innerText = "Invalid User"
                        }
                    }
                    else{
                        document.getElementById('LoginCheck').innerText = "Version Error"
                    }
            })
        }
        else{
            document.getElementById('LoginCheck').innerText = "Server Offline"
        }
    })
}