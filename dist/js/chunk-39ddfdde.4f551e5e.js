(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39ddfdde"],{"92af":function(t,o,e){"use strict";e.r(o);var r=e("7a23");const i=t=>(Object(r["x"])("data-v-1374c02c"),t=t(),Object(r["v"])(),t),l={class:"cont-box"},n=i(()=>Object(r["g"])("h3",{class:"main-title"},"详情",-1)),s={class:"table-box"},c={class:"public-table"},u=i(()=>Object(r["g"])("th",null,"楼层",-1)),m=i(()=>Object(r["g"])("th",null,"别称",-1)),a=i(()=>Object(r["g"])("th",null,"本层房间数",-1)),b=["onMouseenter"],d={key:0,class:"input-box"},h=["onClick"],f={key:1},j=["onClick"],O=["onClick"];function p(t,o,e,i,p,L){return Object(r["u"])(),Object(r["f"])("div",l,[n,Object(r["g"])("div",s,[Object(r["g"])("table",c,[Object(r["g"])("thead",null,[Object(r["g"])("tr",null,[u,m,a,(Object(r["u"])(!0),Object(r["f"])(r["a"],null,Object(r["A"])(new Array(p.linesNo),(t,o)=>(Object(r["u"])(),Object(r["f"])("th",{key:o},"房间号"))),128))])]),Object(r["g"])("tbody",null,[(Object(r["u"])(!0),Object(r["f"])(r["a"],null,Object(r["A"])(p.roomListResult,(t,e)=>(Object(r["u"])(),Object(r["f"])("tr",{key:e},[Object(r["g"])("td",null,Object(r["E"])(t.floor),1),Object(r["g"])("td",null,Object(r["E"])(t.name),1),Object(r["g"])("td",null,Object(r["E"])(t.propertyNo),1),(Object(r["u"])(!0),Object(r["f"])(r["a"],null,Object(r["A"])(t.roomList,(t,i)=>(Object(r["u"])(),Object(r["f"])("td",{key:i,onMouseenter:t=>L.mouseenterFn(e,i,"room"),onMouseleave:o[1]||(o[1]=(...t)=>L.mouseleaveFn&&L.mouseleaveFn(...t))},[L.inputFlag(e,i,"room")?(Object(r["u"])(),Object(r["f"])("div",d,[Object(r["L"])(Object(r["g"])("input",{class:"table-input","onUpdate:modelValue":o[0]||(o[0]=t=>p.inputEditVal=t)},null,512),[[r["H"],p.inputEditVal]]),Object(r["g"])("i",{class:"i-confirm",onClick:t=>L.confirmFn(e,i,"room")},null,8,h)])):(Object(r["u"])(),Object(r["f"])("div",f,[Object(r["g"])("span",null,Object(r["E"])(t.room),1),L.editFlag(e,i,"room")&&""!=t.room?(Object(r["u"])(),Object(r["f"])("i",{key:0,class:"i-edit",onClick:o=>L.editFn(t.room)},null,8,j)):Object(r["e"])("",!0),L.editFlag(e,i,"room")&&""!=t.room?(Object(r["u"])(),Object(r["f"])("i",{key:1,class:"i-delete",onClick:t=>L.deleteFn(e,i)},null,8,O)):Object(r["e"])("",!0)]))],40,b))),128))]))),128))])])])])}var L={data(){return{linesNo:10,floorList:[{floor:"地上1层",floorId:"1",name:"1层",propertyNo:"20",roomList:[{room:"101"},{room:"102"},{room:"103"},{room:"104"},{room:"105"},{room:"106"},{room:"107"},{room:"108"},{room:"109"},{room:"110"},{room:"111"},{room:"112"},{room:"113"},{room:"114"},{room:"115"},{room:"116"},{room:"117"},{room:"118"},{room:"119"},{room:"120"}]},{floor:"地上2层",floorId:"2",name:"2层",propertyNo:"6",roomList:[{room:"201"},{room:"202"},{room:"203"},{room:"204"},{room:"205"}]},{floor:"地上3层",floorId:"3",name:"3层",propertyNo:"11",roomList:[{room:"301"},{room:"302"},{room:"303"},{room:"304"},{room:"305"},{room:"306"},{room:"307"},{room:"308"},{room:"309"},{room:"310"},{room:"311"}]}],roomListResult:[],inputEditVal:"",startEdit:!1,currentLine:-1,currentCol:-1,currentStr:""}},mounted(){this.initResultData()},methods:{initResultData(){let t=this.linesNo,o=[];for(let e in this.floorList){let r=this.floorList[e],i=r.floor,l=r.floorId,n=r.name,s=r.roomList,c=s.length,u=Math.ceil(c/t);0==c&&(u=1);for(let e=1;e<=u;e++){let r={floor:"",floorId:l,lineId:e,name:"",propertyNo:"",roomList:[]};1==e&&(r.floor=i,r.name=n,r.propertyNo=c);for(let o=t*(e-1);o<t*e;o++)c>o?r.roomList.push(s[o]):r.roomList.push({room:""});o.push(r)}this.roomListResult=o}},deleteData(t,o){let e=this.roomListResult[t].floorId,r=this.roomListResult[t].lineId,i=this.linesNo*(r-1)+o;this.floorList[e-1].roomList.splice(i,1),this.checkLinesNo()},checkLinesNo(){let t=[],o=0;for(let e in this.floorList)t[e]=this.floorList[e].roomList.length,this.floorList[e].roomList.length<this.linesNo&&o++;o==this.floorList.length&&(t.sort((function(t,o){return o-t})),this.linesNo=t[0])},mouseenterFn(t,o,e){this.currentLine=t,this.currentCol=o,this.currentStr=e},mouseleaveFn(){this.currentLine=-1,this.currentCol=-1,this.currentStr="",this.startEdit=!1},editFn(t){this.startEdit=!0,this.inputEditVal=t},confirmFn(t,o,e){this.startEdit=!1,this.roomListResult[t].roomList[o][""+e]=this.inputEditVal},deleteFn(t,o){this.deleteData(t,o),this.initResultData()},editFlag(t,o,e){return!this.startEdit&&this.currentLine==t&&this.currentCol==o&&this.currentStr==e},inputFlag(t,o,e){return!(!this.startEdit||this.currentLine!=t||this.currentCol!=o||this.currentStr!=e)}}},g=(e("e3bd"),e("6b0d")),k=e.n(g);const F=k()(L,[["render",p],["__scopeId","data-v-1374c02c"]]);o["default"]=F},e0f1:function(t,o,e){},e3bd:function(t,o,e){"use strict";e("e0f1")}}]);
//# sourceMappingURL=chunk-39ddfdde.4f551e5e.js.map