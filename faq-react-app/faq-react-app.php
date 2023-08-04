<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.ridewrap.com
 * @since             1.0.0
 * @package           Faq_React_App
 *
 * @wordpress-plugin
 * Plugin Name:       FAQ-React-App
 * Plugin URI:        https://www.ridewrap.com
 * Description:       FAQ React App.
 * Version:           1.0.0
 * Author:            RideWrap
 * Author URI:        https://www.ridewrap.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       faq-react-app
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'FAQ_REACT_APP_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-faq-react-app-activator.php
 */
function activate_faq_react_app() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-faq-react-app-activator.php';
	Faq_React_App_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-faq-react-app-deactivator.php
 */
function deactivate_faq_react_app() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-faq-react-app-deactivator.php';
	Faq_React_App_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_faq_react_app' );
register_deactivation_hook( __FILE__, 'deactivate_faq_react_app' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-faq-react-app.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_faq_react_app() {

	$plugin = new Faq_React_App();
	$plugin->run();

}
run_faq_react_app();
