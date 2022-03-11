/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// CSS files
import './styles/app.css';
import './styles/navbar.css'; 
import './styles/map.css'; //css for the map
import './styles/annimations.css';
import './styles/dashboard.css';
import './styles/colors.css';
//fonts
import './fonts/fonts.css';
//bootstrap
import './bootstrap/bootstrap.min.css';
import './bootstrap-icons/bootstrap-icons.css';
//swipper
import './swipper/swiper-bundle.min.css';
//glightbox
import './glightbox/css/glightbox.min.css';

// JS files
import './controllers/hello_controller';
import './controllers/move'
//boostrap
import './bootstrap/bootstrap.bundle.min';
//JQuery
import './controllers/jquery-3.3.1.slim.min';
//swipper
import './swipper/swiper-bundle.min';
//isotope-layout
import './isotope-layout/isotope.pkgd.min';
//glightbox
import './glightbox/js/glightbox.min';

// start the Stimulus application
import './bootstrap';

const $ = require('jquery');
// this "modifies" the jquery module: adding behavior to it
// the bootstrap module doesn't export/return anything
require('bootstrap');

// or you can include specific pieces
// require('bootstrap/js/dist/tooltip');
// require('bootstrap/js/dist/popover');

$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
});