const SOURCES=['https://lottodraw.com/europe/uk-49s','https://www.lotteries.com/results/uk-49s'];
const MONTHS={january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
const NAMES=['Brunchtime','Lunchtime','Drivetime','Teatime'];
const out={};
function add(d,t,n){
 if(n.length!==7||new Set(n).size!==7||n.some(function(x){return !(x>=1&&x<=49)}))return;
 out[d+'|'+t]={d:d,t:t,n:n};
}
function clean(h){
 return h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&');
}
function parse(h){
 const c=clean(h);
 const lines=c.replace(/<[^>]+>/g,'\n').split('\n').map(function(s){return s.trim()}).filter(Boolean);
 let date=null,type=null,nums=[];
 for(const l of lines){
  const dm=l.match(/^(?:[A-Za-z]+,?\s+)?(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})$/);
  if(dm&&MONTHS[dm[2].toLowerCase()]){
   date=dm[3]+'-'+String(MONTHS[dm[2].toLowerCase()]).padStart(2,'0')+'-'+dm[1].padStart(2,'0');
   type=null;nums=[];continue;
  }
  const nm=l.match(/^(Brunchtime|Lunchtime|Drivetime|Teatime):?$/i);
  if(nm){type=NAMES.find(function(x){return x.toLowerCase()===nm[1].toLowerCase()});nums=[];continue}
  if(type&&/^\d{1,2}$/.test(l)){
   nums.push(parseInt(l,10));
   if(nums.length===7){if(date)add(date,type,nums);type=null;nums=[]}
   continue;
  }
  if(type&&l==='+')continue;
  type=null;nums=[];
 }
 const flat=c.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 const re=/(Brunchtime|Lunchtime|Drivetime|Teatime),[^(]*\((\d{2})\/(\d{2})\/(\d{4})\):\s*([\d,\s]+?)\s*\+\s*Booster\s*(\d{1,2})/gi;
 let m;
 while((m=re.exec(flat))){
  const t=NAMES.find(function(x){return x.toLowerCase()===m[1].toLowerCase()});
  const n=m[5].split(/[,\s]+/).filter(Boolean).map(Number).concat([parseInt(m[6],10)]);
  add(m[4]+'-'+m[3]+'-'+m[2],t,n);
 }
}
(async function(){
 for(const u of SOURCES){
  try{
   const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36','Accept-Language':'en'}});
   const h=await r.text();
   const before=Object.keys(out).length;
   parse(h);
   console.log(u,'status',r.status,'bytes',h.length,'novos',Object.keys(out).length-before);
  }catch(e){console.log(u,'erro',e.message)}
 }
 const draws=Object.values(out).sort(function(a,b){return a.d<b.d?1:a.d>b.d?-1:0});
 console.log('Total sorteios:',draws.length);
 if(draws.length<4){console.log('Poucos resultados, nada a publicar');process.exit(1)}
 require('fs').writeFileSync('results.json',JSON.stringify({updated:new Date().toISOString(),draws:draws}));
 console.log('Mais recente:',draws[0].d,draws[0].t,draws[0].n.join(' '));
})();
