/**
 * WM TYPEWRITER SCROLLING
 */
"use strict";
(function(mod) {
	if (typeof exports == "object" && typeof module == "object") {
		mod(require("codemirror"));
	} else if (typeof define == "function" && define.amd) {
		define(["codemirror"], mod);
	} else {
		mod(CodeMirror);
	}
})(function(CodeMirror) {


	CodeMirror.defineOption("typewriterScrolling", false, function(cm, val, old) {
		if (old && old != CodeMirror.Init) {
			cm.off("changes", onChanges);
		}
		if (val) {
			cm.on("changes", onChanges);
		}
	});

	"use strict";
	CodeMirror.commands.scrollSelectionToCenter = function (cm) {
		if (cm.getOption("disableInput")) {
			return CodeMirror.Pass;
		}

		var cursor = cm.getCursor("from");
		var top = cm.charCoords({line: cursor.line, ch: cursor.ch}, "local").top;
		var halfWindowHeight = cm.getWrapperElement().offsetHeight / 2;
		var scrollTo = Math.round((top - halfWindowHeight));

		cm.scrollTo(null, scrollTo);
	};


	var oldPos = 0;

	function onChanges(cm, changes) {

		if (cm.getSelection().length !== 0) {
			return;
		}

		var currentPos = cm.cursorCoords().top;
		if (currentPos !== oldPos) {
			cm.execCommand("scrollSelectionToCenter");
			oldPos = cm.cursorCoords().top;
			return;
		}
	}
});
