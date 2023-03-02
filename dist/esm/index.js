import d,{useCallback as Qt,useState as Jt,useRef as ms,useMemo as ds}from"react";import{createEditor as cs}from"slate";import{Slate as us,Editable as ps,withReact as fs,ReactEditor as gs}from"slate-react";import ve from"react";var _e=e=>ve.createElement("pre",{...e.attributes},ve.createElement("code",null,e.children));import to from"react";var Te=e=>to.createElement("p",{...e.attributes},e.children);import oo from"react";var Pe=e=>oo.createElement("blockquote",{...e.attributes},e.children);import ro from"react";var He=e=>ro.createElement("h1",{...e.attributes},e.children);import no from"react";var Be=e=>no.createElement("h2",{...e.attributes},e.children);import so from"react";var Se=e=>so.createElement("h3",{...e.attributes},e.children);import io from"react";var Ie=e=>io.createElement("h4",{...e.attributes},e.children);import lo from"react";var Ne=e=>lo.createElement("h5",{...e.attributes},e.children);import ao from"react";var we=e=>ao.createElement("h6",{...e.attributes},e.children);import mo from"react";var Fe=e=>mo.createElement("ol",{...e.attributes},e.children);import co from"react";var Le=e=>co.createElement("ul",{...e.attributes},e.children);import uo from"react";var Ue=e=>uo.createElement("li",{...e.attributes},e.children);import{Editor as E,Node as K,Point as po,Transforms as g,Text as fo}from"slate";var Ae=(e,t,o)=>{g.setNodes(e,{...o,type:t})},go=e=>{let t=se(e);t&&g.unwrapNodes(e,{at:t})},se=e=>e.selection?e.selection.anchor.path.slice(0,-1):null,Me=e=>{let t=e.selection?.anchor.path;return t?(t=t.slice(0,-1),K.get(e,t)):null},Co=e=>{if(!e.selection)return null;let t=Me(e);return t?t.type:null},Eo=(e,t)=>{let o=e.selection?.anchor.path;if(!o)return null;do{let r=K.get(e,o);if(!r)return null;if(r.type===t)return r;o=o?.slice(0,-1)}while(o.length>0);return null},$e=e=>{g.splitNodes(e,{always:!0})},ho=(e,t,o={})=>{if(g.insertNodes(e,{...o.props,type:t,children:o.children||[{text:""}]},{voids:o.voids}),o.createFollowingParagraph&&g.insertNodes(e,{type:"paragraph",children:[{text:""}]}),o.createFollowingText!==void 0){if(!e.selection)return;let r=E.parent(e,e.selection)[1];r[r.length-1]++,g.insertNodes(e,{text:o.createFollowingText},{at:r}),g.select(e,{anchor:{path:r,offset:o.createFollowingText.length},focus:{path:r,offset:o.createFollowingText.length}})}},yo=(e,t,o={})=>{g.wrapNodes(e,{type:t,...o},{split:!0})},bo=e=>{g.liftNodes(e)},xo=e=>{g.unwrapNodes(e)},ie=e=>e.selection?po.equals(e.selection.anchor,e.selection.focus):!1,Oe=e=>e.selection?!ie(e):!1,le=e=>{let t=E.above(e,{match:r=>E.isBlock(e,r)}),o=t?t[1]:[];return E.start(e,o)},Ve=e=>{let t=E.above(e,{match:r=>E.isBlock(e,r)}),o=t?t[1]:[];return E.end(e,o)},De=e=>{if(!e.selection)return null;let t=le(e),o={anchor:e.selection.anchor,focus:t};return E.string(e,o)},ko=e=>{if(!e.selection)return null;let t=Ve(e),o={anchor:e.selection.focus,focus:t};return E.string(e,o)},vo=(e,t,o)=>{if(!e.selection)return null;let r=ae(e);if(!r)return null;let i=r.lastIndexOf(t);return o?.isolated&&(r.substring(i+t.length,i+t.length*2)===t||r.substring(i-t.length,i)===t)||i===-1?null:{path:e.selection.anchor.path,offset:i}},_o=(e,t)=>!e.selection||!ie(e)?!1:!!De(e)?.endsWith(t),ae=e=>e.selection?E.string(e,{anchor:{path:e.selection.anchor.path,offset:0},focus:e.selection.anchor}):null,qe=(e,t)=>{if(!e.selection)return;let o=le(e);o&&(g.delete(e,{at:{anchor:o,focus:e.selection.anchor}}),g.insertText(e,t,{at:o}))},To=(e,t)=>{let o=ae(e);o&&(o=o.slice(t),qe(e,o))},Po=(e,t)=>{for(let o=0;o<t;o++)E.deleteBackward(e,{unit:"character"})},Ho=(e,t,o)=>{g.delete(e,{at:t,distance:o,unit:"character"})},Re=(e,t)=>e.selection?E.above(e,{match:o=>t.includes(o.type)})!==void 0:!1,Bo=(e,t)=>e.selection?Re(e,[t]):!1,Ke=e=>{if(!e.selection)return null;let t=E.above(e,{match:o=>E.isBlock(e,o)});return!t||!je(t[0])?null:t[0]},So=e=>{if(!e.selection)return null;let t=se(e);return t?me(e,t):null},me=(e,t)=>{let o=t;if(o.length===0)return null;do{let r=K.get(e,o);if(!r)return null;if(E.isBlock(e,r))return o;o=o.slice(0,-1)}while(o.length>0);return null},Io=e=>{if(!e.selection)return null;let t=Ke(e);return t?t.type:null},ze=e=>{if(!e.selection)return null;let t=So(e);return!t||(t=t.slice(0,-1),t=me(e,t),!t)?null:K.get(e,t)},No=e=>{let t=ze(e);return t?t.type:null},Ge=e=>{if(!e.selection)return null;let t=E.node(e,e.selection.anchor);return!t||!We(t[0])?null:t[0]},je=e=>{let t=e;return!!(t&&t.type)},We=e=>{let t=e;return!!(t&&t.text)},wo=e=>{let t=e.selection?.anchor||e.selection?.focus;return t?t.path.length<=2:!1},Fo=e=>{let t=e,o=e;return!t.text&&!o.type},Lo=e=>{if(Oe(e)||!e.selection)return!1;let t=Ge(e);return t?t.text==="":!0},Uo=e=>{e.selection&&($e(e),Ae(e,"paragraph"),Qe(e))},Ao=e=>{g.insertText(e,`
`)},Qe=e=>{for(;!n.isAtRoot(e);)g.liftNodes(e)},Mo=(e,t,o)=>{e.selection&&g.setNodes(e,t,{at:o||e.selection,match:r=>fo.isText(r),split:!0})},$o=(e,t,o)=>{g.setNodes(e,o,{match:r=>r.type===t})},n={removeInlineNode:go,changeCurrentNodeType:Ae,createNewNode:ho,createNewNodeOfCurrentType:$e,wrapNode:yo,unwrapNode:bo,unwrapLeaf:xo,isCursor:ie,isSelection:Oe,nearestBlockPath:me,currentBlockStart:le,currentBlockEnd:Ve,textSinceBlockStart:De,textToBlockEnd:ko,lastPosOf:vo,cursorIsBehind:_o,currentBlockText:ae,setCurrentBlockText:qe,deleteFromLeft:To,deleteFromRight:Po,deleteAt:Ho,isChildOf:Bo,isChildOfAny:Re,nearestElementOfType:Eo,currentBlock:Ke,currentBlockType:Io,currentElement:Me,currentElementType:Co,currentElementPath:se,parentBlock:ze,parentBlockType:No,currentLeaf:Ge,isElement:je,isLeaf:We,isRoot:Fo,isEmpty:Lo,isAtRoot:wo,createRootParagraph:Uo,createNewline:Ao,liftToRoot:Qe,setLeafFormat:Mo,changeNearestNodeProps:$o};import de from"react";var Je=e=>{let t=de.createElement("span",{...e.attributes},e.children);return e.leaf.bold&&(t=de.createElement("strong",null,t)),e.leaf.italic&&(t=de.createElement("em",null,t)),t};import{Editor as N}from"slate";var Xe=e=>!!N.marks(e)?.bold,Ye=e=>!!N.marks(e)?.italic,Ze=(e,t)=>{e.selection&&n.setLeafFormat(e,{bold:!0},t)},Oo=e=>{n.setLeafFormat(e,{bold:void 0})},et=(e,t)=>{e.selection&&n.setLeafFormat(e,{italic:!0},t)},Vo=e=>{n.setLeafFormat(e,{italic:void 0})},Do=e=>{Xe(e)?N.removeMark(e,"bold"):N.addMark(e,"bold",!0)},qo=e=>{Ye(e)?N.removeMark(e,"italic"):N.addMark(e,"italic",!0)},Ro=(e,t)=>{if(["_","*"].includes(t.key))if(n.cursorIsBehind(e,t.key)){let o=n.lastPosOf(e,`${t.key}${t.key}`);if(!o||!e.selection)return;Ze(e,{anchor:o,focus:e.selection.anchor}),N.addMark(e,"bold",!1),n.deleteAt(e,o,2),n.deleteFromRight(e,1),n.deleteAt(e,e.selection.anchor,1),t.preventDefault()}else{let o=n.lastPosOf(e,t.key,{isolated:!0});if(!o||!e.selection)return;et(e,{anchor:o,focus:e.selection.anchor}),N.addMark(e,"italic",!1),n.deleteAt(e,o,1),t.preventDefault()}},L={isBoldActive:Xe,isItalicActive:Ye,toggleBold:Do,toggleItalic:qo,setBold:Ze,setItalic:et,unsetBold:Oo,unsetItalic:Vo,handleBoldAndItalic:Ro};import h,{useContext as jn}from"react";var tt="9e446ce2706bf177e17a53a7d0b98c052265eb10f4862ab6fd03a6c3a21e3e8c",Ko=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(tt)){var e=document.createElement("style");e.id=tt,e.textContent=Ko,document.head.appendChild(e)}})();var ce={colors:'"../../../shared/styles/colors.module.css"',colorBorderDark:"grey",colorBackgroundToolbar:"#f7f7f7",distances:'"../../../shared/styles/distances.module.css"',sizeBorderSmall:"1px",radiusBorderMedium:"0.6rem",container:"_container_13d6j_6",innerContainer:"_innerContainer_13d6j_17"};import B,{useMemo as jo,useContext as Wo}from"react";var ot="f81f926289b658c4622c98931d22c8d2e11353bdbd86dc1f41cada9539e27a39",zo=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

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
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(ot)){var e=document.createElement("style");e.id=ot,e.textContent=zo,document.head.appendChild(e)}})();var rt={colors:'"../../../shared/styles/colors.module.css"',colorBackgroundToolbarActive:"#dddddd",distances:'"../../../shared/styles/distances.module.css"',marginSmall:"0.2rem",paddingMedium:"0.5rem",radiusBorderSmall:"0.3rem",button:"_button_1qxs1_6"};import{FaBold as Qo,FaItalic as Jo,FaListOl as Xo,FaList as Yo,FaQuoteLeft as Zo,FaCode as er,FaUpload as tr,FaLink as or,FaImage as rr}from"react-icons/fa";import{createContext as Go}from"react";var a=Go(void 0);var k=e=>{let t=Wo(a),o=jo(()=>{switch(e.icon){case"bold":return B.createElement(Qo,null);case"italic":return B.createElement(Jo,null);case"ordered-list":return B.createElement(Xo,null);case"unordered-list":return B.createElement(Yo,null);case"blockquote":return B.createElement(Zo,null);case"code":return B.createElement(er,null);case"upload":return B.createElement(tr,null);case"hyperlink":return B.createElement(or,null);case"image":return B.createElement(rr,null)}},[e.icon]);return B.createElement("button",{onMouseDown:i=>{i.preventDefault()},className:`${rt.button} ${t?.toolbar?.buttonClassName||""} ${e.active?"active":""}`,onClick:e.onClick},o||e.text)};import{Editor as nr}from"slate";var M=(e,t)=>{let[o]=nr.nodes(e,{match:r=>r.type===t});return!!o},sr=(e,t)=>{M(e,t)?n.changeCurrentNodeType(e,"paragraph"):n.changeCurrentNodeType(e,t)},ir=(e,t)=>{if(!M(e,t))return n.liftToRoot(e),n.changeCurrentNodeType(e,t);n.changeCurrentNodeType(e,"paragraph")},lr=(e,t,o,r)=>{if(M(e,t))n.removeInlineNode(e);else{let c=r&&n.isCursor(e)?{...o,children:r}:o;n.changeCurrentNodeType(e,t,c)}},ar=(e,t)=>{let o=M(e,t),r=n.isChildOf(e,"ordered-list-item"),i=n.isChildOf(e,"unordered-list-item"),c=r||i;if(o&&c)return n.unwrapLeaf(e);if(o&&!c)return n.changeCurrentNodeType(e,"paragraph");n.changeCurrentNodeType(e,t),c&&n.wrapNode(e,r?"ordered-list-item":"unordered-list-item")},ue=(e,t)=>{t.shiftKey?n.createNewline(e):n.createRootParagraph(e),t.preventDefault()},mr=(e,t)=>{let o=n.isChildOf(e,"ordered-list-item"),r=n.isChildOf(e,"unordered-list-item"),i=o||r;if(!i||t.shiftKey)return ue(e,t);if(i)return n.createNewNodeOfCurrentType(e),n.changeCurrentNodeType(e,o?"ordered-list-item":"unordered-list-item"),t.preventDefault();ue(e,t)},nt=(e,t)=>{do n.unwrapNode(e);while(n.parentBlockType(e)===t);n.changeCurrentNodeType(e,"paragraph")},dr=(e,t,o)=>{let r=t==="ordered-list"?"ordered-list-item":"unordered-list-item";if(M(e,r))return nt(e,t);n.isChildOf(e,t)||n.wrapNode(e,t),n.changeCurrentNodeType(e,r)},cr=(e,t,o)=>{if(o.shiftKey){n.unwrapNode(e);let r=n.parentBlock(e);(!r||r.type!==t)&&n.changeCurrentNodeType(e,"paragraph")}else{let r=n.parentBlock(e);if(!n.currentBlock(e)||!r)return;n.wrapNode(e,t)}o.preventDefault()},ur=(e,t,o)=>{n.textSinceBlockStart(e)===""&&(nt(e,t),o.preventDefault())},s={defaultIsActive:M,defaultToggle:sr,toggleInlineNode:lr,toggleAtRoot:ir,toggleWithListAllowed:ar,onEnterWithShiftLinebreak:ue,onEnterWithListAndNewlineAllowed:mr,toggleListItem:dr,onTabListItem:cr,onEnterListItem:ur};var pr=e=>s.defaultIsActive(e,"unordered-list"),fr=e=>{s.defaultToggle(e,"unordered-list")},z={elementType:"unordered-list",isVoid:!1,isInline:!1,active:pr,toggle:fr};var gr=e=>s.defaultIsActive(e,"ordered-list"),Cr=e=>{s.defaultToggle(e,"ordered-list")},G={elementType:"ordered-list",isVoid:!1,isInline:!1,active:gr,toggle:Cr};var Er=e=>s.defaultIsActive(e,"blockquote"),hr=e=>{s.toggleWithListAllowed(e,"blockquote")},yr=(e,t)=>{s.onEnterWithListAndNewlineAllowed(e,t)},V={elementType:"blockquote",shortcutText:">",isVoid:!1,isInline:!1,active:Er,toggle:hr,onEnter:yr};var br=e=>s.defaultIsActive(e,"code"),xr=e=>{s.toggleWithListAllowed(e,"code")},kr=(e,t)=>{s.onEnterWithListAndNewlineAllowed(e,t)},D={elementType:"code",shortcutText:"```",isVoid:!1,isInline:!1,active:br,toggle:xr,onEnter:kr};var vr=e=>s.defaultIsActive(e,"heading-1"),_r=e=>{s.toggleAtRoot(e,"heading-1")},Tr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},j={elementType:"heading-1",shortcutText:"#",isVoid:!1,isInline:!1,active:vr,toggle:_r,onEnter:Tr};var Pr=e=>s.defaultIsActive(e,"heading-2"),Hr=e=>{s.toggleAtRoot(e,"heading-2")},Br=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},W={elementType:"heading-2",shortcutText:"##",isVoid:!1,isInline:!1,active:Pr,toggle:Hr,onEnter:Br};var Sr=e=>s.defaultIsActive(e,"heading-3"),Ir=e=>{s.toggleAtRoot(e,"heading-3")},Nr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},Q={elementType:"heading-3",shortcutText:"###",isVoid:!1,isInline:!1,active:Sr,toggle:Ir,onEnter:Nr};var wr=e=>s.defaultIsActive(e,"heading-4"),Fr=e=>{s.toggleAtRoot(e,"heading-4")},Lr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},J={elementType:"heading-4",shortcutText:"####",isVoid:!1,isInline:!1,active:wr,toggle:Fr,onEnter:Lr};var Ur=e=>s.defaultIsActive(e,"heading-5"),Ar=e=>{s.toggleAtRoot(e,"heading-5")},Mr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},X={elementType:"heading-5",shortcutText:"#####",isVoid:!1,isInline:!1,active:Ur,toggle:Ar,onEnter:Mr};var $r=e=>s.defaultIsActive(e,"heading-6"),Or=e=>{s.toggleAtRoot(e,"heading-6")},Vr=(e,t)=>{n.createRootParagraph(e),t.preventDefault()},Y={elementType:"heading-6",shortcutText:"######",isVoid:!1,isInline:!1,active:$r,toggle:Or,onEnter:Vr};var Dr=e=>s.defaultIsActive(e,"unordered-list-item"),qr=(e,t)=>{s.toggleListItem(e,"unordered-list",t)},Rr=(e,t)=>{s.onTabListItem(e,"unordered-list",t)},Kr=(e,t)=>{s.onEnterListItem(e,"unordered-list",t)},Z={elementType:"unordered-list-item",shortcutText:"*",isVoid:!1,isInline:!1,active:Dr,toggle:qr,onTab:Rr,onEnter:Kr};var zr=e=>s.defaultIsActive(e,"paragraph"),Gr=e=>{n.changeCurrentNodeType(e,"paragraph")},jr=(e,t)=>{s.onEnterWithShiftLinebreak(e,t)},st={elementType:"paragraph",isVoid:!1,isInline:!1,active:zr,toggle:Gr,onEnter:jr};var Wr=e=>s.defaultIsActive(e,"hyperlink"),Qr=(e,t,o)=>{if(t?.actor=="shortcut"&&t.actorShortcutMatch){if(t.actorShortcutMatch.length<3)return;let r=t.actorShortcutMatch[1],i=t.actorShortcutMatch[2];n.createNewNode(e,"hyperlink",{children:[{text:r}],props:{href:i},createFollowingText:" "})}else s.toggleInlineNode(e,"hyperlink",o,[{text:"Link"}])},Jr=(e,t)=>{if(!n.isChildOf(e,"hyperlink"))return n.isSelection(e)?n.wrapNode(e,"hyperlink",t):n.createNewNode(e,"hyperlink",{children:t.children,props:t,voids:!0,createFollowingText:" "});n.changeNearestNodeProps(e,"hyperlink",t)},P={elementType:"hyperlink",shortcutRegex:/\[(.+)]\((.+)\)$/,isVoid:!1,isInline:!0,active:Wr,toggle:Qr,onUpsert:Jr};var Xr=e=>s.defaultIsActive(e,"image"),Yr=(e,t,o)=>{if(t?.actor=="shortcut"&&t.actorShortcutMatch){if(t.actorShortcutMatch.length<3)return;let r=t.actorShortcutMatch[1],i=t.actorShortcutMatch[2];n.createNewNode(e,"image",{props:{src:i,altText:r},createFollowingText:" "})}else s.toggleInlineNode(e,"image",o)},Zr=(e,t)=>{let o=n.currentElement(e);o&&(o.type==="image"?n.changeNearestNodeProps(e,"image",t):n.createNewNode(e,"image",{props:t,voids:!0,createFollowingText:" "}))},w={elementType:"image",shortcutRegex:/!\[(.+)]\((.+)\)$/,isVoid:!0,isInline:!0,active:Xr,toggle:Yr,onUpsert:Zr};var en=e=>s.defaultIsActive(e,"ordered-list-item"),tn=(e,t)=>{s.toggleListItem(e,"ordered-list",t)},on=(e,t)=>{s.onTabListItem(e,"ordered-list",t)},rn=(e,t)=>{s.onEnterListItem(e,"ordered-list",t)},ee={elementType:"ordered-list-item",shortcutRegex:/^\d+\.$/,isVoid:!1,isInline:!1,active:en,toggle:tn,onTab:on,onEnter:rn};var te=[V,D,j,W,Q,J,X,Y,w,P,G,ee,st,z,Z],$={};te.forEach(e=>{$[e.elementType]=e});var pe=te.filter(e=>!e.isInline),nn={};pe.forEach(e=>{nn[e.elementType]=e});var oe=te.filter(e=>e.isInline),sn={};oe.forEach(e=>{sn[e.elementType]=e});var fe=te.filter(e=>e.isVoid),ln={};fe.forEach(e=>{ln[e.elementType]=e});import lt from"react";var it="6ef17add9cd35361ec4cfcbedda8614c5326d1a6fe7b684eb90ce0737149ce54",an=`/* fonts *//* paddings *//* margins and gaps *//* borders */

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
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(it)){var e=document.createElement("style");e.id=it,e.textContent=an,document.head.appendChild(e)}})();var ge={distances:'"../../../shared/styles/distances.module.css"',marginSmall:"0.2rem",marginMedium:"0.5rem",sizeBorderSmall:"1px",container:"_container_1d8t7_4",spacer:"_spacer_1d8t7_12"};var q=()=>lt.createElement("div",{className:ge.container},lt.createElement("div",{className:ge.spacer}));import{useSlate as Wn}from"slate-react";import S,{useContext as Un,useEffect as An,useMemo as Mn,useRef as $n,useState as It}from"react";import mt,{useRef as dn,useContext as cn}from"react";var at="e06193bb08368cf9b670a6c1ae61d59ceebb6dcae9b4837d833a31065e1ee2c9",mn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(at)){var e=document.createElement("style");e.id=at,e.textContent=mn,document.head.appendChild(e)}})();var Ce={colors:'"../../styles/colors.module.css"',distances:'"../../styles/distances.module.css"',colorBorderLight:"lightgrey",colorBackgroundModal:"white",sizeBorderSmall:"1px",radiusBorderMedium:"0.6rem",paddingMedium:"0.5rem",container:"_container_kr2au_6",innerContainer:"_innerContainer_kr2au_12"};import{useOnClickOutside as un}from"usehooks-ts";var re=e=>{let t=cn(a),o=dn(null);un(o,e.onClose);let r=i=>{e.onPressEnter&&i.key==="Enter"&&e.onPressEnter()};return mt.createElement("div",{className:`${Ce.container} ${t?.popover?.containerClassName||""}`},mt.createElement("div",{className:`${Ce.innerContainer} ${e.align} ${t?.popover?.innerContainerClassName||""}`,ref:o,onKeyDown:r},e.children))};var dt="3b40b57da3a63bbe88792bcd29aa49a0d40059f3102438a589ca7831c00db4d8",pn=`._container_1kagm_1 {
    flex: 1;
    display: flex;
    flex-direction: column;
}

