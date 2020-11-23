<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

return [
    'js' => './dist/core.js',
    'rel' => [
		'main.polyfill.core',
	],
    'skip_core' => true,
];