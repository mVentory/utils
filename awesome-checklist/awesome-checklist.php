<?php defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/**
 * Plugin Name: Awesome Checklist
 * Plugin URI: https://github.com/mVentory/utils/tree/master/awesome-checklist
 * Description: Converts ul (add class="mvchecklist") and li (add id="[unique str]") tags into reusable checklists for visitors.
 * Version: 1.0.0
 * Author: Yoga Sukma
 * Author URI: http://ysupr.net
 * License: GPL2
 */

// enque scripts
function awesome_checklist_js()
{
    global $post;

    // registering app js
    wp_register_script(
        'awesome-checklist.js',
        plugin_dir_url( __FILE__ ) . 'scripts.js',
        array( 'jquery' )
    );

    // attach data
    wp_localize_script(
        'awesome-checklist.js',
        'awesome_checklist_var',
        array(
            "postId" => $post->ID,
            "url"    => $_SERVER[ 'REQUEST_URI' ]
        )
    );

    wp_enqueue_script( 'awesome-checklist.js' );
}

add_action( 'wp_enqueue_scripts', 'awesome_checklist_js' );
