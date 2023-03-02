"use strict";var Ao=Object.create;var j=Object.defineProperty;var Mo=Object.getOwnPropertyDescriptor;var $o=Object.getOwnPropertyNames;var Oo=Object.getPrototypeOf,Vo=Object.prototype.hasOwnProperty;var Do=(e,t)=>{for(var o in t)j(e,o,{get:t[o],enumerable:!0})},Oe=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of $o(t))!Vo.call(e,i)&&i!==o&&j(e,i,{get:()=>t[i],enumerable:!(r=Mo(t,i))||r.enumerable});return e};var a=(e,t,o)=>(o=e!=null?Ao(Oo(e)):{},Oe(t||!e||!e.__esModule?j(o,"default",{value:e,enumerable:!0}):o,e)),qo=e=>Oe(j({},"__esModule",{value:!0}),e);var Gn={};Do(Gn,{AbstractUploader:()=>be,MarkdownEditor:()=>Ho,MarkdownView:()=>Uo,toMarkdown:()=>he});module.exports=qo(Gn);var d=a(require("react")),Po=require("slate"),A=require("slate-react");var xe=a(require("react")),Ve=e=>xe.default.createElement("pre",{...e.attributes},xe.default.createElement("code",null,e.children));var De=a(require("react")),qe=e=>De.default.createElement("p",{...e.attributes},e.children);var Re=a(require("react")),Ke=e=>Re.default.createElement("blockquote",{...e.attributes},e.children);var ze=a(require("react")),Ge=e=>ze.default.createElement("h1",{...e.attributes},e.children);var je=a(require("react")),We=e=>je.default.createElement("h2",{...e.attributes},e.children);var Qe=a(require("react")),Je=e=>Qe.default.createElement("h3",{...e.attributes},e.children);var Xe=a(require("react")),Ye=e=>Xe.default.createElement("h4",{...e.attributes},e.children);var Ze=a(require("react")),et=e=>Ze.default.createElement("h5",{...e.attributes},e.children);var tt=a(require("react")),ot=e=>tt.default.createElement("h6",{...e.attributes},e.children);var rt=a(require("react")),nt=e=>rt.default.createElement("ol",{...e.attributes},e.children);var st=a(require("react")),it=e=>st.default.createElement("ul",{...e.attributes},e.children);var lt=a(require("react")),at=e=>lt.default.createElement("li",{...e.attributes},e.children);var l=require("slate"),mt=(e,t,o)=>{l.Transforms.setNodes(e,{...o,type:t})},Ro=e=>{let t=ke(e);t&&l.Transforms.unwrapNodes(e,{at:t})},ke=e=>e.selection?e.selection.anchor.path.slice(0,-1):null,dt=e=>{let t=e.selection?.anchor.path;return t?(t=t.slice(0,-1),l.Node.get(e,t)):null},Ko=e=>{if(!e.selection)return null;let t=dt(e);return t?t.type:null},zo=(e,t)=>{let o=e.selection?.anchor.path;if(!o)return null;do{let r=l.Node.get(e,o);if(!r)return null;if(r.type===t)return r;o=o?.slice(0,-1)}while(o.length>0);return null},ct=e=>{l.Transforms.splitNodes(e,{always:!0})},Go=(e,t,o={})=>{if(l.Transforms.insertNodes(e,{...o.props,type:t,children:o.children||[{text:""}]},{voids:o.voids}),o.createFollowingParagraph&&l.Transforms.insertNodes(e,{type:"paragraph",children:[{text:""}]}),o.createFollowingText!==void 0){if(!e.selection)return;let r=l.Editor.parent(e,e.selection)[1];r[r.length-1]++,l.Transforms.insertNodes(e,{text:o.createFollowingText},{at:r}),l.Transforms.select(e,{anchor:{path:r,offset:o.createFollowingText.length},focus:{path:r,offset:o.createFollowingText.length}})}},jo=(e,t,o={})=>{l.Transforms.wrapNodes(e,{type:t,...o},{split:!0})},Wo=e=>{l.Transforms.liftNodes(e)},Qo=e=>{l.Transforms.unwrapNodes(e)},ve=e=>e.selection?l.Point.equals(e.selection.anchor,e.selection.focus):!1,ut=e=>e.selection?!ve(e):!1,_e=e=>{let t=l.Editor.above(e,{match:r=>l.Editor.isBlock(e,r)}),o=t?t[1]:[];return l.Editor.start(e,o)},pt=e=>{let t=l.Editor.above(e,{match:r=>l.Editor.isBlock(e,r)}),o=t?t[1]:[];return l.Editor.end(e,o)},ft=e=>{if(!e.selection)return null;let t=_e(e),o={anchor:e.selection.anchor,focus:t};return l.Editor.string(e,o)},Jo=e=>{if(!e.selection)return null;let t=pt(e),o={anchor:e.selection.focus,focus:t};return l.Editor.string(e,o)},Xo=(e,t,o)=>{if(!e.selection)return null;let r=Te(e);if(!r)return null;let i=r.lastIndexOf(t);return o?.isolated&&(r.substring(i+t.length,i+t.length*2)===t||r.substring(i-t.length,i)===t)||i===-1?null:{path:e.selection.anchor.path,offset:i}},Yo=(e,t)=>!e.selection||!ve(e)?!1:!!ft(e)?.endsWith(t),Te=e=>e.selection?l.Editor.string(e,{anchor:{path:e.selection.anchor.path,offset:0},focus:e.selection.anchor}):null,gt=(e,t)=>{if(!e.selection)return;let o=_e(e);o&&(l.Transforms.delete(e,{at:{anchor:o,focus:e.selection.anchor}}),l.Transforms.insertText(e,t,{at:o}))},Zo=(e,t)=>{let o=Te(e);o&&(o=o.slice(t),gt(e,o))},er=(e,t)=>{for(let o=0;o<t;o++)l.Editor.deleteBackward(e,{unit:"character"})},tr=(e,t,o)=>{l.Transforms.delete(e,{at:t,distance:o,unit:"character"})},Ct=(e,t)=>e.selection?l.Editor.above(e,{match:o=>t.includes(o.type)})!==void 0:!1,or=(e,t)=>e.selection?Ct(e,[t]):!1,Et=e=>{if(!e.selection)return null;let t=l.Editor.above(e,{match:o=>l.Editor.isBlock(e,o)});return!t||!bt(t[0])?null:t[0]},rr=e=>{if(!e.selection)return null;let t=ke(e);return t?Pe(e,t):null},Pe=(e,t)=>{let o=t;if(o.length===0)return null;do{let r=l.Node.get(e,o);if(!r)return null;if(l.Editor.isBlock(e,r))return o;o=o.slice(0,-1)}while(o.length>0);return null},nr=e=>{if(!e.selection)return null;let t=Et(e);return t?t.type:null},ht=e=>{if(!e.selection)return null;let t=rr(e);return!t||(t=t.slice(0,-1),t=Pe(e,t),!t)?null:l.Node.get(e,t)},sr=e=>{let t=ht(e);return t?t.type:null},yt=e=>{if(!e.selection)return null;let t=l.Editor.node(e,e.selection.anchor);return!t||!xt(t[0])?null:t[0]},bt=e=>{let t=e;return!!(t&&t.type)},xt=e=>{let t=e;return!!(t&&t.text)},ir=e=>{let t=e.selection?.anchor||e.selection?.focus;return t?t.path.length<=2:!1},lr=e=>{let t=e,o=e;return!t.text&&!o.type},ar=e=>{if(ut(e)||!e.selection)return!1;let t=yt(e);return t?t.text==="":!0},mr=e=>{e.selection&&(ct(e),mt(e,"paragraph"),kt(e))},dr=e=>{l.Transforms.insertText(e,`
`)},kt=e=>{for(;!n.isAtRoot(e);)l.Transforms.liftNodes(e)},cr=(e,t,o)=>{e.selection&&l.Transforms.setNodes(e,t,{at:o||e.selection,match:r=>l.Text.isText(r),split:!0})},ur=(e,t,o)=>{l.Transforms.setNodes(e,o,{match:r=>r.type===t})},n={removeInlineNode:Ro,changeCurrentNodeType:mt,createNewNode:Go,createNewNodeOfCurrentType:ct,wrapNode:jo,unwrapNode:Wo,unwrapLeaf:Qo,isCursor:ve,isSelection:ut,nearestBlockPath:Pe,currentBlockStart:_e,currentBlockEnd:pt,textSinceBlockStart:ft,textToBlockEnd:Jo,lastPosOf:Xo,cursorIsBehind:Yo,currentBlockText:Te,setCurrentBlockText:gt,deleteFromLeft:Zo,deleteFromRight:er,deleteAt:tr,isChildOf:or,isChildOfAny:Ct,nearestElementOfType:zo,currentBlock:Et,currentBlockType:nr,currentElement:dt,currentElementType:Ko,currentElementPath:ke,parentBlock:ht,parentBlockType:sr,currentLeaf:yt,isElement:bt,isLeaf:xt,isRoot:lr,isEmpty:ar,isAtRoot:ir,createRootParagraph:mr,createNewline:dr,liftToRoot:kt,setLeafFormat:cr,changeNearestNodeProps:ur};var W=a(require("react")),vt=e=>{let t=W.default.createElement("span",{...e.attributes},e.children);return e.leaf.bold&&(t=W.default.createElement("strong",null,t)),e.leaf.italic&&(t=W.default.createElement("em",null,t)),t};var L=require("slate");var _t=e=>!!L.Editor.marks(e)?.bold,Tt=e=>!!L.Editor.marks(e)?.italic,Pt=(e,t)=>{e.selection&&n.setLeafFormat(e,{bold:!0},t)},pr=e=>{n.setLeafFormat(e,{bold:void 0})},Ht=(e,t)=>{e.selection&&n.setLeafFormat(e,{italic:!0},t)},fr=e=>{n.setLeafFormat(e,{italic:void 0})},gr=e=>{_t(e)?L.Editor.removeMark(e,"bold"):L.Editor.addMark(e,"bold",!0)},Cr=e=>{Tt(e)?L.Editor.removeMark(e,"italic"):L.Editor.addMark(e,"italic",!0)},Er=(e,t)=>{if(["_","*"].includes(t.key))if(n.cursorIsBehind(e,t.key)){let o=n.lastPosOf(e,`${t.key}${t.key}`);if(!o||!e.selection)return;Pt(e,{anchor:o,focus:e.selection.anchor}),L.Editor.addMark(e,"bold",!1),n.deleteAt(e,o,2),n.deleteFromRight(e,1),n.deleteAt(e,e.selection.anchor,1),t.preventDefault()}else{let o=n.lastPosOf(e,t.key,{isolated:!0});if(!o||!e.selection)return;Ht(e,{anchor:o,focus:e.selection.anchor}),L.Editor.addMark(e,"italic",!1),n.deleteAt(e,o,1),t.preventDefault()}},$={isBoldActive:_t,isItalicActive:Tt,toggleBold:gr,toggleItalic:Cr,setBold:Pt,setItalic:Ht,unsetBold:pr,unsetItalic:fr,handleBoldAndItalic:Er};var h=a(require("react"));var Bt="c3c28d77d41f3586b337e8b0e6fe93b850f97a7cef2cc031b5dc872459b00439",hr=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._container_13d6j_6 {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: flex-start;
    background-color: #f7f7f7;
    border-bottom: grey 1px solid;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
}

