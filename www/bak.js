(function(){
const d=document.createElement('div');
d.innerHTML='<h2>Cópia de segurança</h2><button id="bexp">Guardar cópia (arquivo)</button><input type="file" id="brest" accept=".json" style="display:none"><button id="brb" style="background:#555">Restaurar de arquivo</button><div id="bkmsg"></div>';
$('hist').previousElementSibling.before(d);
const msg=t=>$('bkmsg').innerHTML='<div class="box">'+t+'</div>';
$('bexp').onclick=function(){
 const blob=new Blob([JSON.stringify(R)],{type:'application/json'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='uk49-copia-'+new Date().toISOString().slice(0,10)+'.json';
 document.body.appendChild(a);a.click();a.remove();
 msg('Cópia guardada: '+R.length+' sorteios. Procure na pasta Transferências (Downloads).');
};
$('brb').onclick=function(){$('brest').click()};
$('brest').onchange=function(e){
 const f=e.target.files[0];if(!f)return;
 const fr=new FileReader();
 fr.onload=function(){
  try{
   const x=JSON.parse(fr.result);
   if(!Array.isArray(x))throw 0;
   let add=0;
   x.forEach(r=>{
    if(r&&r.d&&r.t&&Array.isArray(r.n)&&!R.some(q=>q.d.slice(0,10)===r.d.slice(0,10)&&q.t===r.t)){R.push(r);add++}
   });
   R.sort((a,b)=>a.d<b.d?1:a.d>b.d?-1:0);
   save();render();
   msg('Restaurados: '+add+' sorteios novos.');
  }catch(err){msg('Arquivo inválido.')}
 };
 fr.readAsText(f);
};
})();
