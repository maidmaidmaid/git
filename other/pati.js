/*

 指定した時間にメッセージを出力するスクリプト
  ※連投防止のため指定時間の1分後に動作します
  ※上記時間から最大で±1分程度の誤差があります
 
 *Version*
 1.0:新規作成
 memo パクリ http://persimummies.hatenablog.com/entry/2015/04/12/110217

*/
// 出力設定
var messageText = 'http://www.dmm.co.jp/netgame/pachinko/ パチンコの時間だよ';
var hour = 00; // 時（24時間表示）
var min = 00;  // 分（1桁でも0は不要…あっても動くかも）
var channel = '#hitoketa-ch'; 

/*
 連投防止用wait関数
*/
function wait(intervalTime)
{
  setTimeout(showMessage, 60 * 1000);
}

/*
 メッセージ出力関数
*/
function showMessage()
{
  send(channel, messageText);
  setNextTimer();
}

/*
 タイマー設定
*/
function setNextTimer()
{
  log('出力先チャンネル：' + channel);
  var now = new Date();
  
  var nextH = hour - now.getHours();
  var nextM = min - now.getMinutes();
  var intervalTime = ((nextH * 60) + nextM) * 60 * 1000;
  if (intervalTime < 0){
    intervalTime = (((24 * 60) * 60) * 1000 ) + intervalTime;
  }
  var nextDate = new Date();
  nextDate.setTime(now.getTime() + intervalTime + 1000);
  log('次回出力予定時間：' + nextDate.toLocaleString());
  setTimeout(wait, intervalTime);
}

/*
 起動時イベント
*/
function event::onLoad()
{
  setNextTimer();
}