._innerContainer_13d6j_17 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Bt)){var e=document.createElement("style");e.id=Bt,e.textContent=hr,document.head.appendChild(e)}})();var He={colors:'"../../../shared/styles/colors.module.css"',colorBorderDark:"grey",colorBackgroundToolbar:"#f7f7f7",distances:'"../../../shared/styles/distances.module.css"',sizeBorderSmall:"1px",radiusBorderMedium:"0.6rem",container:"_container_13d6j_6",innerContainer:"_innerContainer_13d6j_17"};var v=a(require("react"));var St="d9db1a05b1818b24916c9e07de634b4a6a8793a822d42f5bb10186875b2aeff4",yr=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._button_1qxs1_6 {
    flex: 1;
    background-color: transparent;
    border: none;
    border-radius: 0.3rem;
    margin: 0.2rem;
    padding: 0.5rem;
}

._button_1qxs1_6.active,._button_1qxs1_6:active,._button_1qxs1_6:hover {
    background-color: #dddddd;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(St)){var e=document.createElement("style");e.id=St,e.textContent=yr,document.head.appendChild(e)}})();var It={colors:'"../../../shared/styles/colors.module.css"',colorBackgroundToolbarActive:"#dddddd",distances:'"../../../shared/styles/distances.module.css"',marginSmall:"0.2rem",paddingMedium:"0.5rem",radiusBorderSmall:"0.3rem",button:"_button_1qxs1_6"};var b=require("react-icons/fa");var Nt=require("react"),c=(0,Nt.createContext)(void 0);var H=e=>{let t=(0,v.useContext)(c),o=(0,v.useMemo)(()=>{switch(e.icon){case"bold":return v.default.createElement(b.FaBold,null);case"italic":return v.default.createElement(b.FaItalic,null);case"ordered-list":return v.default.createElement(b.FaListOl,null);case"unordered-list":return v.default.createElement(b.FaList,null);case"blockquote":return v.default.createElement(b.FaQuoteLeft,null);case"code":return v.default.createElement(b.FaCode,null);case"upload":return v.default.createElement(b.FaUpload,null);case"hyperlink":return v.default.createElement(b.FaLink,null);case"image":return v.default.createElement(b.FaImage,null)}},[e.icon]);return v.default.createElement("button",{onMouseDown:i=>{i.preventDefault()},className:`${It.button} ${t?.toolbar?.buttonClassName||""} ${e.active?"active":""}`,onClick:e.onClick},o||e.text)};var wt=require("slate");var D=(e,t)=>{let[o]=wt.Editor.nodes(e,{match:r=>r.type===t});return!!o},br=(e,t)=>{D(e,t)?n.changeCurrentNodeType(e,"paragraph"):n.changeCurrentNodeType(e,t)},xr=(e,t)=>{if(!D(e,t))return n.liftToRoot(e),n.changeCurrentNodeType(e,t);n.changeCurrentNodeType(e,"paragraph")},kr=(e,t,o,r)=>{if(D(e,t))n.removeInlineNode(e);else{let g=r&&n.isCursor(e)?{...o,children:r}:o;n.changeCurrentNodeType(e,t,g)}},vr=(e,t)=>{let o=D(e,t),r=n.isChildOf(e,"ordered-list-item"),i=n.isChildOf(e,"unordered-list-item"),g=r||i;if(o&&g)return n.unwrapLeaf(e);if(o&&!g)return n.changeCurrentNodeType(e,"paragraph");n.changeCurrentNodeType(e,t),g&&n.wrapNode(e,r?"ordered-list-item":"unordered-list-item")},Be=(e,t)=>{t.shiftKey?n.createNewline(e):n.createRootParagraph(e),t.preventDefault()},_r=(e,t)=>{let o=n.isChildOf(e,"ordered-list-item"),r=n.isChildOf(e,"unordered-list-item"),i=o||r;if(!i||t.shiftKey)return Be(e,t);if(i)return n.createNewNodeOfCurrentType(e),n.changeCurrentNodeType(e,o?"ordered-list-item":"unordered-list-item"),t.preventDefault();Be(e,t)},Ft=(e,t)=>{do n.unwrapNode(e);while(n.parentBlockType(e)===t);n.changeCurrentNodeType(e,"paragraph")},Tr=(e,t,o)=>{let r=t==="ordered-list"?"ordered-list-item":"unordered-list-item";if(D(e,r))return Ft(e,t);n.isChildOf(e,t)||n.wrapNode(e,t),n.changeCurrentNodeType(e,r)},Pr=(e,t,o)=>{if(o.shiftKey){n.unwrapNode(e);let r=n.parentBlock(e);(!r||r.type!==t)&&n.changeCurrentNodeType(e,"paragraph")}else{let r=n.parentBlock(e);if(!n.currentBlock(e)||!r)return;n.wrapNode(e,t)}o.preventDefault()},Hr=(e,t,o)=>{n.textSinceBlockStart(e)===""&&(Ft(e,t),o.preventDefault())},s={defaultIsActive:D,defaultToggle:br,toggleInlineNode:kr,toggleAtRoot:xr,toggleWithListAllowed:vr,onEnterWithShiftLinebreak:Be,onEnterWithListAndNewlineAllowed:_r,toggleListItem:Tr,onTabListItem:Pr,onEnterListItem:Hr};var Br=e=>s.defaultIsActive(e,"unordered-list"),Sr=e=>{s.defaultToggle(e,"unordered-list")},Q={elementType:"unordered-list",isVoid:!1,isInline:!1,active:Br,toggle:Sr};var Ir=e=>s.defaultIsActive(e,"ordered-list"),Nr=e=>{s.defaultToggle(e,"ordered-list")},J={elementType:"ordered-list",isVoid:!1,isInline:!1,active:Ir,toggle:Nr};var wr=e=>s.defaultIsActive(e,"blockquote"),Fr=e=>{s.toggleWithListAllowed(e,"blockquote")},Lr=(e,t)=>{s.onEnterWithListAndNewlineAllowed(e,t)},R={elementType:"blockquote",shortcutText:">",isVoid:!1,isInline:!1,active:wr,toggle:Fr,onEnter:Lr};var Ur=e=>s.defaultIsActive(e,"code"),Ar=e=>{s.toggleWithListAllowed(e,"code")},Mr=(e,t)=>{s.onEnterWithListAndNewlineAllowed(e,t)},K={elementType:"code",shortcutText:"```",isVoid:!1,isInline:!1,active:Ur,toggle:Ar,onEnter:Mr};var $r=e=>s.defaultIsActive(e,"heading-1"),Or=e=>{s.toggleAtRoot(e,"heading-1")},Vr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},X={elementType:"heading-1",shortcutText:"#",isVoid:!1,isInline:!1,active:$r,toggle:Or,onEnter:Vr};var Dr=e=>s.defaultIsActive(e,"heading-2"),qr=e=>{s.toggleAtRoot(e,"heading-2")},Rr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},Y={elementType:"heading-2",shortcutText:"##",isVoid:!1,isInline:!1,active:Dr,toggle:qr,onEnter:Rr};var Kr=e=>s.defaultIsActive(e,"heading-3"),zr=e=>{s.toggleAtRoot(e,"heading-3")},Gr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},Z={elementType:"heading-3",shortcutText:"###",isVoid:!1,isInline:!1,active:Kr,toggle:zr,onEnter:Gr};var jr=e=>s.defaultIsActive(e,"heading-4"),Wr=e=>{s.toggleAtRoot(e,"heading-4")},Qr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},ee={elementType:"heading-4",shortcutText:"####",isVoid:!1,isInline:!1,active:jr,toggle:Wr,onEnter:Qr};var Jr=e=>s.defaultIsActive(e,"heading-5"),Xr=e=>{s.toggleAtRoot(e,"heading-5")},Yr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},te={elementType:"heading-5",shortcutText:"#####",isVoid:!1,isInline:!1,active:Jr,toggle:Xr,onEnter:Yr};var Zr=e=>s.defaultIsActive(e,"heading-6"),en=e=>{s.toggleAtRoot(e,"heading-6")},tn=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},oe={elementType:"heading-6",shortcutText:"######",isVoid:!1,isInline:!1,active:Zr,toggle:en,onEnter:tn};var on=e=>s.defaultIsActive(e,"unordered-list-item"),rn=(e,t)=>{s.toggleListItem(e,"unordered-list",t)},nn=(e,t)=>{s.onTabListItem(e,"unordered-list",t)},sn=(e,t)=>{s.onEnterListItem(e,"unordered-list",t)},re={elementType:"unordered-list-item",shortcutText:"*",isVoid:!1,isInline:!1,active:on,toggle:rn,onTab:nn,onEnter:sn};var ln=e=>s.defaultIsActive(e,"paragraph"),an=e=>{n.changeCurrentNodeType(e,"paragraph")},mn=(e,t)=>{s.onEnterWithShiftLinebreak(e,t)},Lt={elementType:"paragraph",isVoid:!1,isInline:!1,active:ln,toggle:an,onEnter:mn};var dn=e=>s.defaultIsActive(e,"hyperlink"),cn=(e,t,o)=>{if(t?.actor=="shortcut"&&t.actorShortcutMatch){if(t.actorShortcutMatch.length<3)return;let r=t.actorShortcutMatch[1],i=t.actorShortcutMatch[2];n.createNewNode(e,"hyperlink",{children:[{text:r}],props:{href:i},createFollowingText:" "})}else s.toggleInlineNode(e,"hyperlink",o,[{text:"Link"}])},un=(e,t)=>{if(!n.isChildOf(e,"hyperlink"))return n.isSelection(e)?n.wrapNode(e,"hyperlink",t):n.createNewNode(e,"hyperlink",{children:t.children,props:t,voids:!0,createFollowingText:" "});n.changeNearestNodeProps(e,"hyperlink",t)},w={elementType:"hyperlink",shortcutRegex:/\[(.+)]\((.+)\)$/,isVoid:!1,isInline:!0,active:dn,toggle:cn,onUpsert:un};var pn=e=>s.defaultIsActive(e,"image"),fn=(e,t,o)=>{if(t?.actor=="shortcut"&&t.actorShortcutMatch){if(t.actorShortcutMatch.length<3)return;let r=t.actorShortcutMatch[1],i=t.actorShortcutMatch[2];n.createNewNode(e,"image",{props:{src:i,altText:r},createFollowingText:" "})}else s.toggleInlineNode(e,"image",o)},gn=(e,t)=>{let o=n.currentElement(e);o&&(o.type==="image"?n.changeNearestNodeProps(e,"image",t):n.createNewNode(e,"image",{props:t,voids:!0,createFollowingText:" "}))},U={elementType:"image",shortcutRegex:/!\[(.+)]\((.+)\)$/,isVoid:!0,isInline:!0,active:pn,toggle:fn,onUpsert:gn};var Cn=e=>s.defaultIsActive(e,"ordered-list-item"),En=(e,t)=>{s.toggleListItem(e,"ordered-list",t)},hn=(e,t)=>{s.onTabListItem(e,"ordered-list",t)},yn=(e,t)=>{s.onEnterListItem(e,"ordered-list",t)},ne={elementType:"ordered-list-item",shortcutRegex:/^\d+\.$/,isVoid:!1,isInline:!1,active:Cn,toggle:En,onTab:hn,onEnter:yn};var se=[R,K,X,Y,Z,ee,te,oe,U,w,J,ne,Lt,Q,re],q={};se.forEach(e=>{q[e.elementType]=e});var Se=se.filter(e=>!e.isInline),bn={};Se.forEach(e=>{bn[e.elementType]=e});var ie=se.filter(e=>e.isInline),xn={};ie.forEach(e=>{xn[e.elementType]=e});var Ie=se.filter(e=>e.isVoid),kn={};Ie.forEach(e=>{kn[e.elementType]=e});var we=a(require("react"));var Ut="e2cbd0bb5b6c21790b8b55957362db41d4df691cb07631a4b76c996d27234996",vn=`/* fonts *//* paddings *//* margins and gaps *//* borders */

._container_1d8t7_4 {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
}

._spacer_1d8t7_12 {
    width: 1px;
    background-color: black;
    margin: 0.2rem 0.5rem;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ut)){var e=document.createElement("style");e.id=Ut,e.textContent=vn,document.head.appendChild(e)}})();var Ne={distances:'"../../../shared/styles/distances.module.css"',marginSmall:"0.2rem",marginMedium:"0.5rem",sizeBorderSmall:"1px",container:"_container_1d8t7_4",spacer:"_spacer_1d8t7_12"};var z=()=>we.default.createElement("div",{className:Ne.container},we.default.createElement("div",{className:Ne.spacer}));var lo=require("slate-react");var p=a(require("react"));var O=a(require("react"));var At="553561d33d858c9c88c1247998f1605809ef83ae2744380e6e6c68fe54af3978",_n=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._container_kr2au_6 {
    position: relative;
    display: flex;
    flex-direction: column;
}

