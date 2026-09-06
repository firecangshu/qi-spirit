
(function(){
'use strict';
var CSS=[
'#panel{width:238px !important;background:linear-gradient(180deg,rgba(8,20,19,.90),rgba(5,14,13,.94)) !important;border:1px solid rgba(148,212,208,.16) !important;border-radius:16px !important;padding:10px !important;box-shadow:0 14px 44px rgba(0,0,0,.5) !important;}',
'#panelHead{display:flex;align-items:center;justify-content:space-between;padding:2px 4px 8px;}',
'#panelHead h4{font-size:11px !important;letter-spacing:2.5px !important;color:#7FC9C4 !important;margin:0 !important;font-weight:600 !important;}',
'#btnFold{background:rgba(148,212,208,.10) !important;border:1px solid rgba(148,212,208,.25) !important;color:#A8DCD7 !important;border-radius:7px !important;}',
'#btnFold:hover{background:rgba(148,212,208,.22) !important;}',
'.cgroup{background:rgba(9,22,21,.55);border:1px solid rgba(148,212,208,.12);border-radius:11px;margin-bottom:7px;overflow:hidden;transition:border-color .2s ease,background .2s ease;}',
'.cgroup:hover{border-color:rgba(148,212,208,.28);}',
'.chead{display:flex !important;align-items:center;gap:8px;width:100%;padding:9px 12px !important;background:transparent !important;border:none !important;color:#A8DCD7 !important;font-size:11.5px !important;font-weight:600 !important;letter-spacing:.8px !important;cursor:pointer !important;text-align:left !important;font-family:inherit !important;margin:0 !important;}',
'.chead:hover{background:rgba(148,212,208,.06) !important;}',
'.chead .ctitle{flex:1;}',
'.chead .car{font-size:9px;color:rgba(148,212,208,.65);transition:transform .22s ease;transform-origin:center;}',
'.cgroup.collapsed .car{transform:rotate(-90deg);}',
'.cbody{padding:6px 10px 10px !important;}',
'.cgroup.collapsed .cbody{display:none;}',
'#quizWrap.cgroup,#boundwrap.cgroup{background:rgba(8,20,19,.78) !important;border:1px solid rgba(148,212,208,.14) !important;box-shadow:0 10px 32px rgba(0,0,0,.4);}',
'#quizWrap .cbody{padding:10px 12px !important;}',
'#boundwrap .cbody{padding:8px 12px 10px !important;}',
'#boundwrap h4.chead{border-radius:0 !important;}',
'.btn{font-size:12px !important;padding:8px 10px !important;border-radius:9px !important;background:rgba(148,212,208,.06) !important;border:1px solid rgba(148,212,208,.20) !important;color:#D7F0ED !important;margin-bottom:6px !important;transition:all .18s ease !important;}',
'.btn:hover{background:rgba(148,212,208,.15) !important;border-color:rgba(148,212,208,.42) !important;}',
'.statebtn{border-radius:8px !important;border-color:rgba(148,212,208,.16) !important;font-size:10.5px !important;padding:7px 2px !important;color:#8FB5B1 !important;background:rgba(255,255,255,.02) !important;transition:all .18s ease !important;}',
'.statebtn:hover{color:#D7F0ED !important;border-color:rgba(148,212,208,.4) !important;}',
'.statebtn.on{background:rgba(148,212,208,.16) !important;color:#EFFCFA !important;border-color:rgba(148,212,208,.55) !important;}',
'.particlebtn{background:rgba(255,255,255,.02) !important;border:1px solid rgba(148,212,208,.14) !important;transition:all .18s ease !important;}',
'.particlebtn:hover{border-color:rgba(148,212,208,.4) !important;}',
'.particlebtn.on{background:rgba(148,212,208,.13) !important;border-color:rgba(148,212,208,.5) !important;}',
'.skinbtn{border-radius:8px !important;border-color:rgba(148,212,208,.18) !important;background:rgba(255,255,255,.02) !important;color:#8FB5B1 !important;}',
'.skinbtn.on{background:rgba(148,212,208,.15) !important;color:#EFFCFA !important;}',
'#songSel,#quizCustom,#profileIO{background:rgba(5,14,13,.9) !important;border:1px solid rgba(148,212,208,.22) !important;}',
'.row label{color:#8FB5B1 !important;font-size:11px !important;letter-spacing:.4px !important;}',
'.row output{color:#7FC9C4 !important;}',
'input[type=range]{accent-color:#5FD4CC;}',
'.cbody .row label{white-space:nowrap;font-size:10.5px !important;}',
'.cbody .row input[type=range]{flex:1 1 auto;width:auto;min-width:0;}',
'.cbody .row output{flex:none;margin-left:8px;}',
'#panel::-webkit-scrollbar{width:4px;}',
'#panel::-webkit-scrollbar-thumb{background:rgba(148,212,208,.22);border-radius:4px;}',
'#panel::-webkit-scrollbar-track{background:transparent;}',
'#topbar #state{backdrop-filter:blur(10px);border-color:rgba(148,212,208,.3) !important;}',
'#hint{font-size:10px !important;color:rgba(160,200,196,.5) !important;}',
'#vRaw,#vMap,#vR{color:#A8DCD7 !important;}'
].join('\n');
var st=document.createElement('style'); st.id='uiProStyle'; st.textContent=CSS; document.head.appendChild(st);

/* ---- 粒子随机度（0=关闭随机：均匀尺寸+统一颜色） ---- */
window.particleRand=parseFloat((function(){try{return localStorage.getItem('ql_rand');}catch(e){return null;}})()||'0.45');
function persistG(id,open){try{var s=JSON.parse(localStorage.getItem('ql_groups')||'{}');s[id]=open;localStorage.setItem('ql_groups',JSON.stringify(s));}catch(e){}}
function isOpen(id,def){try{var s=JSON.parse(localStorage.getItem('ql_groups')||'{}');if(id in s)return s[id];}catch(e){}return def;}
function mk(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function wireHead(g,id,h){h.addEventListener('click',function(){g.classList.toggle('collapsed');persistG(id,!g.classList.contains('collapsed'));});}

function makeGroup(id,title,defOpen,nodes){
  var open=isOpen(id,defOpen);
  var g=mk('div','cgroup'+(open?'':' collapsed'));
  var h=mk('button','chead','<span class="ctitle">'+title+'</span><span class="car">▼</span>');
  var b=mk('div','cbody');
  nodes.forEach(function(n){if(n)b.appendChild(n);});
  g.appendChild(h);g.appendChild(b);
  wireHead(g,id,h);
  g.dataset.gid=id;
  return g;
}

/* ---- 重组右侧控制面板 ---- */
var panel=document.getElementById('panel');
if(panel && !panel.dataset.uipro){
  panel.dataset.uipro='1';
  var head=document.getElementById('panelHead');
  var byId=function(i){return document.getElementById(i);};
  function labelByPrefix(prefix){
    var kids=[].slice.call(panel.children);
    for(var i=0;i<kids.length;i++){
      var d=kids[i];
      if(d.tagName==='DIV'&&!d.id&&!d.className&&d.textContent.indexOf(prefix)===0)return d;
    }
    return null;
  }
  var gAudio=makeGroup('audio','🎵 音频输入',false,[
    byId('btnMusic'),byId('songSel')?byId('songSel').parentNode:null,
    byId('btnBeat'),byId('btnUpload'),byId('btnMic'),byId('fileInput')]);
  var gEmo=makeGroup('emo','💗 情绪预览',true,[labelByPrefix('状态 · 情绪预览'),byId('stateRow')]);
  var gExt=makeGroup('ext','🧪 扩展形态库',false,[labelByPrefix('扩展形态库'),byId('extRow')]);
  var skinLbl=labelByPrefix('视觉皮肤'); if(skinLbl)skinLbl.textContent='粒子形态 · 标准 / 变形';
  var ptLbl=labelByPrefix('粒子效果'); if(ptLbl)ptLbl.textContent='贴图素材 · 点击切换';
  var gPt=makeGroup('pt','✨ 粒子效果',true,[skinLbl,byId('skinRow'),ptLbl,byId('particleRow')]);
  var gParam=makeGroup('param','🎛 参数',false,[
    byId('sensitivity')?byId('sensitivity').closest('.row'):null]);
  var boundRow=byId('boundR')?byId('boundR').closest('.row'):null;
  if(boundRow&&boundRow.parentNode)boundRow.parentNode.removeChild(boundRow); // 移除边界半径调节（固定内部默认值）
  /* 情绪颜色：11 种情绪的实时调色 */
  var colorBox=mk('div');
  colorBox.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:5px 10px;max-height:36vh;overflow-y:auto;padding-right:2px;';
  var colorHint=mk('div'); colorHint.style.cssText='grid-column:1/3;font-size:10px;color:#6FA8A3;line-height:1.5;';
  colorHint.textContent='改色立即生效并保存到本机；扩展形态颜色跟随当前情绪。';
  colorBox.appendChild(colorHint);
  if(window.QilingColor){
    window.QilingColor.list().forEach(function(it){
      var cell=mk('label');
      cell.style.cssText='display:flex;align-items:center;gap:6px;font-size:10.5px;color:#8FB5B1;cursor:pointer;white-space:nowrap;';
      var inp=mk('input');
      inp.type='color'; inp.value=it.color;
      inp.style.cssText='width:24px;height:18px;border:none;background:transparent;padding:0;cursor:pointer;flex:none;';
      inp.addEventListener('input',function(){ window.QilingColor.set(it.m,inp.value); });
      cell.appendChild(inp); cell.appendChild(document.createTextNode(it.emo));
      colorBox.appendChild(cell);
    });
  }
  var gColor=makeGroup('color','🎨 情绪颜色',false,[colorBox]);
  /* 随机度滑杆 */
  var randRow=mk('div','row');
  randRow.innerHTML='<label title="每颗粒子之间的尺寸/明暗差异。0=完全均匀，越大颗粒越参差">颗粒差异</label><input type="range" id="randAmt" min="0" max="1" step="0.05" value="'+window.particleRand+'"><output>'+Math.round(window.particleRand*100)+'%</output>';
  gPt.querySelector('.cbody').appendChild(randRow);
  var ra=randRow.querySelector('input');
  ra.addEventListener('input',function(){
    window.particleRand=parseFloat(ra.value);
    randRow.querySelector('output').textContent=Math.round(window.particleRand*100)+'%';
    try{localStorage.setItem('ql_rand',ra.value);}catch(e){}
  });
  /* 粒子大小全局缩放（40%~200%，对所有素材生效） */
  window.particleSize=parseFloat((function(){try{return localStorage.getItem('ql_size');}catch(e){return null;}})()||'1');
  var sizeRow=mk('div','row');
  sizeRow.innerHTML='<label>粒子大小</label><input type="range" id="sizeAmt" min="0" max="1" step="0.05" value="'+window.particleSize+'"><output>'+Math.round(window.particleSize*100)+'%</output>';
  gPt.querySelector('.cbody').appendChild(sizeRow);
  var sa=sizeRow.querySelector('input');
  sa.addEventListener('input',function(){
    window.particleSize=parseFloat(sa.value);
    sizeRow.querySelector('output').textContent=Math.round(window.particleSize*100)+'%';
    try{localStorage.setItem('ql_size',sa.value);}catch(e){}
  });
  /* 变化速度：控制粒子运动与形变的快慢（0.2x~2x） */
  window.particleSpeed=parseFloat((function(){try{return localStorage.getItem('ql_speed');}catch(e){return null;}})()||'1');
  var spdRow=mk('div','row');
  spdRow.innerHTML='<label>变化速度</label><input type="range" id="speedAmt" min="0" max="2" step="0.05" value="'+window.particleSpeed+'"><output>'+window.particleSpeed+'x</output>';
  gPt.querySelector('.cbody').appendChild(spdRow);
  var spdIn=spdRow.querySelector('input');
  spdIn.addEventListener('input',function(){
    window.particleSpeed=parseFloat(spdIn.value);
    spdRow.querySelector('output').textContent=window.particleSpeed+'x';
    try{localStorage.setItem('ql_speed',spdIn.value);}catch(e){}
  });
  /* 拖尾占比（萤火虫模式：带光迹飞行的个体比例，4%~30%） */
  window.trailRatio=parseFloat((function(){try{return localStorage.getItem('ql_trail');}catch(e){return null;}})()||'0.12');
  var trRow=mk('div','row');
  trRow.innerHTML='<label title=\"萤火虫模式下，带拖尾光迹飞行的个体占比\">拖尾占比</label><input type="range" id="trailAmt" min="0" max="0.5" step="0.01" value="'+window.trailRatio+'"><output>'+Math.round(window.trailRatio*100)+'%</output>';
  gPt.querySelector('.cbody').appendChild(trRow);
  var trIn=trRow.querySelector('input');
  trIn.addEventListener('input',function(){
    window.trailRatio=parseFloat(trIn.value);
    trRow.querySelector('output').textContent=Math.round(window.trailRatio*100)+'%';
    try{localStorage.setItem('ql_trail',trIn.value);}catch(e){}
  });
  /* 自主随机切换开关：关=锁定当前情绪（不再自动巡游），开=恢复自主状态机 */
  var autoRow=mk('div','row');
  autoRow.innerHTML='<label>自主随机切换</label><button id="autoRandBtn" style="flex:0 0 auto;padding:3px 14px;border-radius:12px;border:1px solid rgba(148,212,208,.4);background:rgba(148,212,208,.18);color:#EFFCFA;font-size:11px;cursor:pointer;font-family:inherit;">开</button>';
  var stateRowEl=gEmo.querySelector('#stateRow');
  if(stateRowEl)stateRowEl.parentNode.insertBefore(autoRow,stateRowEl);
  var abtn=autoRow.querySelector('#autoRandBtn');
  function renderAutoBtn(){var on=abtn.dataset.on==='1';abtn.textContent=on?'开':'关';abtn.style.background=on?'rgba(148,212,208,.18)':'rgba(255,255,255,.04)';abtn.style.color=on?'#EFFCFA':'#8FB5B1';abtn.style.borderColor=on?'rgba(148,212,208,.5)':'rgba(148,212,208,.25)';}
  window.setAutoRandom=function(on){abtn.dataset.on=on?'1':'0';renderAutoBtn();};
  abtn.dataset.on='1';renderAutoBtn();
  abtn.addEventListener('click',function(){
    var turnOn=abtn.dataset.on!=='1';
    if(turnOn){
      if(window.__clearManualState)window.__clearManualState();
    }else{
      var cur=document.querySelector('#stateRow .statebtn.on');
      if(!cur||cur.dataset.state==='auto')cur=document.querySelector('#stateRow .statebtn[data-state="breathing"]');
      if(cur)cur.click();
    }
  });
  [].slice.call(panel.children).forEach(function(c){if(c!==head)panel.removeChild(c);});
  [gEmo,gExt,gPt,gColor,gAudio,gParam].forEach(function(g){panel.appendChild(g);});
}

/* ---- 盲测卡收起/展开 ---- */
var qw=document.getElementById('quizWrap');
if(qw && !qw.dataset.uipro){
  qw.dataset.uipro='1';
  var h4=qw.querySelector('h4');
  var qh=mk('button','chead','<span class="ctitle">🎯 情绪识别 · 盲测</span><span class="car">▼</span>');
  if(h4)h4.parentNode.replaceChild(qh,h4);
  var qb=mk('div','cbody');
  [].slice.call(qw.children).forEach(function(c){if(c!==qh)qb.appendChild(c);});
  qw.appendChild(qb);
  qw.classList.add('cgroup');
  if(!isOpen('quiz',false))qw.classList.add('collapsed');
  wireHead(qw,'quiz',qh);
}

/* ---- SAFETY GATE 卡收起/展开 ---- */
var bw=document.getElementById('boundwrap');
if(bw && !bw.dataset.uipro){
  bw.dataset.uipro='1';
  var bh4=bw.querySelector('h4');
  var bhd=mk('button','chead','<span class="ctitle">双向约束 · SAFETY GATE</span><span class="car">▼</span>');
  if(bh4)bh4.parentNode.replaceChild(bhd,bh4);
  var bb=mk('div','cbody');
  [].slice.call(bw.children).forEach(function(c){if(c!==bhd)bb.appendChild(c);});
  bw.appendChild(bb);
  bw.classList.add('cgroup');
  if(!isOpen('gate',false))bw.classList.add('collapsed');
  wireHead(bw,'gate',bhd);
}
})();
