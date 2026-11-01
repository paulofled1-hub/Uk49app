(function(){
const h1=document.querySelector('h1');
if(h1)h1.style.display='none';
const st=document.createElement('style');
st.textContent='body{padding-top:62px!important}#tb{position:fixed;top:0;left:0;right:0;height:50px;background:#0d1b2a;display:flex;align-items:center;justify-content:space-between;padding:0 10px;z-index:1000;box-shadow:0 2px 6px #000}#tb b{font-size:17px;color:#fff}#tb button{width:44px;height:40px;margin:0 0 0 6px;padding:0;font-size:22px;background:#27a;border:0;border-radius:8px;color:#fff}#dr{position:fixed;top:50px;right:0;bottom:0;width:90%;max-width:420px;background:#151515;overflow-y:auto;padding:10px;z-index:999;transform:translateX(105%);transition:transform .25s;box-shadow:-4px 0 10px #000}#dr.open{transform:none}#toast{position:fixed;top:58px;left:10px;right:10px;background:#27a;color:#fff;padding:10px;border-radius:8px;z-index:1001;display:none;font-size:14px}';
document.head.appendChild(st);
const bar=document.createElement('div');
bar.id='tb';
bar.innerHTML='<b>UK49 Desbloqueado</b><span><button id="tbu" title="Atualizar">🔄</button><button id="tbm" title="Opções">⋮</button></span>';
document.body.prepend(bar);
const dr=document.createElement('div');
dr.id='dr';
dr.innerHTML='<h2 style="margin-top:4px">Opções</h2>';
document.body.appendChild(dr);
const toast=document.createElement('div');
toast.id='toast';
document.body.appendChild(toast);
const upd=document.getElementById('upd');
const parts=[
 upd?upd.parentElement:null,
 document.querySelector('a.btn'),
 (document.querySelector('details')||{}).parentElement,
 (document.getElementById('bexp')||{}).parentElement
];
parts.forEach(function(el){if(el)dr.appendChild(el)});
document.getElementById('tbm').onclick=function(){dr.classList.toggle('open')};
document.getElementById('tbu').onclick=function(){
 const m=document.getElementById('umsg');
 if(m)m.innerHTML='';
 toast.style.display='block';
 toast.textContent='A ligar ao servidor...';
 if(upd)upd.click();
 setTimeout(function(){
  const t=m?m.innerText.trim():'';
  if(t.indexOf('Nova versão')>-1){
   toast.style.display='none';
   dr.classList.add('open');
  }else{
   toast.textContent=t||'Sem resposta do servidor. Veja a internet.';
   setTimeout(function(){toast.style.display='none'},3500);
  }
 },1800);
};
})();
