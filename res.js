var navBar = document.getElementById('nav-bar');
var activeClass = 'nav-link-active';


/* *******************
   GET THE CLOSEST ANCESTOR OF THE EL WHICH MATCHES THE SELECTOR
** ******************/

function getTheClosest(el, selector) {
    var elParent = el.parentElement;
    while(el && elParent) {
        if (elParent === elParent.parentElement.querySelector(selector)) {
            return elParent;
        } else {
            elParent = elParent.parentElement;
        }
    }
    return null;
}


/* *******************
   ADD ACTIVECLASS TO ACTIVE NAV-LINK AND REMOVE IT FROM OTHER NAV-LINKS
** ******************/

function activateNavLink(activeLink) {
    let activeLinkId = activeLink.getAttribute('id');
    let theClosestNav = getTheClosest(activeLink, 'nav');
    let notActiveLinks = theClosestNav.querySelectorAll('a:not([id=' + activeLinkId + '])');
    activeLink.classList.add(activeClass);
    notActiveLinks.forEach(notActiveLink => {
        notActiveLink.classList.remove(activeClass);
    });
}


/* *******************
   CALL THE ABOVE FUNCTION IF CLICK NAV-LINK
** ******************/

navBar.addEventListener('click', function(event) {
    if(event.target && event.target.nodeName === 'A') {
        let navLink = event.target;
        activateNavLink(navLink);
    }
})


/* *******************
   ACTIVATE NAV-LINK IF ITS CONTENT IS ON WINDOW
** ******************/

function scroll(content) {
    const windowHeight = window.innerHeight;
    const scrollEffectHeight = content.offsetTop - windowHeight / 2;
    let navLinkHref = '#' + content.getAttribute('id');
    let navLink = navBar.querySelector('a[href="' + navLinkHref + '"]');

    if(document.body.scrollTop > scrollEffectHeight || document.documentElement.scrollTop > scrollEffectHeight) {
        activateNavLink(navLink);

    } else {
        navLink.classList.remove(activeClass);
    }
}


/* *******************
   CALL THE ABOVE FUNCTION IF SCROLL DOWN
** ******************/

window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll ('.main section');
    sections.forEach(section => {
        scroll(section);
    });
})