._hrefInput_1kagm_7 {
    min-width: 15rem;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(dt)){var e=document.createElement("style");e.id=dt,e.textContent=pn,document.head.appendChild(e)}})();var Ee={container:"_container_1kagm_1",hrefInput:"_hrefInput_1kagm_7"};import{ReactEditor as On,useSlate as Vn}from"slate-react";import Fn,{useContext as Ln}from"react";var ct="0d530e367273eaea02159029483adb1621c58242b1d40af0727bce47a5307a7b",fn=`/* fonts *//* paddings *//* margins and gaps *//* borders */
._container_nct2d_4 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ct)){var e=document.createElement("style");e.id=ct,e.textContent=fn,document.head.appendChild(e)}})();var ut={distances:'"../../styles/distances.module.css"',marginLarge:"1rem",container:"_container_nct2d_4"};import Cn,{useContext as En}from"react";var pt="0f2abb9a88b427c6e6d5fb9fa10d2a26503859fecb21ba85ddd9e7225a16dbb7",gn=`/* fonts *//* paddings *//* margins and gaps *//* borders */
._container_1kqth_4 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.2rem;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(pt)){var e=document.createElement("style");e.id=pt,e.textContent=gn,document.head.appendChild(e)}})();var ft={distances:'"../../styles/distances.module.css"',marginSmall:"0.2rem",container:"_container_1kqth_4"};var ne=e=>{let t=En(a);return Cn.createElement("div",{className:`${ft.container} ${t?.forms?.groupClassName||""}`},e.children)};import yn,{useContext as bn}from"react";var gt="1c1dbcd2c42d02299f831d49628ce9d3f5ec491ec0bcded7747b8749611ea0c7",hn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */
._label_1escg_6 {
    font-size: small;
    color: dimgray
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(gt)){var e=document.createElement("style");e.id=gt,e.textContent=hn,document.head.appendChild(e)}})();var Ct={colors:'"../../styles/colors.module.css"',colorFontSecondary:"dimgray",distances:'"../../styles/distances.module.css"',sizeFontSmall:"small",label:"_label_1escg_6"};var Et=e=>{let t=bn(a);return yn.createElement("label",{className:`${Ct.label} ${t?.forms?.labelClassName}`},e.text)};import kn,{useContext as vn}from"react";var ht="48ea307509f3a61e78826de5c891a87239295e1786a4328d73b9a16269544f45",xn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */
._input_kerls_6 {
    padding: 0.5rem;
    font-size: default;
    border-radius: 0.3rem;
    border: 1px solid lightgrey;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ht)){var e=document.createElement("style");e.id=ht,e.textContent=xn,document.head.appendChild(e)}})();var yt={colors:'"../../styles/colors.module.css"',colorBorderLight:"lightgrey",distances:'"../../styles/distances.module.css"',paddingMedium:"0.5rem",radiusBorderSmall:"0.3rem",sizeFontMedium:"default",sizeBorderSmall:"1px",input:"_input_kerls_6"};var bt=e=>{let t=vn(a),o=r=>{e.onChange(r.target.value)};return kn.createElement("input",{ref:e.ref,className:`${yt.input} ${e.className||void 0} ${t?.forms?.inputClassName||""}`,value:e.value,onChange:o})};import Tn,{useContext as Pn}from"react";var xt="6f394a277c167d830f66052578f6e65cada814bcd5536b091842c09d92584d52",_n=`/* font *//* background *//* borders */
._error_1kpra_4 {
    color: darkred;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(xt)){var e=document.createElement("style");e.id=xt,e.textContent=_n,document.head.appendChild(e)}})();var kt={colors:'"../../styles/colors.module.css"',colorFontDanger:"darkred",error:"_error_1kpra_4"};var vt=e=>{let t=Pn(a);return Tn.createElement("span",{className:`${kt.error} ${t?.forms?.errorClassName||""}`},e.text)};import Bn,{useContext as Sn}from"react";var _t="b5e63a31f778c86eb405a861d024ee907010ce936002ede914d3c512a468b771",Hn=`/* fonts *//* paddings *//* margins and gaps *//* borders */