._innerContainer_kr2au_12 {
    position: absolute;
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 0.6rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    z-index: 10;
}

._innerContainer_kr2au_12.top-right {
    top: 0;
    right: 0;
}

._innerContainer_kr2au_12.top-left {
    top: 0;
    left: 0;
}

._innerContainer_kr2au_12.bottom-right {
    bottom: 0;
    right: 0;
}

._innerContainer_kr2au_12.bottom-left {
    bottom: 0;
    left: 0;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(At)){var e=document.createElement("style");e.id=At,e.textContent=_n,document.head.appendChild(e)}})();var Fe={colors:'"../../styles/colors.module.css"',distances:'"../../styles/distances.module.css"',colorBorderLight:"lightgrey",colorBackgroundModal:"white",sizeBorderSmall:"1px",radiusBorderMedium:"0.6rem",paddingMedium:"0.5rem",container:"_container_kr2au_6",innerContainer:"_innerContainer_kr2au_12"};var Mt=require("usehooks-ts");var le=e=>{let t=(0,O.useContext)(c),o=(0,O.useRef)(null);(0,Mt.useOnClickOutside)(o,e.onClose);let r=i=>{e.onPressEnter&&i.key==="Enter"&&e.onPressEnter()};return O.default.createElement("div",{className:`${Fe.container} ${t?.popover?.containerClassName||""}`},O.default.createElement("div",{className:`${Fe.innerContainer} ${e.align} ${t?.popover?.innerContainerClassName||""}`,ref:o,onKeyDown:r},e.children))};var $t="bc858b3f6659c40172a0c329876e9372a6902d5368e5b159b80897cde0b0dc6f",Tn=`._container_1kagm_1 {
    flex: 1;
    display: flex;
    flex-direction: column;
}

._hrefInput_1kagm_7 {
    min-width: 15rem;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById($t)){var e=document.createElement("style");e.id=$t,e.textContent=Tn,document.head.appendChild(e)}})();var Le={container:"_container_1kagm_1",hrefInput:"_hrefInput_1kagm_7"};var Ce=require("slate-react");var ge=a(require("react"));var Ot="5860ec517ea042dfffa89a980771aee243c5ae5606f5fb028a255f3e6e7449a5",Pn=`/* fonts *//* paddings *//* margins and gaps *//* borders */
