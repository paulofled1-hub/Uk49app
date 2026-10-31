(function(){
const inp=document.createElement('input');
inp.id='pd';
inp.placeholder='Pares de hoje, ex: 13-22, 5-42';
const btn=document.querySelector('button[onclick="gen()"]');
btn.before(inp);
btn.textContent='Gerar 10 fortes de cada (2, 3, 4 e 5)';
$('k').style.display='none';
window.gen=function(){
 const {f,P}=stats();
 const pc=(a,b)=>P[Math.min(a,b)+'-'+Math.max(a,b)]||0;
 const today=($('pd').value||'').split(/[,;]+/).map(s=>s.trim().split(/[-\s]+/).map(Number)).filter(p=>p.length===2&&p.every(x=>x>=1&&x<=49)&&p[0]!==p[1]);
 const pairs=[['A','B'],['A','C'],['B','C']];
 let html='';
 [2,3,4,5].forEach(k=>{
  const seen=new Set(),cand=[];
  for(let t=0;t<8000;t++){
   const[g1,g2]=pairs[t%3];
   let pool=[...G[g1],...G[g2]],ch=[];
   if(today.length&&t%2===0){
    const p=today[(t>>1)%today.length];
    if(p.every(x=>pool.includes(x))){ch=[p[0],p[1]];pool=pool.filter(x=>!ch.includes(x))}
   }
   while(ch.length<k){
    const n=pick(pool,x=>(1+f[x])*(1+ch.reduce((s,c)=>s+pc(x,c),0)));
    ch.push(n);pool=pool.filter(x=>x!==n);
   }
   if(!(ch.some(x=>grp(x)===g1)&&ch.some(x=>grp(x)===g2)))continue;
   ch.sort((a,b)=>a-b);const key=ch.join(',');
   if(seen.has(key))continue;seen.add(key);
   let s=0;
   for(let i=0;i<k;i++){s+=f[ch[i]];for(let j=i+1;j<k;j++)s+=pc(ch[i],ch[j])}
   let hit=0;
   today.forEach(p=>{if(ch.includes(p[0])&&ch.includes(p[1]))hit++});
   s+=hit*50;
   cand.push({ch,g:g1+g2,s,hit});
  }
  cand.sort((a,b)=>b.s-a.s);
  const out=[],cnt={};
  for(const c of cand){
   if(!c.hit){if((cnt[c.g]||0)>=4)continue;cnt[c.g]=(cnt[c.g]||0)+1}
   out.push(c);
   if(out.length===10)break;
  }
  html+='<h2>'+k+' a '+k+'</h2>'+out.map((o,i)=>'<div class="box"><small>'+(i+1)+'. '+o.g+(o.hit?' ★':'')+' · '+o.s+' pts</small> '+o.ch.map(tag).join('')+'</div>').join('');
 });
 $('out').innerHTML=html;
};
})();
