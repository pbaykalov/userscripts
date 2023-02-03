// ==UserScript==
// @name        unfix-all-the-toolbars
// @description Removes "position: fixed" style from elements, unfixing "toolbars" and the such.
// @namespace   https://t.me/beton_kruglosu_totchno
// @include     *
// @version     2
// @grant       none
// ==/UserScript==


window.fixed_items = [];
var searched = false;
var windowHeightSearched = false;
var counter = 0;

window.badPosition=[
    // 'static',
                    'fixed','sticky','absolute']

function traverse(node){
    console.log('traversing')
    var style = window.getComputedStyle(node);
    var innHeightPx = window.innerHeight*window.devicePixelRatio;
    var innHeight = window.innerHeight;
    var rect = node.getBoundingClientRect();

    if(style.display!='none' && style.visibility!='hidden')
        console.log(node)


    //there can be fixed elements on any level except when it's too small already
    // if( (! window.badPosition.includes(style.position))
       // && parseInt(style.height) < innHeight
       // )
        // return;

    if(
        window.badPosition.includes(style.position) &&
        style.display != 'none' &&
        style.visibility != "hidden" &&
        style.visibility != "collapse" &&
        (
            rect.top+rect.height < innHeight/3
            || rect.top> innHeight*2/3
            //there may be elements with zero size which contain a lot of content
            //if I find a lot of content inside I should cancel this 'collapse'

            // parseInt(style.top)+parseInt(style.height) < innHeight/3
            // || parseInt(style.top)> innHeight*2/3
            // || (style.top === "auto" && parseInt(style.bottom)< innHeight/3)
            // //destructive
            // //if I find page content deeper I should cancel this 'collapse'
            // || (style.top === "auto" && style.bottom === 'auto' && parseInt(style.height)<innHeight/3)

        )
        // &&parseInt(style.height)<innHeight/3
    ){
        window.fixed_items.push([node,style.visibility,style.display]);
        node.style.visibility = "collapse";
    }

    var children = Array.from(node.children);
    children.forEach(traverse)
}


function unfixAll() {
    //console.log("======= unfix");
    if(!searched){
        traverse(document.body);
        searched=true;
    } else {
        window.fixed_items.forEach(
            function(el) {
                el[0].style.visibility = "collapse";
            }
        )
    }
}

function fixBack()
{
    window.fixed_items.forEach(
        function(el) {
            el[0].style.visibility = el[1];
        }
    )
}

function onScroll()
{
    if (window.scrollY > 0)
    {
        if (window.scrollY > window.innerHeight*1.5 && windowHeightSearched==false)
        {
            searched=false;
            windowHeightSearched=true;
        }
        unfixAll();
    }
    else
    {
        fixBack();
        window.fixed_items = [];
        searched = false;
        windowHeightSearched = false;
    }
}

window.addEventListener("scroll", onScroll);
window.unfixAll=unfixAll;
window.fixBack=fixBack;
