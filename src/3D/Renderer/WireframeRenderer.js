
define( [ '3D/Renderer/Renderer' ],

function( Renderer )
{
	'use strict';

	/**
	 * @constructor
	 * @extends {Renderer}
	 */
	var WireframeRenderer = function()
	{

	};


	WireframeRenderer.prototype = new Renderer();


	/**
	 * @param {Scene} scene
	 */

	WireframeRenderer.prototype.draw = function( scene )
	{
		for( var m = 0; m < scene.meshes.length; m++ )
		{
			scene.meshes[ m ].drawWireframe();
		}
	};


	return WireframeRenderer;

} );
