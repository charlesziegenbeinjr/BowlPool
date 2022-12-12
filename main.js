let loading = 0;
// Set-Up: K
// Key: 'Bowl Game' 
// -> Values: 'Date', 'Home Team', 'Away Team'
let bowls = [
    'New Orleans Bowl',
    'Montgomery Bowl',
    'New Mexico Bowl',
    'Camellia Bowl',
    'Cure Bowl',
    'First Responder Bowl',
    'LendingTree Bowl',
    'Cheez-It Bowl',
    'Alamo Bowl',
    'Dukes Mayo Bowl',
    'Music City Bowl',
    'Cotton Bowl',
    'Armed Forces Bowl',
    'Arizona Bowl',
    'Liberty Bowl',
    'Texas Bowl',
    'Citrus Bowl',
    'Peach Bowl',
    'Gator Bowl',
    'Outback Bowl',
    'Fiesta Bowl',
    'Orange Bowl',
    'Sugar Bowl',
    'Rose Bowl',
    'National Championship'
];

let games = {
    'New Orleans Bowl': [ 'Dec. 23','Louisiana Tech','Georgia Southern'],
    'Montgomery Bowl': [ 'Dec. 23','Memphis','FAU'],
    'New Mexico Bowl': [ 'Dec. 24','Houston','Hawaii'],
    'Camellia Bowl': [ 'Dec. 25','Buffalo','Marshall'],
    'Cure Bowl': [ 'Dec. 26','Coastal Carolina','Liberty'],
    'First Responder Bowl': [ 'Dec. 26','Louisiana','UTSA'],
    'LendingTree Bowl': [ 'Dec. 26','Western Kentucky','Georgia State',],
    'Cheez-It Bowl': [ 'Dec. 29','Miami','Oklahoma State'],
    'Alamo Bowl': [ 'Dec. 29','Texas','Colorado'],
    'Dukes Mayo Bowl': [ 'Dec. 30','Wake Forest','Wisconsin'],
    'Music City Bowl': [ 'Dec. 30','Iowa','Missouri'],
    'Cotton Bowl': [ 'Dec. 30','Oklahoma','Florida'],
    'Armed Forces Bowl': [ 'Dec. 31','Mississippi State','Tulsa'],
    'Arizona Bowl': [ 'Dec. 31','Ball State','San Jose State'],
    'Liberty Bowl': [ 'Dec. 31','West Virginia','Army'],
    'Texas Bowl': [ 'Dec. 31','TCU','Arkansas'],
    'Citrus Bowl': [ 'Jan. 1','Auburn','Northwestern'],
    'Peach Bowl': [ 'Jan. 1','Cincinnati','Georgia'],
    'Gator Bowl': [ 'Jan. 2','Kentucky','NC State'],
    'Outback Bowl': [ 'Jan. 2','Ole Miss', 'Indiana'],
    'Fiesta Bowl': [ 'Jan. 2','Oregon','Iowa State'],
    'Orange Bowl': [ 'Jan. 2','Texas A&M','North Carolina'],
    'Sugar Bowl': [ 'Jan. 1','Clemson', 'Ohio State'],
    'Rose Bowl': [ 'Jan. 1','Alabama','Notre Dame'],
    'National Championship': [ 'Jan. 11', 'Sugar Bowl Winner', 'Rose Bowl Winner'],
};

let userpicks = [];


