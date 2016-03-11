<?php defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/**
 * Plugin Name: Awesome Checklist
 * Plugin URI: http://github.com/ysupr/awesome-checklist
 * Description: Convert ul and li tags to became checklist for visitors
 * Version: 1.0.0
 * Author: Yoga Sukma
 * Author URI: http://ysupr.net
 * License: GPL2
 */

// enque scripts
function awesome_checklist_js()
{
    global $post;

    // load js cookie library
    wp_enqueue_script(
        "js.cookies",
        plugin_dir_url( __FILE__ ) . 'assets/js/js.cookie.js'
    );

    // registering app js
    wp_register_script(
        'awesome-checklist.js',
        plugin_dir_url( __FILE__ ) . 'awesome-checklist.js',
        array( 'jquery' )
    );

    // attach data
    wp_localize_script(
        'awesome-checklist.js',
        'awesome_checklist_var',
        array(
            "postId" => $post->ID
        )
    );

    wp_enqueue_script( 'awesome-checklist.js' );
}

add_action( 'wp_enqueue_scripts', 'awesome_checklist_js' );
