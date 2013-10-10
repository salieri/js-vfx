

/**
 * @returns {FlatRenderer}
 */

function FlatRenderer()
{
	
}


FlatRenderer.prototype = Helper.extend( Renderer.prototype );


/**
 * @param {Scene} scene
 */

FlatRenderer.prototype.draw = function( scene )
{
	scene.faceSortPile.sort();

	var faceLength = scene.faceSortPile.lookupTable.length;	
	
	for( var i = 0; i < faceLength; i++ )
	{		
		/**
		 * @type {FaceLookup}
		 */
		var faceLookup = scene.faceSortPile.lookupTable[ i ];
		
		Draw.color.r = Math.round( 255 / ( faceLength - 1 ) * faceLookup.face.order );
		Draw.color.g = 255 - Math.round( 255 / ( faceLength - 1 ) * faceLookup.face.order );
		
		// faceLookup.face.a
		
		Draw.triangle( 
				faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
				faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
				faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
				faceLookup.face.material.color
			);
	
	
 		/* Draw.line(
				faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
				faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
				faceLookup.face.material.color
			);
	
		Draw.line(
				faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
				faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
				faceLookup.face.material.color
			);
	
		Draw.line(
				faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
				faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
				faceLookup.face.material.color
			); */
	
	}
};
	