._container_192j0_4 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.2rem;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(_t)){var e=document.createElement("style");e.id=_t,e.textContent=Hn,document.head.appendChild(e)}})();var Tt={distances:'"../../styles/distances.module.css"',marginSmall:"0.2rem",container:"_container_192j0_4"};var Pt=e=>{let t=Sn(a);return Bn.createElement("div",{className:`${Tt.container} ${t?.forms?.buttonsContainerClassName||""}`},e.children)};import Nn,{useContext as wn}from"react";var Ht="66d73942273a9d2955911495cc45f79a1ba831ce9c8f2b953e5019ea50e62249",In=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

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
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ht)){var e=document.createElement("style");e.id=Ht,e.textContent=In,document.head.appendChild(e)}})();var Bt={colors:'"../../styles/colors.module.css"',distances:'"../../styles/distances.module.css"',colorBackgroundButtonPrimary:"darkblue",colorFontButtonPrimary:"white",colorBackgroundButtonSecondary:"lightgray",colorFontButtonSecondary:"black",colorBackgroundButtonDanger:"darkred",colorFontButtonDanger:"white",paddingMedium:"0.5rem",radiusBorderSmall:"0.3rem",button:"_button_1m31x_6"};var St=e=>{let t=wn(a),o=r=>{r.preventDefault()};return Nn.createElement("button",{className:`${Bt.button} ${t?.forms?.buttonClassName} ${e.type}`,onClick:e.onClick,onMouseDown:o},e.children)};var m=e=>{let t=Ln(a);return Fn.createElement("form",{className:`${ut.container} ${t?.forms?.containerClassName||""}`},e.children)};m.Group=ne;m.Label=Et;m.Input=bt;m.Error=vt;m.ButtonGroup=Pt;m.Button=St;var Nt=()=>{let e=Un(a),t=Vn(),[o,r]=It(!1),[i,c]=It(""),v=$n(null);An(()=>{if(!o)return;v.current?.focus();let y=n.nearestElementOfType(t,"hyperlink");if(!y||!y.href)return c("https://niiice.io");c(y.href)},[o,t]);let _=()=>{r(!1),On.focus(t)},T=()=>{r(!o)},H=()=>{P.onUpsert&&(P.onUpsert(t,{href:i,children:[{text:i}]}),_())},C=Mn(()=>n.isChildOf(t,"hyperlink"),[t.selection]),u=()=>{P.toggle(t),_()},f=()=>{H()};return S.createElement("div",{className:Ee.container},S.createElement(k,{onClick:T,icon:"hyperlink"}),o&&S.createElement(re,{onClose:_,onPressEnter:f,align:"top-right"},S.createElement(m,null,S.createElement(m.Group,null,S.createElement(m.Label,{text:e?.texts?.url||"Url"}),S.createElement(m.Input,{ref:v,value:i,onChange:c,className:Ee.hrefInput})),S.createElement(m.ButtonGroup,null,C&&S.createElement(m.Button,{type:"danger",onClick:u},e?.texts?.remove||"Remove"),S.createElement(m.Button,{type:"primary",onClick:H},e?.texts?.insert||"Insert")))))};import{ReactEditor as qn,useSlate as Rn}from"slate-react";import I,{useContext as Kn,useEffect as zn,useRef as Gn,useState as Ft}from"react";var wt="c43abf9293af6e2425a9107c96048513800d3a4f9d70cc6080ea66ff9fa20c64",Dn=`._container_lets4_1 {
    flex: 1;
    display: flex;
    flex-direction: column;
}

._srcInput_lets4_7 {
    min-width: 15rem;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(wt)){var e=document.createElement("style");e.id=wt,e.textContent=Dn,document.head.appendChild(e)}})();var he={container:"_container_lets4_1",srcInput:"_srcInput_lets4_7"};var Lt=e=>{let t=Kn(a),o=Rn(),[r,i]=Ft(!1),[c,v]=Ft(""),_=Gn(null);zn(()=>{if(!r)return;_.current?.focus();let y=n.nearestElementOfType(o,"image");if(!y||!y.src)return v("https://niiice.io/wp-content/uploads/2020/04/niiice-Logo_dark.png");v(y.src)},[r,o]);let T=()=>{i(!1),qn.focus(o)},H=()=>{i(!r)},C=()=>{w.onUpsert&&(w.onUpsert(o,{src:c}),T())},u=()=>{C()},f=()=>{e.onUploadRequest&&(T(),e.onUploadRequest("image/*"))};return I.createElement("div",{className:he.container},I.createElement(k,{onClick:H,icon:"image"}),r&&I.createElement(re,{onClose:T,onPressEnter:u,align:"top-right"},I.createElement(m,null,I.createElement(m.Group,null,I.createElement(m.Label,{text:t?.texts?.url||"Url"}),I.createElement(m.Input,{ref:_,value:c,onChange:v,className:he.srcInput})),I.createElement(m.ButtonGroup,null,e.onUploadRequest&&I.createElement(m.Button,{type:"secondary",onClick:f},t?.texts?.upload||"Upload"),I.createElement(m.Button,{type:"primary",onClick:C},t?.texts?.insert||"Insert")))))};var Ut=e=>{let t=Wn(),o=jn(a),r=()=>{L.toggleBold(t)},i=()=>{L.toggleItalic(t)},c=f=>{$[`heading-${f}`].toggle(t,{actor:"toolbar"})},v=()=>{Z.toggle(t,{actor:"toolbar"})},_=()=>{ee.toggle(t,{actor:"toolbar"})},T=()=>{V.toggle(t,{actor:"toolbar"})},H=()=>{D.toggle(t,{actor:"toolbar"})},C=()=>{e.onUploadRequest&&e.onUploadRequest(void 0,!0)},u={bold:L.isBoldActive(t),italic:L.isItalicActive(t),"heading-1":j.active(t),"heading-2":W.active(t),"heading-3":Q.active(t),"heading-4":J.active(t),"heading-5":X.active(t),"heading-6":Y.active(t),"unordered-list":z.active(t),"ordered-list":G.active(t),blockquote:V.active(t),code:D.active(t),hyperlink:P.active(t)};return h.createElement("div",{className:`${ce.container} ${o?.toolbar?.containerClassName||""}`},h.createElement("div",{className:ce.innerContainer},h.createElement(k,{icon:"bold",onClick:r,active:u.bold}),h.createElement(k,{icon:"italic",onClick:i,active:u.italic}),h.createElement(q,null),[1,2,3,4,5,6].map(f=>h.createElement(k,{key:f,onClick:()=>c(f),text:`H${f}`,active:u[`heading-${f}`]})),h.createElement(q,null),h.createElement(k,{icon:"unordered-list",onClick:v,active:u["unordered-list"]}),h.createElement(k,{icon:"ordered-list",onClick:_,active:u["ordered-list"]}),h.createElement(q,null),h.createElement(k,{icon:"blockquote",onClick:T,active:u.blockquote}),h.createElement(k,{icon:"code",onClick:H,active:u.code}),h.createElement(q,null),h.createElement(Nt,null),h.createElement(Lt,{onUploadRequest:e.onUploadRequest}),e.onUploadRequest&&h.createElement(k,{icon:"upload",onClick:C,active:!1})))};var At="be3385764f803aed5b82c967a07b82840fd87ab30a0e231580f1850553ee2747",Qn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

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
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(At)){var e=document.createElement("style");e.id=At,e.textContent=Qn,document.head.appendChild(e)}})();var ye={colors:'"../../shared/styles/colors.module.css"',distances:'"../../shared/styles/distances.module.css"',colorBorderDark:"grey",sizeBorderSmall:"1px",radiusBorderMedium:"0.6rem",paddingMedium:"0.5rem",container:"_container_1c0c5_6",editor:"_editor_1c0c5_16"};var Mt="2ca14af94c2a17bef870bc56e039ce593cbb57d49a735ebba85f053fb1c7b0ff",Jn=`
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
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(Mt)){var e=document.createElement("style");e.id=Mt,e.textContent=Jn,document.head.appendChild(e)}})();var $t={fonts:'"../../shared/styles/fonts.module.css"',colors:'"../../shared/styles/colors.module.css"',distances:'"../../shared/styles/distances.module.css"',fontFamilyDefault:"Arial, serif",colorBorderLight:"lightgrey",sizeBorderLarge:"5px",marginLarge:"1rem",paddingMedium:"0.5rem",paddingSmall:"0.2rem",container:"_container_1d1ld_9"};import O,{useContext as rs,useEffect as ns,useState as qt}from"react";var Ot="2d24c328d96cb040703b07713d6aaa6463da3f54b88122c8024c8a8674df8690",Xn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