._container_nct2d_4 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ot)){var e=document.createElement("style");e.id=Ot,e.textContent=Pn,document.head.appendChild(e)}})();var Vt={distances:'"../../styles/distances.module.css"',marginLarge:"1rem",container:"_container_nct2d_4"};var ae=a(require("react"));var Dt="3ec61f8a4e9e7937269149d2ced4e3ca52f3c26e59ac3e213b56124dcb5e1fa1",Hn=`/* fonts *//* paddings *//* margins and gaps *//* borders */
._container_1kqth_4 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.2rem;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Dt)){var e=document.createElement("style");e.id=Dt,e.textContent=Hn,document.head.appendChild(e)}})();var qt={distances:'"../../styles/distances.module.css"',marginSmall:"0.2rem",container:"_container_1kqth_4"};var me=e=>{let t=(0,ae.useContext)(c);return ae.default.createElement("div",{className:`${qt.container} ${t?.forms?.groupClassName||""}`},e.children)};var de=a(require("react"));var Rt="3e64a7eabcf4f490a8e45be1b2bed8728fbbdee2d22851dcdbaa12f69da0d77b",Bn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */
._label_1escg_6 {
    font-size: small;
    color: dimgray
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(Rt)){var e=document.createElement("style");e.id=Rt,e.textContent=Bn,document.head.appendChild(e)}})();var Kt={colors:'"../../styles/colors.module.css"',colorFontSecondary:"dimgray",distances:'"../../styles/distances.module.css"',sizeFontSmall:"small",label:"_label_1escg_6"};var zt=e=>{let t=(0,de.useContext)(c);return de.default.createElement("label",{className:`${Kt.label} ${t?.forms?.labelClassName}`},e.text)};var ce=a(require("react"));var Gt="f8cab1c8eb1d54cbf3b0fdb379083c1cebe8131bf3d826af6c36c2f82a6e45ea",Sn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */
._input_kerls_6 {
    padding: 0.5rem;
    font-size: default;
    border-radius: 0.3rem;
    border: 1px solid lightgrey;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Gt)){var e=document.createElement("style");e.id=Gt,e.textContent=Sn,document.head.appendChild(e)}})();var jt={colors:'"../../styles/colors.module.css"',colorBorderLight:"lightgrey",distances:'"../../styles/distances.module.css"',paddingMedium:"0.5rem",radiusBorderSmall:"0.3rem",sizeFontMedium:"default",sizeBorderSmall:"1px",input:"_input_kerls_6"};var Wt=e=>{let t=(0,ce.useContext)(c),o=r=>{e.onChange(r.target.value)};return ce.default.createElement("input",{ref:e.ref,className:`${jt.input} ${e.className||void 0} ${t?.forms?.inputClassName||""}`,value:e.value,onChange:o})};var ue=a(require("react"));var Qt="5a57b63a88f63ec722da0e5c0d277a7164617694d21ee4866c69a82b10dde02a",In=`/* font *//* background *//* borders */
