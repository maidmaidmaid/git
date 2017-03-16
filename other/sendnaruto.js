//************************************
//*function send_naruto( チャンネルOBJ , メンバーOBJ ){
//*チャンネルのメンバーにナルトを送信する
//************************************
function send_naruto( obj_channel , obj_member ){
  obj_channel = findChannel(obj_channel.name);
  obj_member  = obj_channel.findMember( obj_member.nick );
  my = obj_channel.findMember( myNick );
    if (my.op){
      if (obj_member && !obj_member.op) {
	  mode(obj_channel.name , '+o ' + obj_member.nick);
      }
    }
}
