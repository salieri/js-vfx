

/**
 * @constructor
 * @extends Renderer
 */

function FlatShaderRenderer()
{
	
}


FlatShaderRenderer.prototype = Helper.extend( Renderer.prototype );


/**
 * @param {Scene} scene
 */

FlatShaderRenderer.prototype.draw = function( scene )
{
	scene.faceSortPile.sort();

	var faceLength	= scene.faceSortPile.lookupTable.length;	
	var faceColor	= new Color();
	
	for( var i = 0; i < faceLength; i++ )
	{		
		/**
		 * @type {FaceLookup}
		 */
		var faceLookup = scene.faceSortPile.lookupTable[ i ];
		
		faceColor.r = Math.round( faceLookup.face.lightData.diffuseColor.r * faceLookup.face.material.color.r );
		faceColor.g = Math.round( faceLookup.face.lightData.diffuseColor.g * faceLookup.face.material.color.g );
		faceColor.b = Math.round( faceLookup.face.lightData.diffuseColor.b * faceLookup.face.material.color.b );
		
		Draw.triangle( 
				faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
				faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
				faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
				faceColor
			);
	}
};
	

