let url=new URL(location.href),params=url.searchParams;const WS=io.connect(location.origin+'/frame?side=trans');WS.on('connect',()=>WS.emit('data',{room:'control',field:'ntinit',data:0})),WS.on('trans',e=>{let t=new URL(location.origin+'/FASF2021/transition');for(let a in e)t.searchParams.set(a,e[a]);location.href=t.href});const head=$('head');head.style.backgroundImage='url(//cdn.jsdelivr.net/gh/iwfasf/frame@g60vt/img/FASF2021.svg)';const info=$('info');let txt=Element('span').txt('时间表 > iwfasf.com'),time=[Element('span','time'),Element('span','time'),Element('span').txt(':'),Element('span','time'),Element('span','time')];info.append(txt),txt.style.marginRight='32px';const updateTime=e=>{let t=new Date,a=t.toTimeString();for(let t=0;t<5;t++)2!==t&&e[t].txt(a[t]);setTimeout(updateTime,6e4*(1+(t.getTime()/6e4<<0))-t.getTime(),e)};updateTime(time),info.append(...time);const NT=$('nt');css(NT,{top:'120px',width:'100%'});const initGame=(e,t)=>Element('div','match'+(e?' nf':'')+(t?' r':'')).ap(Element('div','game box').ap(Element('div','player box').ap(Element('p').txt('???')),Element('div','player box').ap(Element('p').txt('???'))));let match=[[],[],[]];const initNT=(e,t=0,a=0)=>(e.ap(initGame(t,a)),t<2&&e.ap(initNT(Element('div','nt'),t+1,0),initNT(Element('div','nt'),t+1,1)),match[2-t].push(e.firstChild),e);initNT(NT);const Champ=Element('div','player box').ap(Element('p').txt('???'));css(NT,{top:'120px',width:'100%'}),NT.ap(Champ),css(Champ,{position:'absolute',zoom:1.26,left:'50%',top:'46%',transform:'translate(-50%, -55%)'}),WS.on('ntc',e=>{Champ.firstChild.txt(e||'???'),Champ.style.backgroundImage=e?'url(//cdn.jsdelivr.net/gh/iwfasf/frame@g60vt/img/NT/avatar/'+Ply.indexOf(e)+'.png':''});const Games=['Competitive Tower Climbing','Crimson Needle 2',"I Wanna Appreciate The Wolf's Enthusiasm",'I Wanna Be A Lovely Child','I Wanna Be The Apollo','I Wanna Be The Fodomia 2','I Wanna Be The Hurtful Pain Remake','I Wanna Be The Mercury','I Wanna Be The RO','I Wanna Chron','I Wanna Duloxetine','I Wanna Enjoy The Galvanized Peppermint Dandy','I Wanna Explore The Mountains','I Wanna Fairy','I Wanna Get My Daily Recommended Amount of Fiber','I Wanna Shiver','Needle Hatena','Needlemaniac','Serotonin','Summer Feast Needle 2019','Till The Sunrise'],Ply=params.get('t.run').split(',').map(e=>e.trim()),setPly=(e,t,a,n)=>{let i=$c('player',match[e][t])[a];-1===n?(i.firstChild.txt('???'),i.style.backgroundImage=''):(i.firstChild.txt(Ply[n]),i.style.backgroundImage='url(//cdn.jsdelivr.net/gh/iwfasf/frame@g60vt/img/NT/avatar/'+n+'.png')},randPly=async()=>{let e=[0,1,2,3,4,5,6,7];for(let t=15;t--;){for(let t=0;t<e.length;t++){let a=Math.random()*e.length<<0,n=e[a];e[a]=e[t],e[t]=n}for(let t=0;t<8;t++)setPly(0,t>>1,t%2,e[t]);await wait(100)}return e};for(let e=0;e<Games.length;e++){let t=Element('div');t.style.backgroundImage='url(//cdn.jsdelivr.net/gh/iwfasf/frame@g60vt/img/NT/'+e+'.png',$('rgame').ap(t)}const randGame=async(e,t)=>{let a,n,i=$('rgame');i.close=!1,css([...i.children],{display:'none'},0),i.firstChild.txt('???'),css(i,{opacity:1,backgroundImage:''}),await wait(1200);for(let t=20;t--;)a=20*Math.random()<<0,0===t&&2===e&&(a=20),n&&(n.style.display='none'),n=i.children[a+1],n.style.display='',i.firstChild.txt(Games[a]),await wait(150);return match[e][t].firstChild.style.backgroundImage='url(//cdn.jsdelivr.net/gh/iwfasf/frame@g60vt/img/NT/'+a+'.png',i.close=!0,a},mapInd=e=>{let t=2;return e<4?t=0:e<6?(e-=4,t=1):e=0,[t,e]};WS.on('randP',async()=>{let e=await randPly();WS.emit('data',{room:'control',field:'randP',data:e.map(e=>Ply[e])})}),WS.on('randG',async e=>{let t=await randGame(...mapInd(e-1));WS.emit('data',{room:'control',field:'randG',data:[e-1,Games[t],t]}),await wait(5e3),$('rgame').close&&($('rgame').style.opacity=0)});for(let e=0;e<7;e++){let[t,a]=mapInd(e);WS.on('ntr'+e,e=>{setPly(t,a,0,Ply.indexOf(e[0])),setPly(t,a,1,Ply.indexOf(e[1]))}),WS.on('ntg'+e,e=>{match[t][a].firstChild.style.backgroundImage=e?'url(//cdn.jsdelivr.net/gh/iwfasf/frame@g60vt/img/NT/'+Games.indexOf(e)+'.png':''})}