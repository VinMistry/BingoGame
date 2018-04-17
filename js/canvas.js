// SETS UP INITIAL VALUES FOR CANVAS AND DRAWS BOTH THE MATRIX AND THE LARGE BALL
function init(){
    var myCanvas = document.getElementById("bingoBall");
    ctx = myCanvas.getContext("2d");
    largeBallX = 650;
    largeBallY = 650;
    largeBallRadius = 650;
    smallBallX= 2000;
    smallBallY=20;
    smallBallRadius= 85;
    called =[];
    var gapBetweenCircles = 20;
    offsetX = 2*smallBallRadius + gapBetweenCircles;
    offsetY= 2*smallBallRadius + gapBetweenCircles;
    myNumber = [];
    circleColours ="red";
    var count = 1;
	for(var i=0; i < 100; i++){ // ADDS NUMBERS 1-100 TO MYNUMBER ARRAY
		myNumber[i]= count;
        count++;
	}

    draw(ctx, largeBallX, largeBallY, largeBallRadius,"",circleColours);

    for(var i=0; i<90; i++){ //LOOP TO DRAW MATRIX
        if(i%10 == 0){ // CONDITION TO ALLOW BALLS TO MOVE DOWN IN THE Y POSITION TO CREATE A NEW ROW
            smallBallY += offsetY;
            smallBallX= 2000;
        }
        draw(ctx, smallBallX, smallBallY, smallBallRadius, myNumber[i], circleColours);

        smallBallX += offsetX; //OFFSETS THE X VALUE
    }

}

// FUNCTION TO GENERATE AND DISPLAY THE RANDOM NUMBER
function genRand(){
    myClear(0,0,1900,1900); //CLEARS THE CANVAS
    draw(ctx, largeBallX, largeBallY ,largeBallRadius," " , "green");
    var random =  Math.floor(Math.random()*90 +1); //GENERATES THE RANDOM NUMBER
    for(var i=0;i < called.length;i++){
        if($.inArray(random, called ) > -1){ //CHECK TO SEE IF RANDOM NUMBER HAS ALREADY BEEN CALLED
            random = Math.floor(Math.random()*90 +1); //IF IT HAS BEEN, A NEW NUMBER IS GENERATED
        }
        else{
            break; //IF THE NUMBER IS NOT IN THE ARRAY THEN THE LOOP IS STOPPED
        }
    }
    ctx.textAlign="center";
    ctx.fillText(random,650,850); //DISLAYS THE RANDOM NUMBER ON THE CANVAS
    called.push(random); // ADDS THE NUMBER TO THE CALLED ARRAY
    if(random == myNumber[random -1]){ //IF THE NUMBER IS IN THE MYNUMBER ARRAY THE BODY EXECUTES
        alert("Generated Number: " + myNumber[random-1]);
    	ctx.clearRect(1900,20, 3000, 2000); //Clears the canvas
        smallBallX= 1990;
        smallBallY=209;
		for(var i=1; i <91; i++){
            if(myNumber[i-2] %10 == 0){ //OFFSETS THE Y VALUE AND MOVES THE X BACK INTO POSITION
                smallBallY += offsetY;
                smallBallX= 1990;
            }
			if($.inArray(i, called ) > -1){
				circleColours ="green"; //CHANGES THE BALL THAT HAS BEEN CALLED TO THE COLOUR GREEN
                draw(ctx, smallBallX, smallBallY, smallBallRadius, i, circleColours);
                smallBallX += offsetX;
            }
			else{
				circleColours ="red"; // IF THE NUMBERED BALL HAS NOT BEEN CALLED IT STAYS RED
                draw(ctx, smallBallX, smallBallY, smallBallRadius, i, circleColours);
                smallBallX += offsetX;
            }
		}
    }
    document.getElementById("calledNo").innerHTML = called; //DISLAYS THE CALLED NUMBERS
    document.getElementById("numberOfCalled").innerHTML = called.length; //DISPLAYS THE LENGTH OF THE ARRAY CALLED
    nicknames=["Kelly's Eye ","One little duck "," Cup of tea","Knock at the door ","Man alive "," Half a dozen"," Lucky","Garden gate ","Doctor's Orders ","Theresa's Den","Legs eleven "," One dozen"," Unlucky for some","The Lawnmower ","Young and Keen "," Never been kissed","Dancing Queen "," Coming of Age"," Goodbye Teens"," One Score"," 	Key of the Door "," Two little ducks"," The Lord is My Shepherd"," Knock at the door", " Duck and dive", " Two and six, half a crown "];
    ctx.font = "150px serif center";
    ctx.fillStyle = "black";
    if(nicknames[random-1] != null){
        ctx.fillText(nicknames[random-1],650,1450); //DISPLAYS THE NICKNAME ON THE CANVAS
    }
    else{
        ctx.fillText("none",650,1450);
    }
}

