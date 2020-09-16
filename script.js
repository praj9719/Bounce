var box_length = 500
var play = false;
var b1 = {
    ball : document.getElementById("ball_1"),
    radius : getRadius(document.getElementById("ball_1")),
    factor_top : random(-5, 5)*3,
    factor_left : random(-5, 5)*3,
    start_top: getTop(document.getElementById("ball_1")),
    start_left: getLeft(document.getElementById("ball_1")),
}
var b2 = {
    ball : document.getElementById("ball_2"),
    radius : getRadius(document.getElementById("ball_2")),
    factor_top : random(-5, 5)*3,
    factor_left : random(-5, 5)*3,
    start_top: getTop(document.getElementById("ball_2")),
    start_left: getLeft(document.getElementById("ball_2")),
}
var b3 = {
    ball : document.getElementById("ball_3"),
    radius : getRadius(document.getElementById("ball_3")),
    factor_top : random(-5, 5)*3,
    factor_left : random(-5, 5)*3,
    start_top: getTop(document.getElementById("ball_3")),
    start_left: getLeft(document.getElementById("ball_3")),
}
function start(){ play = true; }
function stop(){ play = false; }
function reset(){
    play = false;
    refactor(b1)
    refactor(b2)
    refactor(b3)
}
var collide = setInterval(function(){
    if (play) {
        bounce(b1);
        bounce(b2);
        bounce(b3);
        collision(b1, b2);
        collision(b1, b3);
        collision(b2, b3);
    }
}, 15)
function bounce(b){
    let left = getLeft(b.ball);
    let top = getTop(b.ball);
    
    if (top < b.radius || top > (box_length - b.radius)) {
        b.factor_top *= -1;
    }
    if (left < b.radius || left > (box_length - b.radius)) {
        b.factor_left *= -1;
    }

    let new_top = top + b.factor_top;
    let new_left = left + b.factor_left;
    b.ball.style.left = new_left + 'px';
    b.ball.style.top = new_top + 'px';
}
function collision(o1, o2){
    let left1 = getLeft(o1.ball);
    let top1 = getTop(o1.ball);
    let left2 = getLeft(o2.ball);
    let top2 = getTop(o2.ball);
    let x = (left1 + o1.radius) - (left2 + o2.radius);
    let y = (top1 + o1.radius) - (top2 + o2.radius);
    let diff = Math.floor(Math.sqrt( (x*x) + (y*y) ));
    if (diff < o1.radius + o2.radius) {
        let top_temp = o1.factor_top;
        o1.factor_top = o2.factor_top;
        o2.factor_top = top_temp;
        let left_temp = o1.factor_left;
        o1.factor_left = o2.factor_left;
        o2.factor_left = left_temp;
        // o1.factor_top *= -1;
        // o1.factor_left *= -1;
        // o2.factor_top *= -1;
        // o2.factor_left *= -1;
    }
}
function random(min, max) { return min + Math.floor(Math.random()*(max-min)); }
function getLeft(ball){ return parseInt(window.getComputedStyle(ball).getPropertyValue("left")); }
function getTop(ball){ return parseInt(window.getComputedStyle(ball).getPropertyValue("top")); }
function getRadius(ball){ return parseInt(window.getComputedStyle(ball).getPropertyValue("height")) / 2;}
function refactor(b){
    b.ball.style.left = b.start_left + 'px';
    b.ball.style.top = b.start_top + 'px';
    b.factor_top = random(-5, 5)*3;
    b.factor_left = random(-5, 5)*3;
}