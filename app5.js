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
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/length", (req, res) => {
  let str = req.query.str || '';
  let mojisuu = str.length;
  // console.log(mojisuu);
  const display = {
    mojisuu: mojisuu
  };
  res.render( 'length', display );
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
  
  if(hand=="グー"){
    if(cpu=='グー') judgement='あいこ';
    else if(cpu=='チョキ') judgement='勝ち';
    else judgement='負け';
  }

  if(hand=="チョキ"){
    if(cpu=='グー') judgement='負け';
    else if(cpu=='チョキ') judgement='あいこ';
    else judgement='勝ち';
  }

  if(hand=="パー"){
    if(cpu=='グー') judgement='勝ち';
    else if(cpu=='チョキ') judgement='負け';
    else judgement='あいこ';
  }
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  // let judgement = '勝ち';
  if(judgement=='勝ち') win += 1;
  total +=1;
  // win += 1;
  // total += 1;
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
