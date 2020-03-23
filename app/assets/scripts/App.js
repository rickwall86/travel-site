import '../styles/styles.css';
import 'lazysizes';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import ClientArea from './modules/ClientArea';

// React related code below
import React from 'react';
import ReactDOM from 'react-dom';

// Import react component which we created
import MyAmazingComponent from "./modules/MyAmazingComponent";

// belows takes two arguments. First one is a component (reusable feature) that you want to render to the page. The second is the place on the page you want to render to
ReactDOM.render(<MyAmazingComponent />, document.querySelector('#my-react-example'));

new ClientArea();
new MobileMenu();
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);
new StickyHeader();

let modal;

document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        if (typeof modal == 'undefined') {
            import(/* webpackChunkName: 'modal' */'./modules/Modal').then(x => {
                modal = new x.default();
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(() => console.log('There was a problem'));
        } else {
            modal.openTheModal();
        }
    })
})

if (module.hot) {
    module.hot.accept();
}

