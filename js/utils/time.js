const Time={pad:t=>(t<10?'0':'')+t,toString(t,i=!1){let e=this.pad(t/3600<<0)+this.pad(t%3600/60<<0)+this.pad(t%60<<0);return i&&(e+=(t%1).toFixed(2).slice(2)),e},formatMin(t){return`${this.pad(t/60<<0)}:${this.pad(t%60<<0)}:${this.pad(Math.round(t%1*100))}`},formatSec(t){return`${this.pad(t/60<<0)}:${this.pad(t%60<<0)}.${(t%1).toFixed(2).slice(2)}`},toNumber(t){let[i,e,r]=t.split(':');return 3600*i+60*e+Number(r)}},wait=t=>new Promise(i=>setTimeout(i,t));