//ALLOWS BALLS TO BE DRAWN ONTO THE CANVAS BY CALLING THIS FUNCTION
function draw(ctx,x,y,r,n,c){
    var textY = y ;
    var textX = x ;
    var fStyle =  'bold';
    var fSize = r - 5 ;
    var fSizeStr = fSize.toString();
    var fFamily = 'Lato';
    var textStyles = ` ${fStyle} ${fSizeStr}px ${fFamily}`; // see Template strings https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = c;
	ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.font = textStyles;
    ctx.textAlign="center";
	ctx.fillStyle = 'white';
    ctx.fillText(n, textX, textY);
}

//ALLOWS YOU TO CLEAR A SPECIFIC AREA BY CALLING THIS FUNCTION
function myClear(x,y,s1,s2){
    ctx.clearRect(x,y,s1,s2);
}

// THIS IS USED TO CLEAR THE WHOLE CANVAS AND RESET THE CALLED ARRAY
function clearButton(){
    myClear(0,0,10000,10000);
	called = [];
}

// ALLOWS EASY ACCESS FOR LARGE FONT TO BE APPLIED TO TEXT THAT IS TO BE DRAWN ONTO THE CANVAS
function largeFont(){
     ctx.font = "150px serif center";
     ctx.textAlign="center";
     ctx.fillStyle = "white";
}

// USES DATE CLASS TO ALLOW USEAGE OF TIME INTO THE GAME
function displayTime()
{
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();
var date = now.getDate();
var day = now.getDay();
var hours = now.getHours();
var mins = now.getMinutes();
var secs = now.getSeconds();
var msecs = now.getMilliseconds();
var epochMsecs = now.getTime();
var tzOffset = now.getTimezoneOffset();
var dayName = convertDayNumberToDayName(day);
var monthName = convertMonthNumberToMonthName(month);

var timeString = dayName;
timeString += " ";
timeString += date;
timeString += " ";
timeString += monthName;
timeString += " ";
timeString += hours;
timeString += ":";
timeString += mins;
timeString += secs < 10 ? ":0" : ":" ;
timeString += secs;
timeString += hours > 12 ? " PM" : " AM"; // i.e. if hours > 12 use PM otherwise use AM

document.digitalClock.display.value = timeString; //OUTPUT THE TIME ONTO WEBPAGE
}

//ARRAY FILLED WITH DAY NAMES AND RETURNS THE NAME IN ACCORDANCE TO THE NUMBER FROM now.getDay()
function convertDayNumberToDayName(d){
  var dayNames = new Array("Sunday", "Monday", "Tuesday","Wednesday", "Thursday","Friday", "Saturday");
   return dayNames[d];
}
//ARRAY FILLED WITH MONTH NAMES AND RETURNS THE NAME IN ACCORDANCE TO THE NUMBER FROM now.getMonth()
function convertMonthNumberToMonthName(m){
    var monthNames = new Array("January", "February", "March","April", "May","June", "July", "August", "September", "October", "November", "December");
    return monthNames[m];
}
