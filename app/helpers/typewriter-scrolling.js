/**
 * LICENSE : MIT
 */
"use strict";
(function (mod) {
    if (typeof exports == "object" && typeof module == "object") {
        mod(require("codemirror"));
    }
    else if (typeof define == "function" && define.amd) {
        define(["codemirror"], mod);
    }
    else {
        mod(CodeMirror);
    }
})(function (CodeMirror) {
    "use strict";

    var originalRect;
    var lastRect;
    var lastScrollHeight;
    var lastScrollTo = 0;

    CodeMirror.commands.scrollSelectionToCenter = function (cm) {
        if (cm.getOption("disableInput")) {
            return CodeMirror.Pass;
        }
        var cursor = cm.getCursor('anchor');
        var top = cm.charCoords({line: cursor.line, ch: 0}, "local").top;
        var halfWindowHeight = cm.getWrapperElement().offsetHeight / 2;
        var scrollTo = Math.round((top - halfWindowHeight));
        cm.scrollTo(null, scrollTo);

/*

        var currentTopLoc = originalRect.top;
        var currentHeight = originalRect.bottom - originalRect.top;

        //console.log("scroller/top diff: " + (cm.getScrollerElement().scrollHeight - top));
        //console.log(cm.charCoords({line: cursor.line, ch: 0}, "local"));
        if (scrollTo != lastScrollTo) {
            lastScrollHeight = cm.getScrollerElement().scrollHeight;
            lastScrollTo = scrollTo;
        }
        var lineDiff = cm.getScrollerElement().scrollHeight - lastScrollHeight;
        //console.log("lineDiff: " + lineDiff);

        var currentCursorOffset = top + lineDiff;

        if (currentCursorOffset < halfWindowHeight) {
            currentTopLoc = halfWindowHeight - currentCursorOffset;
            currentHeight = halfWindowHeight + currentCursorOffset;
            console.log("currentCursorOffset: " + currentCursorOffset);
            //console.log("window needs to be moved down.");

        } else if (currentCursorOffset + halfWindowHeight > cm.getScrollerElement().scrollHeight) {
            console.log("window needs to be moved up.");

        } else {
            // we just need to shift only the lineDiff
            currentTopLoc -= lineDiff;
        }

        // we're only shifting things around if they're worth shifting.
        if (Math.abs(currentTopLoc - lastRect.top) > 5) {
            cm.getWrapperElement().style.top = currentTopLoc + 'px';
            cm.getWrapperElement().style.height = currentHeight + 'px';
            lastRect = cm.getWrapperElement().getBoundingClientRect();
        }

//*/


/*
console.log("scrollHeight: " + cm.getScrollerElement().scrollHeight);
console.log("top: " + top);
console.log("halfWindowHeight: " + halfWindowHeight);
console.log("scrollTo: " + scrollTo);


top:
typewriter-scrolling.js:27 scrollHeight: 1388
typewriter-scrolling.js:28 top: 19
typewriter-scrolling.js:29 halfWindowHeight: 318
typewriter-scrolling.js:30 scrollTo: -299

actual middle:
typewriter-scrolling.js:27 scrollHeight: 1403
typewriter-scrolling.js:28 top: 829
typewriter-scrolling.js:29 halfWindowHeight: 318
typewriter-scrolling.js:30 scrollTo: 511

bottom:
typewriter-scrolling.js:27 scrollHeight: 1418
typewriter-scrolling.js:28 top: 1369
typewriter-scrolling.js:29 halfWindowHeight: 318
typewriter-scrolling.js:30 scrollTo: 1051

*/


    };
    CodeMirror.defineOption("typewriterScrolling", false, function (cm, val, old) {
        if (old && old != CodeMirror.Init) {
            cm.off("changes", onChanges);
        }
        if (val) {
            cm.on("changes", onChanges);
        }
        originalRect = cm.getWrapperElement().getBoundingClientRect();
        lastRect = originalRect;

    });
    function onChanges(cm, changes) {
        if (cm.getSelection().length !== 0) {
            return;
        }
        for (var i = 0, len = changes.length; i < len; i++) {
            var each = changes[i];
            if (each.origin === '+input' || each.origin === '+delete') {
                cm.execCommand("scrollSelectionToCenter");
                return;
            }
        }
    }
});