._error_1kpra_4 {
    color: darkred;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Qt)){var e=document.createElement("style");e.id=Qt,e.textContent=In,document.head.appendChild(e)}})();var Jt={colors:'"../../styles/colors.module.css"',colorFontDanger:"darkred",error:"_error_1kpra_4"};var Xt=e=>{let t=(0,ue.useContext)(c);return ue.default.createElement("span",{className:`${Jt.error} ${t?.forms?.errorClassName||""}`},e.text)};var pe=a(require("react"));var Yt="bc0613544d2940d7148d0819a974958ce01f7a90b2fb2f43ada7aacd4018a802",Nn=`/* fonts *//* paddings *//* margins and gaps *//* borders */
._container_192j0_4 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.2rem;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Yt)){var e=document.createElement("style");e.id=Yt,e.textContent=Nn,document.head.appendChild(e)}})();var Zt={distances:'"../../styles/distances.module.css"',marginSmall:"0.2rem",container:"_container_192j0_4"};var eo=e=>{let t=(0,pe.useContext)(c);return pe.default.createElement("div",{className:`${Zt.container} ${t?.forms?.buttonsContainerClassName||""}`},e.children)};var fe=a(require("react"));var to="71e0417c7c6d0d010f033538fb108021baa116ca679334f33f6aab764af3a836",wn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._button_1m31x_6 {
    border-radius: 0.3rem;
    border: none;
    padding: 0.5rem;
}

._button_1m31x_6.primary {
    background-color: darkblue;
    color: white;
}

._button_1m31x_6.secondary {
    background-color: lightgray;
    color: black;
}

._button_1m31x_6.danger {
    background-color: darkred;
    color: white;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(to)){var e=document.createElement("style");e.id=to,e.textContent=wn,document.head.appendChild(e)}})();var oo={colors:'"../../styles/colors.module.css"',distances:'"../../styles/distances.module.css"',colorBackgroundButtonPrimary:"darkblue",colorFontButtonPrimary:"white",colorBackgroundButtonSecondary:"lightgray",colorFontButtonSecondary:"black",colorBackgroundButtonDanger:"darkred",colorFontButtonDanger:"white",paddingMedium:"0.5rem",radiusBorderSmall:"0.3rem",button:"_button_1m31x_6"};var ro=e=>{let t=(0,fe.useContext)(c),o=r=>{r.preventDefault()};return fe.default.createElement("button",{className:`${oo.button} ${t?.forms?.buttonClassName} ${e.type}`,onClick:e.onClick,onMouseDown:o},e.children)};var u=e=>{let t=(0,ge.useContext)(c);return ge.default.createElement("form",{className:`${Vt.container} ${t?.forms?.containerClassName||""}`},e.children)};u.Group=me;u.Label=zt;u.Input=Wt;u.Error=Xt;u.ButtonGroup=eo;u.Button=ro;var no=()=>{let e=(0,p.useContext)(c),t=(0,Ce.useSlate)(),[o,r]=(0,p.useState)(!1),[i,g]=(0,p.useState)(""),B=(0,p.useRef)(null);(0,p.useEffect)(()=>{if(!o)return;B.current?.focus();let k=n.nearestElementOfType(t,"hyperlink");if(!k||!k.href)return g("https://niiice.io");g(k.href)},[o,t]);let S=()=>{r(!1),Ce.ReactEditor.focus(t)},N=()=>{r(!o)},F=()=>{w.onUpsert&&(w.onUpsert(t,{href:i,children:[{text:i}]}),S())},x=(0,p.useMemo)(()=>n.isChildOf(t,"hyperlink"),[t.selection]),C=()=>{w.toggle(t),S()},y=()=>{F()};return p.default.createElement("div",{className:Le.container},p.default.createElement(H,{onClick:N,icon:"hyperlink"}),o&&p.default.createElement(le,{onClose:S,onPressEnter:y,align:"top-right"},p.default.createElement(u,null,p.default.createElement(u.Group,null,p.default.createElement(u.Label,{text:e?.texts?.url||"Url"}),p.default.createElement(u.Input,{ref:B,value:i,onChange:g,className:Le.hrefInput})),p.default.createElement(u.ButtonGroup,null,x&&p.default.createElement(u.Button,{type:"danger",onClick:C},e?.texts?.remove||"Remove"),p.default.createElement(u.Button,{type:"primary",onClick:F},e?.texts?.insert||"Insert")))))};var Ee=require("slate-react"),f=a(require("react"));var so="a4feb8071e6fcc4fea00aee37fce5458a73543e8f00d368b22f806949ff0eeb4",Fn=`._container_lets4_1 {
    flex: 1;
    display: flex;
    flex-direction: column;
}

