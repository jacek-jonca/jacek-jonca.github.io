
        function selectElementInCurrentSlide(a) {
            return document.querySelector("section.present " + a)
        }

        function removeClassIfExists(a, e) {
            a.classList.contains(e) && a.classList.remove(e)
        }

function avatarExpand() {
    var a = selectElementInCurrentSlide(".jumbo-avatar");
    removeClassIfExists(a, "anim__avatar-jumbo--shrink"), a.classList.add("anim__avatar-jumbo--expand");
    var e = selectElementInCurrentSlide("#hud-avatar-container");
    removeClassIfExists(e, "anim__avatar--shrink"), e.classList.add("anim__avatar--expand")
}

function avatarShrink() {
    var a = selectElementInCurrentSlide(".jumbo-avatar.anim__avatar-jumbo--expand");
    a && (removeClassIfExists(a, "anim__avatar-jumbo--expand"), a.classList.add("anim__avatar-jumbo--shrink"));
    var e = selectElementInCurrentSlide("#hud-avatar-container.anim__avatar--expand");
    e && (removeClassIfExists(e, "anim__avatar--expand"), e.classList.add("anim__avatar--shrink"))
}

function avatarJumboExpansionReset() {
    var a = selectElementInCurrentSlide(".jumbo-avatar:not(.narrator-face)"),
        e = selectElementInCurrentSlide("#hud-avatar-container"),
        t;
    a && (removeClassIfExists(a, "anim__avatar-jumbo--shrink"), removeClassIfExists(a,
        "anim__avatar-jumbo--expand"), e && (removeClassIfExists(e, "anim__avatar--shrink"),
        removeClassIfExists(e, "anim__avatar--expand"))), !selectElementInCurrentSlide(
        ".jumbo-avatar-reset") && selectElementInCurrentSlide(".jumbo-avatar.current-visible.visible") && (
        e && e.classList.add("anim__avatar--expand"), a && a.classList.add("anim__avatar-jumbo--expand"))
}

function handleJumboAvatarForward() {
    event.fragments.forEach((function (a) {
        var e = a.parentNode.querySelector(".jumbo-avatar.current-fragment"),
            t = a.parentNode.querySelector(".jumbo-avatar-reset.current-fragment");
        e && avatarExpand(), t && avatarShrink()
    }))
}

function handleJumboAvatarBackward() {
    event.fragments.forEach((function (a) {
        var e = a.parentNode.querySelector(".jumbo-avatar"),
            t;
        a.parentNode.querySelector(".jumbo-avatar-reset") && avatarExpand(), e && avatarShrink()
    }))
}

/* This goes at the end of reveal.js file

Reveal.addEventListener("slidechanged", (function (e) {
    updateHud(), syncAllMeterBarsAriaWithWidth(), avatarJumboExpansionReset()
})), Reveal.addEventListener("fragmentshown", (function (e) {
    updateHud(), handleJumboAvatarForward()
})), Reveal.addEventListener("fragmenthidden", (function (e) {
    updateHud(), handleJumboAvatarBackward()
}));

*/