(function(){
const VER='1.4.0';window.APP_VER='1.4.0';
const REPO='https://github.com/paulofled1-hub/Uk49app';
const LINK=REPO+'/releases/download/latest/UK49-Desbloqueado.apk';
const MSG='UK49 Desbloqueado: app para analisar resultados do UK49s e gerar combinações (ferramenta de análise e entretenimento, sem garantia de acerto). Baixe aqui:';
const h1=document.querySelector('h1');
if(h1)h1.textContent='UK49 Desbloqueado';
document.title='UK49 Desbloqueado';
const st=document.createElement('style');
st.textContent='details{background:#1b1b1b;border-radius:8px;margin:6px 0;padding:10px}summary{font-size:16px;color:#7cf}details li,details p{font-size:14px;line-height:1.5}.star{font-size:34px;color:#555;padding:0 4px}.star.on{color:#fc5}a.btn{display:block;text-align:center;background:#27a;color:#fff;padding:10px;border-radius:6px;margin:6px 0;text-decoration:none}';
document.head.appendChild(st);
const w=document.createElement('div');
w.innerHTML=
'<details><summary>Ajuda: como usar</summary><ol>'+
'<li>Depois de cada sorteio, copie os números da sua fonte de resultados.</li>'+
'<li>Role até à caixa <b>Colar vários sorteios</b>.</li>'+
'<li>Escreva uma linha por sorteio, neste formato: <b>data nome-do-sorteio números</b>. Exemplo:<br><b>30/10/2026 Teatime 9 27 30 36 45 48 42</b></li>'+
'<li>Nomes aceites: Brunchtime, Lunchtime, Drivetime e Teatime. São 6 números mais o Booster (7 no total).</li>'+
'<li>Toque em <b>Importar</b>. O app diz quantos guardou e ignora os repetidos.</li>'+
'<li>Veja as <b>Estatísticas</b>: números mais frequentes, mais atrasados e pares que mais saem juntos.</li>'+
'<li>Se quiser dar prioridade a certos pares do dia, escreva-os no campo <b>Pares de hoje</b>, por exemplo 13-22, 5-42.</li>'+
'<li>Toque em <b>Gerar 10 fortes de cada</b>. Aparecem 10 combinações de 2, 3, 4 e 5 números, cada uma misturando dois grupos (A+B, A+C ou B+C). As com ★ contêm os seus pares de hoje.</li>'+
'<li>De vez em quando use <b>Guardar cópia</b> para não perder os resultados.</li>'+
'</ol><p><small>Aviso: o sorteio é aleatório. As combinações são só uma forma de organizar o histórico e não garantem acerto. Jogue apenas o que pode perder.</small></p></details>'+
'<details><summary>Convidar amigos</summary><p>Partilhe o link para baixar o app.</p>'+
'<button id="shr">Partilhar convite</button><button id="cpl" style="background:#555">Copiar link</button>'+
'<p><small>'+LINK+'</small></p></details>'+
'<details><summary>Avaliar o app</summary><p>Toque nas estrelas:</p><div id="stars"></div><p id="rmsg"></p>'+
'<a class="btn" href="'+REPO+'" target="_blank">Dar uma estrela no GitHub</a></details>'+
'<details><summary>Gerador de números</summary><p>Sorteia números ao acaso de 1 a 49.</p>'+
'<select id="gn"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option selected>6</option><option>7</option></select>'+
'<button id="gbt">Sortear</button><div id="gres"></div></details>'+
'<details><summary>Sobre / Versão</summary><p>UK49 Desbloqueado<br>Versão <b>'+VER+'</b></p></details>';
const first=document.querySelector('small');
first.after(w);
function copy(){
 const t=MSG+' '+LINK;
 try{navigator.clipboard.writeText(t).then(function(){alert('Convite copiado')},function(){prompt('Copie o convite:',t)})}
 catch(e){prompt('Copie o convite:',t)}
}
document.getElementById('cpl').onclick=copy;
document.getElementById('shr').onclick=function(){
 if(navigator.share){navigator.share({title:'UK49 Desbloqueado',text:MSG,url:LINK}).catch(function(){})}else copy();
};
let cur=0;try{cur=+localStorage.getItem('uk49_rate')||0}catch(e){}
function drawStars(){
 const el=document.getElementById('stars');
 el.innerHTML='';
 for(let i=1;i<=5;i++){
  const s=document.createElement('span');
  s.className='star'+(i<=cur?' on':'');
  s.textContent='★';
  s.onclick=function(){cur=i;try{localStorage.setItem('uk49_rate',String(i))}catch(e){}drawStars()};
  el.appendChild(s);
 }
 document.getElementById('rmsg').textContent=cur?('Obrigado! A sua nota: '+cur+'/5 (fica guardada só neste telemóvel).'):'';
}
drawStars();
document.getElementById('gbt').onclick=function(){
 const n=+document.getElementById('gn').value;
 const a=[];
 while(a.length<n){const x=1+Math.floor(Math.random()*49);if(!a.includes(x))a.push(x)}
 a.sort(function(p,q){return p-q});
 document.getElementById('gres').innerHTML='<div class="box">'+a.map(tag).join('')+'</div>';
};
})();
