(function(){
const o=window.stats;
window.stats=function(){
 const s=o();
 if(!window.__W)return s;
 const f=s.f.slice(),P=Object.assign({},s.P);
 R.slice(0,30).forEach(function(r){
  const a=[...r.n].sort(function(p,q){return p-q});
  a.forEach(function(x){f[x]+=2});
  for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const k=a[i]+'-'+a[j];P[k]=(P[k]||0)+2}
 });
 return{f:f,lag:s.lag,P:P};
};
const g=window.gen;
window.gen=function(){window.__W=true;try{g()}finally{window.__W=false}};
const r0=window.render;
function extra(){
 if(!R.length)return;
 const st=$('st');
 const f=Array(50).fill(0),P={};
 R.slice(0,30).forEach(function(r){
  const a=[...r.n].sort(function(p,q){return p-q});
  a.forEach(function(x){f[x]++});
  for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const k=a[i]+'-'+a[j];P[k]=(P[k]||0)+1}
 });
 const nums=[];
 for(let n=1;n<=49;n++)nums.push(n);
 const top=nums.sort(function(a,b){return f[b]-f[a]}).slice(0,10);
 const pr=Object.entries(P).sort(function(a,b){return b[1]-a[1]}).slice(0,8);
 const L=R[0];
 st.innerHTML='<div class="box"><b>Sorteios analisados: '+R.length+'</b><br><small>Último: '+L.d.slice(0,10)+' · '+L.t+'</small></div>'+st.innerHTML+
 '<div class="box">Últimos 30 sorteios, mais frequentes:<br>'+top.map(function(n){return tag(n)+'<small>'+f[n]+'x</small>'}).join(' ')+'</div>'+
 '<div class="box">Últimos 30 sorteios, pares:<br>'+pr.map(function(e){return e[0].split('-').map(Number).map(tag).join('')+'<small>'+e[1]+'x</small>'}).join(' ')+'</div>';
}
window.render=function(){r0();extra()};
window.render();
const again=function(){setTimeout(function(){const x=$('out');if(x&&x.innerHTML.trim())window.gen()},300)};
const b1=$('bimp');
if(b1)b1.addEventListener('click',again);
const b2=document.querySelector('button[onclick="add()"]');
if(b2)b2.addEventListener('click',again);
})();