._srcInput_lets4_7 {
    min-width: 15rem;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(so)){var e=document.createElement("style");e.id=so,e.textContent=Fn,document.head.appendChild(e)}})();var Ue={container:"_container_lets4_1",srcInput:"_srcInput_lets4_7"};var io=e=>{let t=(0,f.useContext)(c),o=(0,Ee.useSlate)(),[r,i]=(0,f.useState)(!1),[g,B]=(0,f.useState)(""),S=(0,f.useRef)(null);(0,f.useEffect)(()=>{if(!r)return;S.current?.focus();let k=n.nearestElementOfType(o,"image");if(!k||!k.src)return B("https://niiice.io/wp-content/uploads/2020/04/niiice-Logo_dark.png");B(k.src)},[r,o]);let N=()=>{i(!1),Ee.ReactEditor.focus(o)},F=()=>{i(!r)},x=()=>{U.onUpsert&&(U.onUpsert(o,{src:g}),N())},C=()=>{x()},y=()=>{e.onUploadRequest&&(N(),e.onUploadRequest("image/*"))};return f.default.createElement("div",{className:Ue.container},f.default.createElement(H,{onClick:F,icon:"image"}),r&&f.default.createElement(le,{onClose:N,onPressEnter:C,align:"top-right"},f.default.createElement(u,null,f.default.createElement(u.Group,null,f.default.createElement(u.Label,{text:t?.texts?.url||"Url"}),f.default.createElement(u.Input,{ref:S,value:g,onChange:B,className:Ue.srcInput})),f.default.createElement(u.ButtonGroup,null,e.onUploadRequest&&f.default.createElement(u.Button,{type:"secondary",onClick:y},t?.texts?.upload||"Upload"),f.default.createElement(u.Button,{type:"primary",onClick:x},t?.texts?.insert||"Insert")))))};var ao=e=>{let t=(0,lo.useSlate)(),o=(0,h.useContext)(c),r=()=>{$.toggleBold(t)},i=()=>{$.toggleItalic(t)},g=y=>{q[`heading-${y}`].toggle(t,{actor:"toolbar"})},B=()=>{re.toggle(t,{actor:"toolbar"})},S=()=>{ne.toggle(t,{actor:"toolbar"})},N=()=>{R.toggle(t,{actor:"toolbar"})},F=()=>{K.toggle(t,{actor:"toolbar"})},x=()=>{e.onUploadRequest&&e.onUploadRequest(void 0,!0)},C={bold:$.isBoldActive(t),italic:$.isItalicActive(t),"heading-1":X.active(t),"heading-2":Y.active(t),"heading-3":Z.active(t),"heading-4":ee.active(t),"heading-5":te.active(t),"heading-6":oe.active(t),"unordered-list":Q.active(t),"ordered-list":J.active(t),blockquote:R.active(t),code:K.active(t),hyperlink:w.active(t)};return h.default.createElement("div",{className:`${He.container} ${o?.toolbar?.containerClassName||""}`},h.default.createElement("div",{className:He.innerContainer},h.default.createElement(H,{icon:"bold",onClick:r,active:C.bold}),h.default.createElement(H,{icon:"italic",onClick:i,active:C.italic}),h.default.createElement(z,null),[1,2,3,4,5,6].map(y=>h.default.createElement(H,{key:y,onClick:()=>g(y),text:`H${y}`,active:C[`heading-${y}`]})),h.default.createElement(z,null),h.default.createElement(H,{icon:"unordered-list",onClick:B,active:C["unordered-list"]}),h.default.createElement(H,{icon:"ordered-list",onClick:S,active:C["ordered-list"]}),h.default.createElement(z,null),h.default.createElement(H,{icon:"blockquote",onClick:N,active:C.blockquote}),h.default.createElement(H,{icon:"code",onClick:F,active:C.code}),h.default.createElement(z,null),h.default.createElement(no,null),h.default.createElement(io,{onUploadRequest:e.onUploadRequest}),e.onUploadRequest&&h.default.createElement(H,{icon:"upload",onClick:x,active:!1})))};var mo="f58b565fb0df64828c2751882448c3189d3740555fea471aeb24a363240abd6e",Ln=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._container_1c0c5_6 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border: grey 1px solid;
    border-radius: 0.6rem;
    max-width: 100%;
}