._fileInput_b91nt_6 {
    font-size: large;
}

._progressBar_b91nt_10 {
    background-color: darkblue;
    width: 100%;
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ot)){var e=document.createElement("style");e.id=Ot,e.textContent=Xn,document.head.appendChild(e)}})();var be={colors:'"../../../shared/styles/colors.module.css"',distances:'"../../../shared/styles/distances.module.css"',colorBackgroundProgress:"darkblue",sizeFontLarge:"large",fileInput:"_fileInput_b91nt_6",progressBar:"_progressBar_b91nt_10"};import A,{useContext as Zn,useRef as es}from"react";import{IoCloseOutline as ts}from"react-icons/io5";var Vt="223f694f481d8288df46626be6d65079fb057804aa8ebca8eace51c4bdb63749",Yn=`/* font *//* background *//* borders *//* fonts *//* paddings *//* margins and gaps *//* borders */

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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Vt)){var e=document.createElement("style");e.id=Vt,e.textContent=Yn,document.head.appendChild(e)}})();var U={colors:'"../../styles/colors.module.css"',distances:'"../../styles/distances.module.css"',fonts:'"../../styles/fonts.module.css"',colorBorderDark:"grey",colorBackgroundToolbarActive:"#dddddd",colorBackgroundOverlay:"rgba(100, 100, 100, 0.5)",colorBackgroundModal:"white",paddingSmall:"0.2rem",paddingMedium:"0.5rem",paddingLarge:"1rem",marginLarge:"1rem",sizeBorderSmall:"1px",radiusBorderLarge:"1rem",radiusBorderSmall:"0.3rem",fontFamilyDefault:"Arial, serif",container:"_container_ose23_8",innerContainer:"_innerContainer_ose23_22",headerContainer:"_headerContainer_ose23_29",header:"_header_ose23_29",bodyContainer:"_bodyContainer_ose23_43",closeButton:"_closeButton_ose23_52"};import{useOnClickOutside as os}from"usehooks-ts";var Dt=e=>{let t=Zn(a),o=es(null);return os(o,e.onClose),A.createElement("div",{className:`${U.container} ${t?.modal?.containerClassName||""}`},A.createElement("div",{className:`${U.innerContainer} ${t?.modal?.innerContainerClassName||""}`,ref:o},A.createElement("div",{className:`${U.headerContainer} ${t?.modal?.headerContainerClassName||""}`},A.createElement("span",{className:U.header},e.title),A.createElement("button",{className:U.closeButton,onClick:e.onClose},A.createElement(ts,{size:"1.5rem"}))),A.createElement("div",{className:`${U.bodyContainer} ${t?.modal?.bodyContainerClassName||""}`},e.children)))};var Rt=e=>{let t=rs(a),[o,r]=qt(null),[i,c]=qt(null),v=C=>{r(C.message)},_=C=>{c(C)},T=(C,u,f)=>{e.onUploadFinish(C,u,f)};ns(()=>{e.uploader.setOnProgressViewCallback(_),e.uploader.setOnErrorViewCallback(v),e.uploader.setOnFinishViewCallback(T)},[e.uploader]);let H=C=>{r(null);let u=C.currentTarget.files;if(!u)return;let f=Array.from(u);if(e.acceptedFileTypes){for(let y of f)if(!ss(y.type,e.acceptedFileTypes))return r(t?.texts?.invalidFileTypeError||"Invalid file type.")}if(e.maxFileSize){for(let y of f)if(y.size>e.maxFileSize)return r(t?.texts?.maxFileSizeError||"File too large.")}c(0);for(let y of f)e.uploader.startUpload(y).then()};return O.createElement(Dt,{title:t?.texts?.uploadModalHeaderTitle||"Upload file",onClose:e.onClose},O.createElement(m,null,O.createElement(ne,null,O.createElement("input",{className:be.fileInput,type:"file",onChange:H,disabled:i!==null}),o&&O.createElement(m.Error,{text:o}))),i!==null&&O.createElement("progress",{className:be.progressBar,max:100,value:i*100}))},ss=(e,t)=>(t=t.replace(/\s/g,""),t.split(",").some(r=>{if(r.endsWith("/*")){let i=r.split("/")[0];return e.startsWith(i)}else return r===e}));import Kt from"react";var zt=e=>Kt.createElement("span",{contentEditable:!1,...e.attributes},Kt.createElement("img",{src:e.element.src,alt:e.element.altText||"Image"}),e.children);import is from"react";var Gt=e=>is.createElement("a",{href:e.element.href,...e.attributes},e.children);import ls from"react";var jt=e=>ls.createElement(a.Provider,{value:e.value},e.children);import as from"react";var Wt=e=>as.createElement("li",{...e.attributes},e.children);var Cs=e=>{let[t]=Jt(()=>hs(Es(fs(cs())))),[o,r]=Jt({show:!1}),i=ms([]),c=Qt(l=>{switch(l.element.type){case"blockquote":return d.createElement(Pe,{...l});case"code":return d.createElement(_e,{...l});case"heading-1":return d.createElement(He,{...l});case"heading-2":return d.createElement(Be,{...l});case"heading-3":return d.createElement(Se,{...l});case"heading-4":return d.createElement(Ie,{...l});case"heading-5":return d.createElement(Ne,{...l});case"heading-6":return d.createElement(we,{...l});case"image":return d.createElement(zt,{...l});case"hyperlink":return d.createElement(Gt,{...l});case"ordered-list-item":return d.createElement(Wt,{...l});case"ordered-list":return d.createElement(Fe,{...l});case"unordered-list":return d.createElement(Le,{...l});case"unordered-list-item":return d.createElement(Ue,{...l});default:return d.createElement(Te,{...l})}},[]),v=Qt(l=>d.createElement(Je,{...l}),[]),_=l=>{switch(l.key){case"_":case"*":{L.handleBoldAndItalic(t,l);break}case" ":case"Dead":{let p=n.textSinceBlockStart(t);if(!p)break;let x=!1;for(let F of pe)if(p===F.shortcutText||F.shortcutRegex?.test(p)){n.deleteFromLeft(t,p.length),F.toggle(t,{actor:"shortcut",actorShortcut:p}),l.preventDefault(),x=!0;break}if(x||!t.selection)return;for(let F of oe){if(!F.shortcutRegex)continue;let R=p.match(F.shortcutRegex);if(R){n.deleteAt(t,{path:t.selection.anchor.path,offset:p.length-R[0].length},R[0].length),F.toggle(t,{actor:"shortcut",actorShortcutMatch:R}),l.preventDefault();break}}break}case"Tab":{let p=n.currentBlockType(t);if(!p)break;let x=$[p].onTab;if(!x)break;x(t,l);break}case"Enter":{let p=n.currentElementType(t);if(!p)break;let x=$[p].onEnter;if(!x)break;x(t,l);break}}},T=l=>{if(t.operations.some(x=>x.type!=="set_selection")){if(i.current=l,!e.onChange)return;e.onChange(l)}},H=l=>{e.onBlur&&(e.onBlur(l,i.current),l.preventDefault())},C=(l,p)=>{r({show:!0,accept:l,forceAttachment:p})},u=()=>{r({show:!1}),gs.focus(t)},f=(l,p,x)=>{if(p.type.includes("image")&&!o.forceAttachment){if(!w.onUpsert)return;w.onUpsert(t,{src:l,metaData:x})}else{if(!P.onUpsert)return;P.onUpsert(t,{children:[{text:p.name}],href:l,metaData:x})}u()},y=ds(()=>e.initialValue&&e.initialValue.length>0?e.initialValue:[{type:"paragraph",children:[{text:e.defaultText!==void 0?e.defaultText:""}]}],[e.initialValue,e.defaultText]);return d.createElement(jt,{value:e.customStyle},d.createElement(us,{editor:t,value:y,onChange:T},d.createElement("div",{className:`${ye.container} ${e.customStyle?.editor?.containerClassName||""}`},d.createElement(Ut,{onUploadRequest:e.uploadInfo?C:void 0}),d.createElement(ps,{className:`${ye.editor} ${$t.container} ${e.customStyle?.editor?.editorContainerClassName||""}`,renderElement:c,renderLeaf:v,onKeyDown:_,onBlur:H})),e.uploadInfo&&o.show&&d.createElement(Rt,{onUploadFinish:f,onClose:u,...e.uploadInfo,acceptedFileTypes:o.accept||e.uploadInfo.acceptedFileTypes})))},Es=e=>{let{isInline:t}=e;return e.isInline=o=>oe.map(i=>i.elementType).includes(o.type)||t(o),e},hs=e=>{let{isVoid:t}=e;return e.isVoid=o=>fe.map(i=>i.elementType).includes(o.type)||t(o),e};import _s,{useMemo as Ts}from"react";var Xt=(e,t)=>e.filter(o=>o===t).length,Yt=e=>Array(e*4).join(" "),ys={blockquote:(e,t)=>`> ${b(e.children,[...t,"blockquote"])}
`,code:(e,t)=>`\`\`\`
${b(e.children,[...t,"code"])}
\`\`\`
`,"heading-1":(e,t)=>`# ${b(e.children,[...t,"heading-1"])}
`,"heading-2":(e,t)=>`## ${b(e.children,[...t,"heading-2"])}
`,"heading-3":(e,t)=>`### ${b(e.children,[...t,"heading-3"])}
`,"heading-4":(e,t)=>`#### ${b(e.children,[...t,"heading-4"])}
`,"heading-5":(e,t)=>`##### ${b(e.children,[...t,"heading-5"])}
`,"heading-6":(e,t)=>`###### ${b(e.children,[...t,"heading-6"])}
`,hyperlink:(e,t)=>`[${b(e.children,[...t,"hyperlink"])}](${e.href||""})`,image:(e,t)=>`![${e.altText||""}](${e.src||""})`,"ordered-list":(e,t)=>b(e.children,[...t,"ordered-list"]),"ordered-list-item":(e,t)=>{let o=Xt(t,"ordered-list"),r=Yt(o-1);return r=`${r}1. ${b(e.children,[...t,"ordered-list-item"])}
`,r},paragraph:(e,t)=>`
${b(e.children,[...t,"paragraph"])}
`,"unordered-list":(e,t)=>b(e.children,[...t,"unordered-list"]),"unordered-list-item":(e,t)=>{let o=Xt(t,"unordered-list"),r=Yt(o-1);return r=`${r}* ${b(e.children,[...t,"unordered-list-item"])}
`,r}},bs=e=>{if(!e.text)return"";let t=e.text;return e.bold&&(t=`**${t}**`),e.italic&&(t=`*${t}*`),t},xs=(e,t)=>{let o=ys[e.type];return o?o(e,t):""},ks=(e,t)=>{if(n.isLeaf(e))return bs(e);let o=e;return o.type?xs(o,t):""},b=(e,t,o="")=>e?e?.map(r=>ks(r,t)).join(o):"",xe=e=>b(e,[]);import Ps from"react-markdown";import Hs from"remark-gfm";import Bs from"remark-breaks";var Zt="40e6ddf7c5d045006c48dcf6afbe7a062e22c1bd98502e45e8dd2e2a54cd56b1",vs=`
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
}`;(function(){if(!(typeof document>"u")&&!document.getElementById(Zt)){var e=document.createElement("style");e.id=Zt,e.textContent=vs,document.head.appendChild(e)}})();var eo={fonts:'"../../shared/styles/fonts.module.css"',colors:'"../../shared/styles/colors.module.css"',distances:'"../../shared/styles/distances.module.css"',fontFamilyDefault:"Arial, serif",colorBorderLight:"lightgrey",sizeBorderLarge:"5px",marginLarge:"1rem",paddingMedium:"0.5rem",paddingSmall:"0.2rem",container:"_container_1d1ld_9"};var Ss=e=>{let t=Ts(()=>typeof e.value=="string"?e.value:xe(e.value),[e.value]);return _s.createElement(Ps,{className:`${eo.container} ${e.className||""}`,remarkPlugins:[Hs,Bs]},t)};var ke=class{onProgress(t){this.onProgressViewCallback&&this.onProgressViewCallback(t)}onFinish(t,o,r={}){this.onFinishViewCallback&&this.onFinishViewCallback(t,o,r)}onError(t){this.onErrorViewCallback&&this.onErrorViewCallback(t)}onProgressViewCallback;setOnProgressViewCallback(t){this.onProgressViewCallback=t}onFinishViewCallback;setOnFinishViewCallback(t){this.onFinishViewCallback=t}onErrorViewCallback;setOnErrorViewCallback(t){this.onErrorViewCallback=t}};export{ke as AbstractUploader,Cs as MarkdownEditor,Ss as MarkdownView,xe as toMarkdown};
//# sourceMappingURL=index.js.map
