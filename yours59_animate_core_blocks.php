<?php
/**
 *
 * Plugin Name:  Yours59 Animate Core Blocks
 * Plugin URI:   https://github.com/larsloQ/yours59-animate-inspector-panel
 * Description:  Plugin provides an Panel for Gutenberg Inspector which allows you to animate Core-Blocks.
 * Author:       larslo
 * Author URI:   https://larslo.de
 * Version:      1
 * Text Domain:  yours59
 *
 */

namespace Yours59AnimateCoreBlocks;

$yours59_animate_core_blocks = Yours59AnimateCoreBlocks::getInstance();

class Yours59AnimateCoreBlocks {

	// static $saved_options;
	protected static $instance = null;
	private static $name       = 'Yours59 Animate Core Blocks';


	// Method to get the unique instance.
	// Singleton
	public static function getInstance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self(); }
		self::$instance->init();

		return self::$instance;
	}

	/**
	 * is not allowed to call from outside to prevent from creating multiple instances,
	 * to use the singleton, you have to obtain the instance from Singleton::getInstance() instead
	 */
	private function __construct() {}

	/**
	 * prevent the instance from being cloned (which would create a second instance of it)
	 */
	private function __clone() {}

	/**
	 * prevent from being unserialized (which would create a second instance of it)
	 */
	public function __wakeup() {
		throw new Exception( 'Cannot unserialize' );
	}

	public function init() {
		/* enqueue block-editor js and css */
		add_action(
			'enqueue_block_editor_assets',
			function() {
				$file = '/editor/yours59-animate-inspector-panel.js';
				$name = 'yours59_animate-core-blocks';
				wp_enqueue_script(
					$name,
					plugins_url( $file, __FILE__ ),
					array( 'wp-blocks', 'wp-element', 'wp-edit-post' )
				);
			}
		);

		/* enqueue frontend assets */
		add_action(
			'wp_enqueue_scripts',
			function() {
				wp_enqueue_script(
					'animate-core-blocks',
					plugin_dir_url( __FILE__ ) . 'js/yours59-animate-core-blocks.js',
					array(),
					'yours59',
					true,
				);
				wp_enqueue_style(
					'animate-core-blocks',
					plugin_dir_url( __FILE__ ) . 'css/yours59-animate-core-blocks.css',
					array(),
					'yours59',
				);
			},
			10
		);
	}


} // class