let firebaseConfig = {
    apiKey: "AIzaSyC75q_4NBY6W0YJNGkhQLEI5GLKEI1sizA",
    authDomain: "creative-project-11dea.firebaseapp.com",
    databaseURL: "https://creative-project-11dea.firebaseio.com",
    projectId: "creative-project-11dea",
    storageBucket: "creative-project-11dea.appspot.com",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayAddition() {
    await sleep(2000).then(() => {
        document.getElementById('load-count').innerHTML = "Done!";
    });
}

async function delayFadeOut() {
    await sleep(2000).then(() => {
        $('#loadinggif').fadeOut();
        $('#loadingcount').fadeOut();
    });
}
async function delayFadeIn() {
    await sleep(4000).then(() => {
        $('#mainpage').fadeIn();
    });
}

$(document).ready(displayHomeScreen());

function displayHomeScreen() {
    let element = document.createElement("H1");
    element.id = "load-count";
    let content = document.createTextNode("Loading...");
    element.appendChild(content);
    $('#loadingcount').append(element);
    delayAddition();
    delayFadeOut();
    displayGames();
    showResults();
    delayFadeIn();
}

function displayGames() {
    let gn = 1;
    let rowname = "Not Set";
    for (let i = 0; i < Object.keys(games).length; i++) {
        if ( ( ( (i) % 2 ) == 0 ) || ( (i) == 0 ) ) {
            console.log(rowname);
            rowname = "bowlgame" + gn;
            $('#bowlgames').append('<div id="' + rowname + '" class="row"></div>');
            gn = gn + 1;
        }
        if (i == (Object.keys(games).length-1)) {
            $('#' + rowname).append('<div class="wrap-games col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                                    <h2>'+ bowls[i] + ': ' + games[bowls[i]][0] + '</h2>\
                                    <label class="teams"><input type="radio" id="'+ games[bowls[i]][1].replace(/\s/g, '') + '" name="game' + (i + 1) + '" value="' + games[bowls[i]][1] + '">' + games[bowls[i]][1] + '</label>\
                                    <label class="teams"><input type="radio" id="'+ games[bowls[i]][2].replace(/\s/g, '') + '" name="game' + (i + 1) + '" value="' + games[bowls[i]][2] + '">' + games[bowls[i]][2] + '</label></br>\
                                    <input type="number" id="score1" name="finalgame" value="' + games[bowls[i]][1] + '">' + games[bowls[i]][1] + '\
                                    <input type="number" id="score2" name="finalgame" value="' + games[bowls[i]][1] + '">' + games[bowls[i]][2] + '\
                                    <div id="gamestats'+(i)+'"></div>\
                                </div>');
            addStatistics(i);
        } else {
            $('#' + rowname).append('<div class="wrap-games col-lg-6 col-md-6 col-sm-6 col-xs-6">\
                                    <h2>'+ bowls[i] + ': ' + games[bowls[i]][0] + '</h2>\
                                    <label class="teams"><input type="radio" id="'+ games[bowls[i]][1].replace(/\s/g, '') + '" name="game' + (i + 1) + '" value="' + games[bowls[i]][1] + '">' + games[bowls[i]][1] + '</label>\
                                    <label class="teams"><input type="radio" id="'+ games[bowls[i]][2].replace(/\s/g, '') + '" name="game' + (i + 1) + '" value="' + games[bowls[i]][2] + '">' + games[bowls[i]][2] + '</label></br>\
                                    <div class="row" id="gamestats'+ (i) +'"></div>\
                                </div>');
            addStatistics(i);
        }
    }
}
function addStatistics(num) {
    let hometeam = games[bowls[num]][1].replace(/\s/g, '%20');
    let awayteam = games[bowls[num]][2].replace(/\s/g, '%20');
    hometeam = hometeam.replace('&', '%26');
    awayteam = awayteam.replace('&', '%26');
    const path1 = "https://api.collegefootballdata.com/records?year=2021&team=" + hometeam;
    const path2 = "https://api.collegefootballdata.com/records?year=2021&team=" + awayteam;
    fetch(path1)
        .then(response => response.json())
        .then(data => {
            let team1 = data[0].team;
            let totalgames1 = data[0].total.games;
            let wins1 = data[0].total.wins;
            let losses1 = data[0].total.losses;
            let ties1 = data[0].total.ties;
            appendHomeStatistics(num, team1,totalgames1,wins1,losses1,ties1);
        })
        .catch(err => {
            appendHomeError(num, "Data Not Available",);    
        });

    fetch(path2)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let team2 = data[0].team;
            let totalgames2 = data[0].total.games;
            let wins2 = data[0].total.wins;
            let losses2 = data[0].total.losses;
            let ties2 = data[0].total.ties;
            appendAwayStatistics(num, team2, totalgames2, wins2, losses2, ties2);
        })
        .catch(err => {
            appendAwayError(num, "Data Not Available",);
            console.error(err)});
}


