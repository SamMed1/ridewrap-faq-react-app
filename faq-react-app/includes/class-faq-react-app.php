<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://www.ridewrap.com
 * @since      1.0.0
 *
 * @package    Faq_React_App
 * @subpackage Faq_React_App/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Faq_React_App
 * @subpackage Faq_React_App/includes
 * @author     RideWrap <sam@ridewrap.ca>
 */
class Faq_React_App {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Faq_React_App_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'FAQ_REACT_APP_VERSION' ) ) {
			$this->version = FAQ_REACT_APP_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'faq-react-app';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Faq_React_App_Loader. Orchestrates the hooks of the plugin.
	 * - Faq_React_App_i18n. Defines internationalization functionality.
	 * - Faq_React_App_Admin. Defines all hooks for the admin area.
	 * - Faq_React_App_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-faq-react-app-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-faq-react-app-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-faq-react-app-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-faq-react-app-public.php';

		$this->loader = new Faq_React_App_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Faq_React_App_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Faq_React_App_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Faq_React_App_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Faq_React_App_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

		add_shortcode("faq-react-app", Array($this,'render_faq_react_app_html'));
		add_shortcode("faq-react-app-listings", Array($this,'render_faq_react_listings_html'));

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Faq_React_App_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

	public function render_faq_react_app_html($atts = []) {
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . '../public/js/new.js', array(), $this->version, false );
		wp_enqueue_script( $this->plugin_name, 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/solid.min.js', array(), $this->version, false );
		wp_enqueue_style( 'load-fa', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' );
		wp_enqueue_style( 'g-fonts', 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap' );

		$this->render_faq_schema();
		echo '<div class="rw-app-faq" id="root"></div>';

		wp_enqueue_script( 'bucket-data', plugin_dir_url( __FILE__ ) . '../public/js/bucket-data.js', array(), $this->version, false );
	}

	/**
	 * Handles server side faq schema to be rendered to page.
	 */
	public function render_faq_schema(){
		$auth = TEAMS_API_TOKEN;

		$headers = array(
			'headers'     => array(
				'Authorization' => 'Bearer ' . $auth,
			),
		); 
		$response = wp_remote_get( TEAMS_FAQ_RECORDS_API_ENDPOINT_PATH, $headers );

		if ( is_array( $response ) && ! is_wp_error( $response ) ) {
			$headers = $response['headers'];
			$body    = $response['body'];

			$obj = json_decode($body, TRUE);

			$html = '
					<script type="application/ld+json">
					{
						"@context": "https://schema.org",
						"@type": "FAQPage",
						"mainEntity": [';

			/**
			 * If there is something after /faq/ in the URL, then we only want to render the specific FAQ item in the schema.
			 * If no faq item specified in URL, then we retreive all FAQ items to be used in schema.
			 */
			if ( ! str_ends_with( $_SERVER['REQUEST_URI'], 'faq/' ) ) {

				$title_param_formatted = str_replace('-', " ", basename( $_SERVER['REQUEST_URI'] ) );

				/**
				 * Set empty variables early. These will be conditionally set, below.
				 */
				$matched_title   = '';
				$matched_content = '';

				foreach( $obj as $key => $value ) {
					$faq_item_title_formatted = strtolower( str_replace( '?', "", $value['title'] ) );

					if ( $title_param_formatted == $faq_item_title_formatted ) {
						/**
						 * if the parameter 'title' value is same as the api response 'title' value, it's a match.
						 * .. so set variables to use in the schema.
						 */
						$matched_title   = $value['title'];
						$matched_content = $value['content'];
					}
				}

				$d = trim(preg_replace('/\r|\n/', '', $matched_content));
				$e = str_replace('"', "'", $d);
				$f = str_replace('.', ". ", $e);

				$html .= '{
					"@type": "Question",
					"name": " ' . $matched_title . ' ",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": " ' . $f . ' "
					}
				}';

			} else {

				foreach( $obj as $key => $value ) {
					$faq_title = $value['title'];
					$faq_answer = $value['content'];

					$a = trim(preg_replace('/\r|\n/', '', $faq_answer));
					$b = str_replace('"', "'", $a);
					$c = str_replace('.', ". ", $b);

					$html .= '{
						"@type": "Question",
						"name": " ' . $faq_title . ' ",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": " ' . $c . ' "
						}
					},';
				}

				$html .= '{
					"@type": "Question",
					"name": "Is my credit card information safe on RideWrap?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Our website traffic is encrypted with an SSL certificate to protect your information at all times.  We use third-parties, Square, Stripe and Paypal, to process our transactions.  We do not store your credit card information on our website database or on our servers. "
					}
				}';

			}
			
			$html .= 		']
					}
					</script>';

			echo $html;

		}
	}

	public function render_faq_react_listings_html($atts = []) {
		echo include( 'faq-listings.php' );
	}

}