._editor_1c0c5_16 {
    padding: 0.5rem;
    overflow: scroll;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(mo)){var e=document.createElement("style");e.id=mo,e.textContent=Ln,document.head.appendChild(e)}})();var Ae={colors:'"../../shared/styles/colors.module.css"',distances:'"../../shared/styles/distances.module.css"',colorBorderDark:"grey",sizeBorderSmall:"1px",radiusBorderMedium:"0.6rem",paddingMedium:"0.5rem",container:"_container_1c0c5_6",editor:"_editor_1c0c5_16"};var co="9c453984bc3730ea82fe44317a47c4a2f4b3371e3b4d6e279cb887d9b02e7d8e",Un=`
/* font */
/* background */
/* borders */
/* fonts */
/* paddings */
/* margins and gaps */
/* borders */
/* base container that can be used in markdown editor and view to restyle html elements inside the container */
._container_1d1ld_9 {
    font-family: Arial, serif;
}

._container_1d1ld_9 blockquote {
    margin-left: 1rem;
    padding-left: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-left: 5px solid lightgrey;
}

._container_1d1ld_9 blockquote:before {
    content: "\u201E"
}

._container_1d1ld_9 blockquote:after {
    content: "\u201C"
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(co)){var e=document.createElement("style");e.id=co,e.textContent=Un,document.head.appendChild(e)}})();var uo={fonts:'"../../shared/styles/fonts.module.css"',colors:'"../../shared/styles/colors.module.css"',distances:'"../../shared/styles/distances.module.css"',fontFamilyDefault:"Arial, serif",colorBorderLight:"lightgrey",sizeBorderLarge:"5px",marginLarge:"1rem",paddingMedium:"0.5rem",paddingSmall:"0.2rem",container:"_container_1d1ld_9"};var T=a(require("react"));var po="8ac9a1a49cf047e0c7d4e5dca3b20543a5564ddd97b134dfb4451e692acc12d0",An=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._fileInput_b91nt_6 {
    font-size: large;
}

._progressBar_b91nt_10 {
    background-color: darkblue;
    width: 100%;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(po)){var e=document.createElement("style");e.id=po,e.textContent=An,document.head.appendChild(e)}})();var Me={colors:'"../../../shared/styles/colors.module.css"',distances:'"../../../shared/styles/distances.module.css"',colorBackgroundProgress:"darkblue",sizeFontLarge:"large",fileInput:"_fileInput_b91nt_6",progressBar:"_progressBar_b91nt_10"};var I=a(require("react")),go=require("react-icons/io5");var fo="90106cbeb6c09b24cc9974aefa6357c52e17d383abad3d3b69c9af014e7162bb",Mn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._container_ose23_8 {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(100, 100, 100, 0.5);
    font-family: Arial, serif;
}

._innerContainer_ose23_22 {
    position: relative;
    background-color: white;
    border-radius: 1rem;
    font-size: large;
}

._headerContainer_ose23_29 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid grey;
    padding: 1rem;
}

._header_ose23_29 {
    padding: 0.2rem 0.5rem;
    font-size: x-large;
}

._bodyContainer_ose23_43 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
}

._closeButton_ose23_52 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 0.3rem;
}

._closeButton_ose23_52:hover {
    background-color: #dddddd;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(fo)){var e=document.createElement("style");e.id=fo,e.textContent=Mn,document.head.appendChild(e)}})();var V={colors:'"../../styles/colors.module.css"',distances:'"../../styles/distances.module.css"',fonts:'"../../styles/fonts.module.css"',colorBorderDark:"grey",colorBackgroundToolbarActive:"#dddddd",colorBackgroundOverlay:"rgba(100, 100, 100, 0.5)",colorBackgroundModal:"white",paddingSmall:"0.2rem",paddingMedium:"0.5rem",paddingLarge:"1rem",marginLarge:"1rem",sizeBorderSmall:"1px",radiusBorderLarge:"1rem",radiusBorderSmall:"0.3rem",fontFamilyDefault:"Arial, serif",container:"_container_ose23_8",innerContainer:"_innerContainer_ose23_22",headerContainer:"_headerContainer_ose23_29",header:"_header_ose23_29",bodyContainer:"_bodyContainer_ose23_43",closeButton:"_closeButton_ose23_52"};var Co=require("usehooks-ts");var Eo=e=>{let t=(0,I.useContext)(c),o=(0,I.useRef)(null);return(0,Co.useOnClickOutside)(o,e.onClose),I.default.createElement("div",{className:`${V.container} ${t?.modal?.containerClassName||""}`},I.default.createElement("div",{className:`${V.innerContainer} ${t?.modal?.innerContainerClassName||""}`,ref:o},I.default.createElement("div",{className:`${V.headerContainer} ${t?.modal?.headerContainerClassName||""}`},I.default.createElement("span",{className:V.header},e.title),I.default.createElement("button",{className:V.closeButton,onClick:e.onClose},I.default.createElement(go.IoCloseOutline,{size:"1.5rem"}))),I.default.createElement("div",{className:`${V.bodyContainer} ${t?.modal?.bodyContainerClassName||""}`},e.children)))};var ho=e=>{let t=(0,T.useContext)(c),[o,r]=(0,T.useState)(null),[i,g]=(0,T.useState)(null),B=x=>{r(x.message)},S=x=>{g(x)},N=(x,C,y)=>{e.onUploadFinish(x,C,y)};(0,T.useEffect)(()=>{e.uploader.setOnProgressViewCallback(S),e.uploader.setOnErrorViewCallback(B),e.uploader.setOnFinishViewCallback(N)},[e.uploader]);let F=x=>{r(null);let C=x.currentTarget.files;if(!C)return;let y=Array.from(C);if(e.acceptedFileTypes){for(let k of y)if(!$n(k.type,e.acceptedFileTypes))return r(t?.texts?.invalidFileTypeError||"Invalid file type.")}if(e.maxFileSize){for(let k of y)if(k.size>e.maxFileSize)return r(t?.texts?.maxFileSizeError||"File too large.")}g(0);for(let k of y)e.uploader.startUpload(k).then()};return T.default.createElement(Eo,{title:t?.texts?.uploadModalHeaderTitle||"Upload file",onClose:e.onClose},T.default.createElement(u,null,T.default.createElement(me,null,T.default.createElement("input",{className:Me.fileInput,type:"file",onChange:F,disabled:i!==null}),o&&T.default.createElement(u.Error,{text:o}))),i!==null&&T.default.createElement("progress",{className:Me.progressBar,max:100,value:i*100}))},$n=(e,t)=>(t=t.replace(/\s/g,""),t.split(",").some(r=>{if(r.endsWith("/*")){let i=r.split("/")[0];return e.startsWith(i)}else return r===e}));var $e=a(require("react")),yo=e=>$e.default.createElement("span",{contentEditable:!1,...e.attributes},$e.default.createElement("img",{src:e.element.src,alt:e.element.altText||"Image"}),e.children);var bo=a(require("react")),xo=e=>bo.default.createElement("a",{href:e.element.href,...e.attributes},e.children);var ko=a(require("react"));var vo=e=>ko.default.createElement(c.Provider,{value:e.value},e.children);var _o=a(require("react")),To=e=>_o.default.createElement("li",{...e.attributes},e.children);var Ho=e=>{let[t]=(0,d.useState)(()=>Vn(On((0,A.withReact)((0,Po.createEditor)())))),[o,r]=(0,d.useState)({show:!1}),i=(0,d.useRef)([]),g=(0,d.useCallback)(m=>{switch(m.element.type){case"blockquote":return d.default.createElement(Ke,{...m});case"code":return d.default.createElement(Ve,{...m});case"heading-1":return d.default.createElement(Ge,{...m});case"heading-2":return d.default.createElement(We,{...m});case"heading-3":return d.default.createElement(Je,{...m});case"heading-4":return d.default.createElement(Ye,{...m});case"heading-5":return d.default.createElement(et,{...m});case"heading-6":return d.default.createElement(ot,{...m});case"image":return d.default.createElement(yo,{...m});case"hyperlink":return d.default.createElement(xo,{...m});case"ordered-list-item":return d.default.createElement(To,{...m});case"ordered-list":return d.default.createElement(nt,{...m});case"unordered-list":return d.default.createElement(it,{...m});case"unordered-list-item":return d.default.createElement(at,{...m});default:return d.default.createElement(qe,{...m})}},[]),B=(0,d.useCallback)(m=>d.default.createElement(vt,{...m}),[]),S=m=>{switch(m.key){case"_":case"*":{$.handleBoldAndItalic(t,m);break}case" ":case"Dead":{let E=n.textSinceBlockStart(t);if(!E)break;let P=!1;for(let M of Se)if(E===M.shortcutText||M.shortcutRegex?.test(E)){n.deleteFromLeft(t,E.length),M.toggle(t,{actor:"shortcut",actorShortcut:E}),m.preventDefault(),P=!0;break}if(P||!t.selection)return;for(let M of ie){if(!M.shortcutRegex)continue;let G=E.match(M.shortcutRegex);if(G){n.deleteAt(t,{path:t.selection.anchor.path,offset:E.length-G[0].length},G[0].length),M.toggle(t,{actor:"shortcut",actorShortcutMatch:G}),m.preventDefault();break}}break}case"Tab":{let E=n.currentBlockType(t);if(!E)break;let P=q[E].onTab;if(!P)break;P(t,m);break}case"Enter":{let E=n.currentElementType(t);if(!E)break;let P=q[E].onEnter;if(!P)break;P(t,m);break}}},N=m=>{if(t.operations.some(P=>P.type!=="set_selection")){if(i.current=m,!e.onChange)return;e.onChange(m)}},F=m=>{e.onBlur&&(e.onBlur(m,i.current),m.preventDefault())},x=(m,E)=>{r({show:!0,accept:m,forceAttachment:E})},C=()=>{r({show:!1}),A.ReactEditor.focus(t)},y=(m,E,P)=>{if(E.type.includes("image")&&!o.forceAttachment){if(!U.onUpsert)return;U.onUpsert(t,{src:m,metaData:P})}else{if(!w.onUpsert)return;w.onUpsert(t,{children:[{text:E.name}],href:m,metaData:P})}C()},k=(0,d.useMemo)(()=>e.initialValue&&e.initialValue.length>0?e.initialValue:[{type:"paragraph",children:[{text:e.defaultText!==void 0?e.defaultText:""}]}],[e.initialValue,e.defaultText]);return d.default.createElement(vo,{value:e.customStyle},d.default.createElement(A.Slate,{editor:t,value:k,onChange:N},d.default.createElement("div",{className:`${Ae.container} ${e.customStyle?.editor?.containerClassName||""}`},d.default.createElement(ao,{onUploadRequest:e.uploadInfo?x:void 0}),d.default.createElement(A.Editable,{className:`${Ae.editor} ${uo.container} ${e.customStyle?.editor?.editorContainerClassName||""}`,renderElement:g,renderLeaf:B,onKeyDown:S,onBlur:F})),e.uploadInfo&&o.show&&d.default.createElement(ho,{onUploadFinish:y,onClose:C,...e.uploadInfo,acceptedFileTypes:o.accept||e.uploadInfo.acceptedFileTypes})))},On=e=>{let{isInline:t}=e;return e.isInline=o=>ie.map(i=>i.elementType).includes(o.type)||t(o),e},Vn=e=>{let{isVoid:t}=e;return e.isVoid=o=>Ie.map(i=>i.elementType).includes(o.type)||t(o),e};var ye=a(require("react"));var Bo=(e,t)=>e.filter(o=>o===t).length,So=e=>Array(e*4).join(" "),Dn={blockquote:(e,t)=>`> ${_(e.children,[...t,"blockquote"])}