function appendHomeStatistics(position, team, tg, w, l, t) {
    $('#gamestats' + position).append('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">\
                                            <h4>Team Name: '+team+'</h4>\
                                            <h4>Games Played: '+ tg +'</h4>\
                                            <h4>Wins: '+ w +'</h4>\
                                            <h4>Losses: '+ l +'</h4>\
                                            <h4>Ties: '+ t +'</h4>\
                                        </div>');
}

function appendHomeError(position, msg) {
    if (position == (Object.keys(games).length-1)) {
        console.log("Here");
    } else {
        $('#gamestats' + position).append('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">\
                                                <h4>'+ msg +'</h4>\
                                            </div>');
    }
}

function appendAwayStatistics(position, team, tg, w, l, t) {
    $('#gamestats' + position).append('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">\
                                            <h4>Team Name: '+team+'</h4>\
                                            <h4>Games Played: '+ tg +'</h4>\
                                            <h4>Wins: '+ w +'</h4>\
                                            <h4>Losses: '+ l +'</h4>\
                                            <h4>Ties: '+ t +'</h4>\
                                        </div>');
}

function appendAwayError(position, msg) {
    if (position == (Object.keys(games).length - 1)) {
        console.log("HERE");
    } else {
        $('#gamestats' + position).append('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">\
                                                <h4>'+ msg + '</h4>\
                                            </div>');
    }
}


function addListeners() {
    for (let i = 0; i < Object.keys(games).length; i++) {
        document.getElementById("statbutton" + i).addEventListener("click", function() {console.log("hello")}, false);
    }
}


let master_module = angular.module('bowlpool-application', ['firebase']);

master_module.controller('navigate', ['$scope', function ($scope) {
    $scope.showForm = function () {
        $('#wrap-picks').css('display', 'block');
        $('#wrap-analytics').css('display', 'none');
        $('wrap-results').css('display', 'none');
    }
    $scope.showPredictions = function () {
        $('#wrap-picks').css('display', 'none');
        $('#wrap-analytics').css('display', 'block');
        $('#wrap-results').css('display', 'none');
    }
    $scope.showResults = function () {
        $('#wrap-picks').css('display', 'block');
        $('#wrap-analytics').css('display', 'none');
        $('#wrap-results').css('display', 'block');
    }
}]);


function logName() {
    let username = document.getElementById('yourname').value;
    if (username.length == 0) {
        alert("You Forgot Your Username");
        return "ERROR";
    }
    initialLog(username);
}

async function initialLog(user) {
    console.log(user);
    await db.collection('bowlpool').doc(user).set({ 
        wins: 0,
        losses: 0
     });
}

function logPicks() {
    let username = document.getElementById('yourname').value;
    
    if (username.length == 0) {
        alert("You Forgot Your Username");
        return "ERROR";
    }

    for (let i = 0; i < Object.keys(games).length; i++) {
        if ($('input[name="game' + (i + 1) + '"]:checked').length) {
            let pick = $('input[name="game' + (i + 1) + '"]:checked').val();
            userpicks.push(pick);
        }
        else {
            alert("You Forgot A Game");
            return "ERROR";
        }
    }

    let score1 = document.getElementById('score1').value;
    let score2 = document.getElementById('score2').value;
    if (score1.length == 0 || score2.length == 0) {
        alert("Add A Spread for the CFB Championship");
        return "ERROR";
    }
    addPicks(username, userpicks, score1, score2);
}

async function addPicks(user, picks, s1, s2) {
    for (let i = 0; i < Object.keys(games).length; i++) {
        await db.collection('bowlpool').doc(user).update({[bowls[i]]: picks[i]});
    }
    let date = new Date();
    await db.collection('bowlpool').doc(user).update({ 
        'Sugar Bowl Spread': s1,
        'Rose Bowl Spread': s2,
        'Submission Time': date.getUTCDate()
    });
    $('#wrap-picks').css('display','none');
    $('#wrap-completion').css('display','block');
}

async function showResults() {
    let results = await db.collection('bowlpool').get()
    return results.docs.map(doc => {
        console.log(doc.data);
        createTable(doc.id, doc.data);
    });
}

function createTable(name, data) {
    $('#resultstable tr:last').after('<tr>\
                                        <td>' + name + '</td>\
                                        <td>' +  + '</td>\
                                        <td>' +  + '</td>\
                                    </tr>');
}