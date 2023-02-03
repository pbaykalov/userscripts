// ==UserScript==
// @name        unfix-all-the-toolbars-1
// @description Removes "position: fixed" style from elements, unfixing "toolbars" and the such.
// @namespace   https://hasanyavuz.ozderya.net
// @include     *
// @version     1
// @grant       none
// ==/UserScript==


// Based on https://stackoverflow.com/questions/13696100/greasemonkey-script-to-make-fixed-positioned-elements-static
// and https://gist.github.com/vbuaraujo/bddb3b93a0b2b7e28e1b

//alert("running");

function hhhu(){
    alert("running");
}

window.fixed_items = [];
var searched = false;
var windowHeightSearched = false;
var counter = 0;

function unfixAll() {
    console.log("======= unfix");
    if(!searched){
        document.querySelectorAll("h1, h2, ul, ol, li, div, nav, app-header, section, app-header *, header, header *, .app-header, .app-header *, .header, .header *, #app-header, #app-header *, #heaZder, #header *, #social-share-footer, .social-share-footer, footer, ps-header, announcement-banner, .cookies-banner").forEach(
            function (el) {
                var style = window.getComputedStyle(el);
                var innHeightPx = window.innerHeight*window.devicePixelRatio;
                var innHeight = window.innerHeight;
                var parentPos = window.getComputedStyle(el.parentNode).position;
                if(
                    style.visibility != "hidden" &&
                    ( style.position === "fixed"
                     || style.position === "sticky"
                     || (style.position === "relative" && (
                        parentPos === "fixed"
                        || parentPos === "sticky")
                         //чтобы фильтровать абсолюты, надо что-то особое придумать. На фейсбуке абсолютный верхний бар, у которого визибилити не наследуется. В гугле абсолютные надписи на странице.
                         //|| style.position === "absolute"
                        )
                     )
                     &&(
                        //				parseInt(style.top)+parseInt(style.height) < innHeightPx/3
                        //				|| parseInt(style.bottom)+parseInt(style.height) < innHeightPx/3
                        parseInt(style.top)+parseInt(style.height) < innHeight/3
                        || parseInt(style.top)> innHeight*2/3
                         || (style.top === "auto" && parseInt(style.bottom)< innHeight/3)

                    )
                     //&& !(style.display === "none" || style.visibility === "hidden")
                     && parseInt(style.height)<innHeight/3
                    )
                    /* Avoid unfixing JavaScript popups like Twitter's "confirm retweet" window */
                    {
                    //window.fixed_items.push(el);
                    window.fixed_items.push([el,style.visibility,style.display]);
                //el.style.position = "static";
                el.style.visibility = "hidden";
                /* I tried using "absolute" in the past, but this breaks WordPress's footer.
             Using "static" breaks it too, but at least it doesn't get in the way. */
            }
            });
        searched=true;
    } else {
        window.fixed_items.forEach(
            function(el) {
                //el.style.position = "static";
                el[0].style.visibility = "hidden";
                /* I tried using "absolute" in the past, but this breaks WordPress's footer.
             Using "static" breaks it too, but at least it doesn't get in the way. */
            }
        )
    }
}

function fixBack()
{
    window.fixed_items.forEach(
        function(el) {
            //el.style.position = "fixed";
            //el.style.visibility = "";
            el[0].style.visibility = el[1];
        }
    )
    //fixed_items = [];
}

function onScroll()
{
    if (window.scrollY > 0)
    {
        if (window.scrollY > window.innerHeight+700 && windowHeightSearched==false)
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
