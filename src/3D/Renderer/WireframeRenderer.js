/**
 * @constructor
 * @extends Renderer
 */

function WireframeRenderer()
{
	
}


WireframeRenderer.prototype = Helper.extend( Renderer.prototype );


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
	