`,code:(e,t)=>`\`\`\`
${_(e.children,[...t,"code"])}
\`\`\`
`,"heading-1":(e,t)=>`# ${_(e.children,[...t,"heading-1"])}
`,"heading-2":(e,t)=>`## ${_(e.children,[...t,"heading-2"])}
`,"heading-3":(e,t)=>`### ${_(e.children,[...t,"heading-3"])}
`,"heading-4":(e,t)=>`#### ${_(e.children,[...t,"heading-4"])}
`,"heading-5":(e,t)=>`##### ${_(e.children,[...t,"heading-5"])}
`,"heading-6":(e,t)=>`###### ${_(e.children,[...t,"heading-6"])}
`,hyperlink:(e,t)=>`[${_(e.children,[...t,"hyperlink"])}](${e.href||""})`,image:(e,t)=>`![${e.altText||""}](${e.src||""})`,"ordered-list":(e,t)=>_(e.children,[...t,"ordered-list"]),"ordered-list-item":(e,t)=>{let o=Bo(t,"ordered-list"),r=So(o-1);return r=`${r}1. ${_(e.children,[...t,"ordered-list-item"])}
`,r},paragraph:(e,t)=>`
${_(e.children,[...t,"paragraph"])}
`,"unordered-list":(e,t)=>_(e.children,[...t,"unordered-list"]),"unordered-list-item":(e,t)=>{let o=Bo(t,"unordered-list"),r=So(o-1);return r=`${r}* ${_(e.children,[...t,"unordered-list-item"])}
`,r}},qn=e=>{if(!e.text)return"";let t=e.text;return e.bold&&(t=`**${t}**`),e.italic&&(t=`*${t}*`),t},Rn=(e,t)=>{let o=Dn[e.type];return o?o(e,t):""},Kn=(e,t)=>{if(n.isLeaf(e))return qn(e);let o=e;return o.type?Rn(o,t):""},_=(e,t,o="")=>e?e?.map(r=>Kn(r,t)).join(o):"",he=e=>_(e,[]);var wo=a(require("react-markdown")),Fo=a(require("remark-gfm")),Lo=a(require("remark-breaks"));var Io="57f60a3f7526eefa445b0f4b9d275b790c3a46675e0fb9a6dd28374586e3d1e0",zn=`
/* font */
/* background */
/* borders */
/* fonts */
/* paddings */
/* margins and gaps */
/* borders */
/* base container that can be used in markdown editor and view to restyle html elements inside the container */
._container_1d1ld_9 {
    font-family: Arial, serif;
}

._container_1d1ld_9 blockquote {
    margin-left: 1rem;
    padding-left: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-left: 5px solid lightgrey;
}

._container_1d1ld_9 blockquote:before {
    content: "\u201E"
}

._container_1d1ld_9 blockquote:after {
    content: "\u201C"
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(Io)){var e=document.createElement("style");e.id=Io,e.textContent=zn,document.head.appendChild(e)}})();var No={fonts:'"../../shared/styles/fonts.module.css"',colors:'"../../shared/styles/colors.module.css"',distances:'"../../shared/styles/distances.module.css"',fontFamilyDefault:"Arial, serif",colorBorderLight:"lightgrey",sizeBorderLarge:"5px",marginLarge:"1rem",paddingMedium:"0.5rem",paddingSmall:"0.2rem",container:"_container_1d1ld_9"};var Uo=e=>{let t=(0,ye.useMemo)(()=>typeof e.value=="string"?e.value:he(e.value),[e.value]);return ye.default.createElement(wo.default,{className:`${No.container} ${e.className||""}`,remarkPlugins:[Fo.default,Lo.default]},t)};var be=class{onProgress(t){this.onProgressViewCallback&&this.onProgressViewCallback(t)}onFinish(t,o,r={}){this.onFinishViewCallback&&this.onFinishViewCallback(t,o,r)}onError(t){this.onErrorViewCallback&&this.onErrorViewCallback(t)}onProgressViewCallback;setOnProgressViewCallback(t){this.onProgressViewCallback=t}onFinishViewCallback;setOnFinishViewCallback(t){this.onFinishViewCallback=t}onErrorViewCallback;setOnErrorViewCallback(t){this.onErrorViewCallback=t}};
//# sourceMappingURL=index.js.map
