
define( [ '3D/Renderer/Renderer' ],

function( Renderer )
{
	'use strict';

	/**
	 * @constructor
	 * @extends Renderer
	 */
	var VertexRenderer = function()
	{

	};


	VertexRenderer.prototype = new Renderer();


	/**
	 * @param {Scene} scene
	 */
	VertexRenderer.prototype.draw = function( scene )
	{
		for( var m = 0; m < scene.meshes.length; m++ )
		{
			scene.meshes[ m ].drawVertices();
		}
	};

	return VertexRenderer;

} );
	
