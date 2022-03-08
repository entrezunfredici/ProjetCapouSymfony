/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// CSS files
import './styles/app.css';
//bootstrap
import './bootstrap/bootstrap.min.css';
// JS files
import './controllers/hello_controller';
//boostrap
import './bootstrap/bootstrap.bundle.min';
//JQuery
import './controllers/jquery-3.3.1.slim.min';
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