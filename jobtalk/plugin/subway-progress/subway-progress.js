/**
 * reveal.js symbol per slide progress plugin
 *
 * A plugin which shows every slide as single symbol and the symbol of the current active slide in a different color.
 *
 * Demo https://naamor.github.io/reveal.js-symbol-per-slide-progress/
 *
 * MIT License
 * Copyright (c) 2018 Roman Stocker
 */

var RevealSubwayProgress = window.SubwayProgress || (function () {
    const VALID_POSITIONS = ["left", "right"];
    const VALID_ALIGNS = ["vertical", "horizontal"];

    // Set all option defaults
    var options = Reveal.getConfig().subwayprogress || {};
    var path = options.path || scriptPath() || "plugin/subway-progress/";
    if (!path.endsWith('/')) {
        path += '/';
    }

    var position = getStringOption(options.position, VALID_POSITIONS) || "left";
    var align = getStringOption(options.align, VALID_ALIGNS) || "vertical";
    var symbolColor = options.symbolColor || getColor(".reveal");
    var listItemActiveColor = options.symbolActiveColor || getColor(".controls");

    loadResource(path + "subway-progress.css", "stylesheet");

    initialize();

    function initialize() {
        var reveal = document.querySelector(".reveal");

        var div = document.createElement("div");
        div.className = "navigation " + position;

        var ul = document.createElement("ul");
        ul.className = "navigation-list";

        updateNavigation(ul);

        Reveal.addEventListener("slidechanged", function () {
            updateNavigation(ul);
        });

        div.appendChild(ul);
        reveal.appendChild(div);
    }

    // Check input if it is valid and return it
    function getStringOption(option, VALID_ELEMENTS) {
        if (typeof option === "string" && VALID_ELEMENTS.includes(option.toLowerCase())) {
            return option.toLowerCase();
        }
    }

    // Get a color of the theme
    function getColor(selectorValue) {
        var selector = document.querySelector(selectorValue),
            style = window.getComputedStyle(selector),
            color = style.getPropertyValue("color");

        return color;
    }

    function updateNavigation(ul) {
//        var totalSlides = Reveal.getTotalSlides();
// below code lets us get number of top level aka "horizontal" slides (e.g. "chapters")
        var totalSlides = document.querySelectorAll( '.reveal .slides>section' ).length;

        // Reset all child element
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        for (counter = 1; counter <= totalSlides; counter++) {
            var li = document.createElement("li");
            li.innerHTML = '<div class="node"></div>';
            li.className = getClassName();
            var state = Reveal.getState();

            if (state.indexh === counter - 1) {
                li.classList.add("active");
            } else {
                li.classList.add("complete");
            }

            ul.appendChild(li);
        }
    };

    function getClassName() {
        if (align === "horizontal") {
            switch (position) {
                case "right":
                    return "navigation-list-element horizontal-right";
                case "left":
                default:
                    return "navigation-list-element horizontal-left";
            }
        }

        return "navigation-list-element";
    }

    // Modified from math plugin
    function loadResource(url, type, callback) {
        var head = document.querySelector("head");
        var resource;

        if (type === "script") {
            resource = document.createElement("script");
            resource.type = "text/javascript";
            resource.src = url;
        } else if (type === "stylesheet") {
            resource = document.createElement("link");
            resource.rel = "stylesheet";
            resource.href = url;
        }

        // Wrapper for callback to make sure it only fires once
        var finish = function () {
            if (typeof callback === "function") {
                callback.call();
                callback = null;
            }
        };

        resource.onload = finish;

        // IE
        resource.onreadystatechange = function () {
            if (this.readyState === "loaded") {
                finish();
            }
        };

        // Normal browsers
        head.appendChild(resource);
    }

    function scriptPath() {
        // obtain plugin path from the script element
        var path;
        if (document.currentScript) {
            path = document.currentScript.src.slice(0, -19);
            console.log(path);
        } else {
            var sel = document.querySelector('script[src$="subway-progress.js"]');
            console.log(sel);
            if (sel) {
                path = sel.src.slice(0, -28);
            }
        }

        return path;
    }
})();
