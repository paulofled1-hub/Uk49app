const sharp=require('sharp');
const fs=require('fs');
fs.mkdirSync('assets',{recursive:true});
const bg='<rect width="1024" height="1024" fill="#0d1b2a"/>';
const fg='<circle cx="400" cy="430" r="170" fill="#66cc66"/><circle cx="624" cy="430" r="170" fill="#ffcc55"/><circle cx="512" cy="620" r="170" fill="#66bbff"/>';
const svg=c=>Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">'+c+'</svg>');
(async()=>{
await sharp(svg(bg+fg)).png().toFile('assets/icon-only.png');
await sharp(svg(fg)).png().toFile('assets/icon-foreground.png');
await sharp(svg(bg)).png().toFile('assets/icon-background.png');
console.log('icones criados');
})();
