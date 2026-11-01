(function(){
const RAW='https://raw.githubusercontent.com/paulofled1-hub/Uk49app/main/www/version.json';
const LINK='https://github.com/paulofled1-hub/Uk49app/releases/download/latest/UK49-Desbloqueado.apk';
const cur=window.APP_VER||'0';
const box=document.createElement('div');
box.innerHTML='<button id="upd" style="background:#555">Verificar atualização</button><div id="umsg"></div>';
(document.querySelector('a.btn')||document.querySelector('h1')).after(box);
function newer(a,b){
 const x=a.split('.').map(Number),y=b.split('.').map(Number);
 for(let i=0;i<3;i++){
  if((y[i]||0)>(x[i]||0))return true;
  if((y[i]||0)<(x[i]||0))return false;
 }
 return false;
}
function check(manual){
 const m=document.getElementById('umsg');
 fetch(RAW+'?t='+Date.now()).then(function(r){return r.json()}).then(function(j){
  if(newer(cur,j.version)){
   m.innerHTML='<div class="box">Nova versão <b>'+j.version+'</b> disponível (a sua: '+cur+').<br><small>'+(j.notes||'')+'</small></div><a class="btn" href="'+LINK+'" target="_blank">⬇ Baixar atualização</a>';
  }else if(manual){
   m.innerHTML='<div class="box">Já tem a última versão ('+cur+').</div>';
  }
 }).catch(function(){
  if(manual)m.innerHTML='<div class="box">Não foi possível verificar. Veja a internet e tente de novo.</div>';
 });
}
document.getElementById('upd').onclick=function(){check(true)};
check(false);
})();
