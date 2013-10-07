
/**
 * @returns {VertexRenderer}
 */

function VertexRenderer()
{
	
}


VertexRenderer.prototype = Helper.extend( Renderer.prototype );


/**
 * @param {Scene} scene
 */
VertexRenderer.draw = function( scene )
{
	for( var m = 0; m < scene.meshes.length; m++ )
	{
		scene.meshes[ m ].drawVertices();
	}
};
	
