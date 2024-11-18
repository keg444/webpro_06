const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.random()*6+1; // 1~6の実数の乱数を生成
  let luck = '';
  if(num<1.0) luck='大吉';
  else if(num<4.0) luck='吉';
  else if(num<4.8) luck='中吉';
  else if(num<5.3) luck='小吉';
  else if(num<5.8) luck='末吉';
  else if(num<5.9) luck='凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});



app.get("/length", (req, res) => {
  let str = req.query.str || ''; // 文字がない時(最初)に空白にする
  let mojisuu = str.length; // 文字数を数える
  const display = {
    mojisuu: mojisuu
  };
  res.render( 'length', display );
});


app.get("/exponentiation", (req, res) => {
  let num1 = Number(req.query.num1) || 0;
  let num2 = Number(req.query.num2) || 0;
  let exp = num1 ** num2;
  const display = {
    num1: num1,
    num2: num2,
    exp: exp
  };
  res.render('exponentiation', display);
});

app.get("/pass", (req, res) => {
  let num1 = Number(req.query.num1) || 0;
  let pass = Math.floor(Math.random()* 10**num1-1 + 0);
  let debug = 10**num1-1;
  const display = {
    pass: pass,
    debug: debug
  };
  res.render('pass', display);
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // 出したてがグーの時の勝敗判定
  if(hand=="グー"){
    if(cpu=='グー') judgement='あいこ';
    else if(cpu=='チョキ') judgement='勝ち';
    else judgement='負け';
  }
  // 出したてがチョキの時の勝敗判定
  if(hand=="チョキ"){
    if(cpu=='グー') judgement='負け';
    else if(cpu=='チョキ') judgement='あいこ';
    else judgement='勝ち';
  }
  // 出したてがパーの時の勝敗判定
  if(hand=="パー"){
    if(cpu=='グー') judgement='勝ち';
    else if(cpu=='チョキ') judgement='負け';
    else judgement='あいこ';
  }

  if(judgement=='勝ち') win += 1;
  total +=1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
