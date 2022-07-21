const WS=io.connect(location.origin+'/frame?side=control');WS.on('confirm',()=>{confirm('已有控制台正在运行，是否重新连接？')&&WS.emit('replace')});const WSFrame=[];WS.on('f.init',e=>{e!==WSFrame.frame&&WSFrame.switch?WSFrame.switch.onclick():WSFrame.forEach(e=>e.send())});const WSSend=(e,t,n,r="bilibili,twitch")=>(e.field=t,e.send=()=>{WS.emit('data',{room:r,field:t,data:e.value||n})},n||setTimeout(e=>{e.parentNode.ws||(e.parentNode.ws=[]),e.parentNode.ws.push(e)},10,e),e),WSBind=(e,t,n,r,a="bilibili,twitch")=>WSSend(bindUpd(Element('span'),e,t,(e,t)=>{e.value=n?n(t):t,e.txt(e.value),e.send&&e.send()}),r,0,a),WSFrom=(e,t,n)=>{let r=bindArr(Element('div'),e);return WS.on(n,e=>{let n=t(e);if(void 0!==n&&n!==r.value){r.value=n,r.onchange();let e=r;for(;!e.send;)e=e.parentNode;e.onchange(),e.parentNode.onchange()}}),r},Switch=(e,t,n="")=>{let r=Btn('切换',function(){let e=this.parentNode,n=e.parentNode.parentNode;WSFrame.frame=t,WSFrame.switch=this,localStorage.setItem('WSFrame',t),localStorage.setItem('WSSwitch',this.id),WSFrame.splice(0,WSFrame.length,...e.ws),n.getNext||(n=n.parentNode,WSFrame.push(...e.parentNode.firstChild.ws)),WSFrame.push({send(){WS.emit('data',{room:'bilibili,twitch',field:'f.next',data:n.getNext()})}}),WS.emit('data',{room:'bilibili,twitch',field:'frame',data:t})});return r.id=e.ctrl.id+t+n,r},inputTime=function(){this.value=['setTime',prompt('输入时间（格式 00:37:38.45)')],this.value[1]&&!Number.isNaN(Time.toNumber(this.value[1]))&&this.send()},TimerCtrl=()=>[WSSend(Btn('开始',function(){this.send()}),'timer',['start']),WSSend(Btn('暂停',function(){this.send()}),'timer',['pause']),WSSend(Btn('重置',function(){this.send()}),'timer',['reset']),WSSend(Btn('设置时间',inputTime),'timer',1)],NTGame=e=>[WSSend(Btn('抽游戏',function(){confirm('确认开始随机抽游戏？')&&this.send()}),'randG',e+1,'trans'),WSSend(bindArr(css(Element('input',0,{id:'ntg'+e}),{width:'450px'}),'rg'+e),'ntg'+e,0,'trans')],Trans=e=>{let t=Element('div').ap(Element('h4').txt('转场'),bind(Element('div'),e.ctrl,'data').ap(Btn('切换',function(){let e={};this.parentNode.ws.forEach(t=>{e[t.field]=t.value}),WS.emit('data',{room:'trans',field:'trans',data:e})}),Element('br'),Element('span').txt('时间:'),WSBind(e.ctrl,'start',e=>new Date(1e3*e).toTimeString().slice(0,5),'t.time','trans'),Element('span').txt('时长:'),WSBind(e.sub??e.ctrl,'est',Number,'t.est','trans'),Element('span').txt('流程:'),WSBind(e.sub??e.ctrl,'cat',0,'t.cat','trans'),Element('span').txt('分类:'),WSBind(e.sub??e.ctrl,'type',e=>['Solo Run','Standard Race','Blind Race','Co-op Run','Others','Special Event','Q&A'][Number(e)],'t.type','trans'),Element('br'),Element('span').txt('名称:'),WSSend(bindArr(Element('input'),'t.game',0,e.sub?e.sub.get('game').map(e=>e[0]).join(' + '):e.ctrl.get('name')),'t.game','','trans'),Element('span').txt('封面:'),WSSend(bindArr(Element('input'),'t.cover',0,''),'t.cover','','trans'),Element('span').txt('选手:'),WSSend(bindArr(Element('input'),'t.run',0,e.getRunner().map(e=>e.replace(/(\/\d+)|(\:.+)|(\>.+)/g,'')).join(', ')),'t.run','','trans')));return 7===e.ctrl.get('data').frame&&(t.ap(Element('h4').txt('选手界面'),bind(Element('div',0,{id:'nttrans'}),e.ctrl,'data').ap(Btn('切换',function(){let e={};this.parentNode.ws.forEach(t=>{e[t.field]=t.value,t.send()}),WS.emit('data',{room:'trans',field:'nt',data:e})}),WSSend(Btn('打乱选手',function(){confirm('确认开始随机打乱选手？')&&this.send()}),'randP',1,'trans'),Element('span').txt('冠军:'),WSSend(bindArr(Element('input','inline'),'ntc'),'ntc',0,'trans'),WSSend(bindArr(Element('div'),'t.run',0,e.getRunner().map(e=>e.replace(/(\/\d+)|(\:.+)|(\>.+)/g,'')).join(', ')),'t.run','','trans'),WSSend(bindArr(Element('div'),'rgp0'),'ntr0',0,'trans'),WSSend(bindArr(Element('div'),'rgp1'),'ntr1',0,'trans'),WSSend(bindArr(Element('div'),'rgp2'),'ntr2',0,'trans'),WSSend(bindArr(Element('div'),'rgp3'),'ntr3',0,'trans'),WSSend(bindArr(Element('div'),'rgp4'),'ntr4',0,'trans'),WSSend(bindArr(Element('div'),'rgp5'),'ntr5',0,'trans'),WSSend(bindArr(Element('div'),'rgp6'),'ntr6',0,'trans'),...NTGame(0),...NTGame(1),...NTGame(2),...NTGame(3),...NTGame(4),...NTGame(5),...NTGame(6))),WS.on('ntinit',()=>$('nttrans').firstChild.onclick()),WS.on('randP',e=>{let t;for(let n=0;n<4;n++){for(let r=0;r<2;r++)t=$('ntrgp'+n+r),t.value=e[2*n+r],t.onchange();t.parentNode.onchange()}t.parentNode.parentNode.onchange()}),WS.on('randG',([e,t,n])=>{let r=$('ntg'+e),a=$('f.rgcv'+e);r.value=t,a.value='NT/'+n+'.png',r.onchange(),a.onchange(),r.parentNode.onchange(),$('f.rg'+e).value=t})),t},WSGame=e=>[Element('span').txt('名称:'),WSSend(bindArr(Element('input'),'f.game',0,e.sub?e.sub.get('game').map(e=>e[0]).join(' + '):e.ctrl.get('name')),'f.game'),Element('span').txt('封面:'),WSSend(bindArr(Element('input'),'f.cover',0,''),'f.cover',''),Element('span').txt('时长:'),WSBind(e.sub??e.ctrl,'est',Number,'f.est'),Element('span').txt('流程:'),WSBind(e.sub??e.ctrl,'cat',0,'f.cat')],WSRunner=(e,t,n="")=>{let r=WSSend(bindArr(Element('div'),'f.run'+n,0,e.getRunner().map(e=>e.replace(/(\/\d+)|(\:.+)|(\>.+)/g,''))),'f.run',0,n||'bilibili');for(let e=0;e<t;e++)r.ap(Element('span').txt((n?'T_':'B_')+(e+1)+':'),bindArr(Element('input'),e));return r},subGame=(e,t,n,r)=>[WSSend(bindArr(Element('input'),'rg'+e,0,t),'f.game'),Element('br'),Element('span').txt('流程:'),WSSend(bindArr(Element('input','inline'),'rgc'+e,0,n),'f.cat'),Element('span').txt('时长:'),WSSend(bindArr(Element('input','inline'),'rgt'+e,Number,r),'f.est')],relayRun=(e,t)=>WSSend(bindArr(Element('div'),'rgp'+t,0,[]),'f.run').ap(Element('span').txt('A:'),bindArr(Element('input','inline'),0),WSSend(Btn('计时',function(){this.send()}),'relay',[0,t]),WSSend(Btn('手动设置',function(){this.value=[0,t,prompt('输入时间（格式 00:37:38.45)')],this.value[2]&&!Number.isNaN(Time.toNumber(this.value[2]))&&this.send()}),'stime',1),Element('br'),Element('span').txt('B:'),bindArr(Element('input','inline'),1),WSSend(Btn('计时',function(){this.send()}),'relay',[1,t]),WSSend(Btn('手动设置',function(){this.value=[1,t,prompt('输入时间（格式 00:37:38.45)')],this.value[2]&&!Number.isNaN(Time.toNumber(this.value[2]))&&this.send()}),'stime',1),Element('br'),Element('span').txt('C:'),bindArr(Element('input','inline'),2),WSSend(Btn('计时',function(){this.send()}),'relay',[2,t]),WSSend(Btn('手动设置',function(){this.value=[2,t,prompt('输入时间（格式 00:37:38.45)')],this.value[2]&&!Number.isNaN(Time.toNumber(this.value[2]))&&this.send()}),'stime',1)),relayTime=e=>bindArr(Element('div'),e).ap(WSFrom(0,([t,n,r])=>{if(0===t&&n===e)return r},'relay'),WSFrom(1,([t,n,r])=>{if(1===t&&n===e)return r},'relay'),WSFrom(2,([t,n,r])=>{if(2===t&&n===e)return r},'relay')),NTRun=(e,t)=>WSSend(bindArr(Element('div','IB'),'rgp'+t,0,[],()=>$('nttrans').firstChild.onclick(),()=>WSFrame.switch?.id===e.ctrl.id+'race2'+t),'f.run').ap(bindArr(Element('input','inline',{id:'ntrgp'+t+0}),0),Element('span').txt('VS'),bindArr(Element('input','inline',{id:'ntrgp'+t+1}),1)),NTGC=e=>[WSSend(bindArr(Element('div',0,{id:'f.rg'+e}),'rg'+e),'f.game'),WSSend(bindArr(Element('div',0,{id:'f.rgcv'+e}),'rgcv'+e),'f.cover')],QACtrl=()=>[WSSend(Btn('恢复答题',function(){this.send()}),'qa','resume'),Element('br'),WSSend(Btn('显示答案',function(){this.send()}),'qa','answer'),WSSend(Btn('下一题',function(){this.send()}),'qa','next'),WSSend(Btn('上一题',function(){this.send()}),'qa','prev'),WSSend(Btn('跳转到',function(){this.value=prompt('输入题目序号'),this.value&&!Number.isNaN(Number(this.value))&&this.send()}),'qa',1),WSSend(Btn('结束',function(){this.send()}),'qa','over'),Element('br'),Element('span').txt('音量:'),WSSend(bindArr(Element('input','inline'),'vol'),'vol'),WSSend(Btn('重播音频',function(){this.send()}),'qa','replay')],Frame=e=>{let t=bind(Element('div'),e.ctrl,'data').ap(Element('h4').txt('框架'),bindArr(Element('select').ap(Element('option',0,{value:0}).txt('solo'),Element('option',0,{value:1}).txt('solo(16:9)'),Element('option',0,{value:2}).txt('race2'),Element('option',0,{value:3}).txt('race3'),Element('option',0,{value:4}).txt('race4'),Element('option',0,{value:5}).txt('race5'),Element('option',0,{value:6}).txt('接力赛'),Element('option',0,{value:7}).txt('跳刺锦标赛'),Element('option',0,{value:8}).txt('Q&A'),Element('option',0,{value:9}).txt('Music Quiz')),'frame',Number,0,e=>{css($c('template',n),{display:''},e>5?6:e,{display:'block'})})),n=Element('div').ap(bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'solo'),...TimerCtrl(),Element('br'),...WSGame(e),WSRunner(e,e.ctrl.get('sch').get('r').length)),bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'solow'),...TimerCtrl(),Element('br'),...WSGame(e),WSRunner(e,e.ctrl.get('sch').get('r').length)),bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'race2'),...TimerCtrl(),Element('br'),...WSGame(e),WSRunner(e,2)),bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'race3'),...TimerCtrl(),Element('br'),...WSGame(e),WSRunner(e,3)),bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'race4'),...TimerCtrl(),Element('br'),...WSGame(e),WSRunner(e,4),WSRunner(e,4,'twitch')),bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'race5'),...TimerCtrl(),Element('br'),...WSGame(e),WSRunner(e,5),WSRunner(e,5,'twitch')));return 6===e.ctrl.get('data').frame&&n.ap(Element('div','template').ap(bind(Element('div'),e.ctrl,'data').ap(...TimerCtrl(),Element('br'),Element('span').txt('封面:'),WSSend(bindArr(Element('input'),'f.cover',0,''),'f.cover',''),WSSend(bindArr(Element('div'),'rgp1'),'f.run1'),WSSend(bindArr(Element('div'),'rgp2'),'f.run2'),WSSend(bindArr(Element('div'),'rgp3'),'f.run3'),WSSend(bindArr(Element('div'),'rgp4'),'f.run4'),WSSend(bindArr(Element('div'),'rgp5'),'f.run5'),WSSend(bindArr(Element('div'),'rtime'),'rtime').ap(relayTime(0),relayTime(1),relayTime(2),relayTime(3),relayTime(4))),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('Game 1'),Switch(e,'relay',1),...subGame(1,'Relay Race - Alphazetica','Any%',20),relayRun(0,1)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('Game 2'),Switch(e,'relay',2),...subGame(2,'Relay Race - Not Another Needle Game','To Bad Ending%',40),relayRun(0,2)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('Game 3'),Switch(e,'relay',3),...subGame(3,'Relay Race - I Wanna Hydrate','Any%',25),relayRun(0,3)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('Game 4'),Switch(e,'relay',4),...subGame(4,'Relay Race - I Wanna Be The Blizzard','Any%',25),relayRun(0,4)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('Game 5'),Switch(e,'relay',5),...subGame(5,'Relay Race - I Wanna Be The Cloudburst','Any%',15),relayRun(0,5)))),7===e.ctrl.get('data').frame&&n.ap(Element('div','template').ap(bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('流程:'),WSSend(bindArr(Element('input','inline'),'rgc',0,'Any%'),'f.cat'),Element('span').txt('时长:'),WSSend(bindArr(Element('input','inline'),'rgt',Number,15),'f.est'),Element('br'),...TimerCtrl()),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('8进4第1场'),Switch(e,'race2',0),NTRun(e,0),...NTGC(0)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('8进4第2场'),Switch(e,'race2',1),NTRun(e,1),...NTGC(1)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('8进4第3场'),Switch(e,'race2',2),NTRun(e,2),...NTGC(2)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('8进4第4场'),Switch(e,'race2',3),NTRun(e,3),...NTGC(3)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('半决赛第1场'),Switch(e,'race2',4),NTRun(e,4),...NTGC(4)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('半决赛第2场'),Switch(e,'race2',5),NTRun(e,5),...NTGC(5)),bind(Element('div'),e.ctrl,'data').ap(Element('span').txt('决赛'),Switch(e,'race2',6),NTRun(e,6),...NTGC(6)))),8===e.ctrl.get('data').frame&&n.ap(bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'qa'),...TimerCtrl(),...QACtrl(),css(WSBind(e.ctrl,'est',Number,'f.est'),{display:'none'}))),9===e.ctrl.get('data').frame&&n.ap(bind(Element('div','template'),e.ctrl,'data').ap(Switch(e,'mq'),...TimerCtrl(),...QACtrl(),css(WSBind(e.ctrl,'est',Number,'f.est'),{display:'none'}))),[t,n]};window.init=async()=>{let e=await new AV.Query('Control').include(['sub.run','sch']).limit(999).find({useMasterKey:!0});const t=$('list'),n=$('edit'),r=$('schedule'),a=[1660348800,1660435200,1660867200,1660953600,166104e4],i=e=>{if(!e.ctrl.get('start'))return;if(e.sch)return updBind(e.ctrl,'start'),void r.ap(e.sch);let t=Element('div','sch');t.id=e.ctrl.id,bindUpd(t,e.ctrl,'start',(e,t)=>{let n=0;for(;n<a.length&&!(a[n]>t);n++);let r=(t-a[--n])/30;css(e,{left:20*n+'%',top:r/24+'%',zIndex:10+r})}),t.ap(bindUpd(Element('span','sch-time'),e.ctrl,'start',(e,t)=>e.txt(new Date(1e3*t).toTimeString().slice(0,5)+' - '))),e.sub?(bindUpd(t,e.sub,'est',(e,t)=>e.style.height=t/12+'%'),bindUpd(t,e.sub,'type',(e,t)=>e.className='sch s'+t),t.ap(bindUpd(Element('span','sch-game'),e.sub,'game',(e,t)=>e.txt(t.map(e=>e[0]).join(' + '))))):(bindUpd(t,e.ctrl,'est',(e,t)=>e.style.height=t/12+'%'),bindUpd(t,e.ctrl,'type',(e,t)=>e.className='sch s'+t),t.ap(bindUpd(Element('span','sch-game'),e.ctrl,'name',(e,t)=>e.txt(t)))),t.onmousedown=e=>{e.button?(t.ctrl.unset('start'),t.remove()):(r.drag=t,r.dragX=-r.parentNode.offsetLeft,r.dragY=t.offsetTop-e.y)},t.ondblclick=()=>{$c('now')[0]?.classList.remove('now'),t.classList.add('now'),e.onclick(),localStorage.setItem('currentRun',t.id)},e.sch=t,t.ctrl=e.ctrl,r.ap(t)};r.onmousemove=e=>{if(!r.drag)return;let t=Math.min(4,Math.max(0,(r.dragX+e.x)/r.offsetWidth*5<<0)),n=300*Math.max(0,(r.dragY+e.y)/r.offsetHeight*240<<0);updBind(r.drag.ctrl,'start',a[t]+n)},r.onmouseup=r.onmouseleave=()=>r.drag=null,r.oncontextmenu=e=>e.preventDefault();e.forEach(e=>{let r=(e=>{let r=Element('div','list');r.ctrl=e,r.sub=e.get('sub'),r.p=Element('div'),r.add=Element('div','add-sch'),r.getRunner=()=>r.ctrl.get('run')?r.ctrl.get('run').split(','):r.ctrl.get('sch').get('r');let l=r.sub??e;return r.ctrl.get('start')&&r.p.ap(Element('span').txt('时长:'),bind(Element('input','inline'),l,'est',e=>Number(e)),...r.sub?[bindUpd(Element('span'),r.sub,'cam',(e,t)=>e.txt(['有摄像头',''][t])),bindUpd(Element('span'),r.sub,'com',(e,t)=>e.txt(['有解说','无解说'][t])),bindUpd(Element('span'),r.sub,'comp',(e,t)=>e.txt(t?': '+t:''))]:[],Element('br'),Element('span').txt('分类:'),bind(Element('select').ap(Element('option',0,{value:0}).txt('Solo Run'),Element('option',0,{value:1}).txt('Standard Race'),Element('option',0,{value:2}).txt('Blind Race'),Element('option',0,{value:3}).txt('Co-op Run'),Element('option',0,{value:4}).txt('Others'),Element('option',0,{value:5}).txt('Special Event'),Element('option',0,{value:6}).txt('Q&A')),l,'type',e=>Number(e)),bind(Element('input','inline'),l,'cat'),...r.sub?[bindUpd(Element('span'),r.sub,'win',(e,t)=>e.txt(['4:3','16:9'][t]))]:[],Element('br'),Element('span').txt('选手:'),bind(Element('input'),e,'run',0,e.get('sch')?.get('r').join(',')),Trans(r),...Frame(r),r.add.txt('添加到时间表->')),r.add.onclick=()=>{e.get('start')||e.set('start',a[0]),i(r)},r.p.style.display='none',r.p.getNext=()=>{let e=null,t=1/0;if($c('list').forEach(n=>{let a=n.ctrl.get('start');a>r.ctrl.get('start')&&a<t&&(t=a,e=n)}),e)return e.sch.innerText.slice(0,8)+(e.ctrl.get('data').game??(e.sub?e.sub.get('game').map(e=>e[0]).join(' + '):e.ctrl.get('name')))},t.append(r),n.ap(r.p),r})(e);i(r),((e,t)=>{e.onclick=()=>{let n=$c('list-now')[0];n&&(n.classList.remove('list-now'),n.p.style.display='none'),e.classList.add('list-now'),e.p.style.display='',t?.()}})(r)});let l=localStorage.getItem('currentRun');if(l){let e=$(l);e&&(r.parentNode.scrollTo(0,e.offsetTop-200),e.ondblclick())}WSFrame.frame=localStorage.getItem('WSFrame'),WSFrame.switch=$(localStorage.getItem('WSSwitch')),WSFrame.switch&&setTimeout(()=>WSFrame.switch?.onclick(),1e3);const d=e=>{let t=e.get('name')||e.getUsername(),n=e.get('link');return n&&n.startsWith('http')?t+(e=>e.startsWith('https://space.bilibili.com')?e.slice(26):e.startsWith('https://www.twitch.tv/')?':'+e.slice(22):'>'+e)(n):t},s=e=>JSON.stringify(Object.entries(e._serverData).sort((e,t)=>e[0].localeCompare(t[0])))!==JSON.stringify(Object.entries(e.attributes).sort((e,t)=>e[0].localeCompare(t[0])));$('save-sch').onclick=()=>{let e=[],t=[];$c('list').forEach(n=>{if(n.ctrl)if(n.ctrl.get('start')){let t=n.ctrl.get('sch');t||(t=new AV.Object('Schedule'),t.set('y',(new Date).getFullYear()),n.ctrl.set('sch',t));let r=n.sub??n.ctrl,a=r.get('cat'),i=r.get('type'),l=r.get('est');if(a&&'Any%'!==a&&t.set('c',a),t.set('t',['Solo Run','Standard Race','Blind Race','Co-op Run','Others','Special Event','Q&A'][i]),t.set('e',l),t.set('g',n.sub?r.get('game').map(e=>e[1]?e[0]+'='+e[1].replace('https://delicious-fruit.com/ratings/game_details.php?id=',''):e[0]):[r.get('name')]),t.set('r',n.ctrl.get('run')?n.getRunner():n.sub?r.get('run').map(d):n.getRunner()),t.set('s',new Date(1e3*n.ctrl.get('start'))),!s(t)&&!s(n.ctrl))return;e.push(n.ctrl)}else if(n.ctrl.get('sch')){if(!s(n.ctrl))return;t.push(n.ctrl.get('sch')),n.ctrl.unset('sch'),e.push(n.ctrl)}}),e.length?(console.log(e),AV.Object.destroyAll(t,{useMasterKey:!0}).then(()=>AV.Object.saveAll(e,{useMasterKey:!0})).then(()=>msg('保存成功')).catch(e=>{console.error(e),msg('保存失败',1)})):msg('已保存',2)}};