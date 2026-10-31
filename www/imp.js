(function(){
const H={brunchtime:'10:00',lunchtime:'13:00',drivetime:'16:00',teatime:'18:00'};
const NM={brunchtime:'Brunchtime',lunchtime:'Lunchtime',drivetime:'Drivetime',teatime:'Teatime'};
const d=document.createElement('div');
d.innerHTML='<h2>Colar vários sorteios</h2><small>Uma linha por sorteio: data sorteio números<br>Ex: 30/10/2026 Teatime 9 27 30 36 45 48 42</small><textarea id="bulk" rows="6" style="width:100%;box-sizing:border-box;font-size:15px;background:#222;color:#eee;border:1px solid #444;border-radius:6px;margin:4px 0"></textarea><button id="bimp">Importar</button><div id="bmsg"></div>';
$('hist').previousElementSibling.before(d);
$('bimp').onclick=function(){
 let ok=0,dup=0,bad=[];
 $('bulk').value.split('\n').forEach(l=>{
  l=l.trim();if(!l)return;
  const p=l.split(/[\s,;]+/);
  const m=(p[0]||'').match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
  const t=(p[1]||'').toLowerCase();
  const n=p.slice(2).map(Number);
  if(!m||!H[t]||n.length<6||n.length>7||n.some(x=>!(x>=1&&x<=49))||new Set(n).size!==n.length){bad.push(l);return}
  const day=m[3]+'-'+m[2].padStart(2,'0')+'-'+m[1].padStart(2,'0');
  if(R.some(r=>r.d.slice(0,10)===day&&r.t===NM[t])){dup++;return}
  R.push({d:day+'T'+H[t],t:NM[t],n});ok++;
 });
 R.sort((a,b)=>a.d<b.d?1:a.d>b.d?-1:0);
 save();render();
 $('bmsg').innerHTML='<div class="box">Guardados: '+ok+' · Repetidos ignorados: '+dup+(bad.length?' · Com erro: '+bad.length+'<br><small>'+bad.join('<br>')+'</small>':'')+'</div>';
 if(!bad.length)$('bulk').value='';
};
})();
