

/**
 * @constructor
 * @extends Renderer
 */

function GouraudShaderRenderer()
{

}


GouraudShaderRenderer.prototype = Helper.extend( Renderer.prototype );


/**
 * @param {Scene} scene
 */

GouraudShaderRenderer.prototype.draw = function( scene )
{
	scene.faceSortPile.sort();

	var faceLength	= scene.faceSortPile.lookupTable.length;	
	var faceColorA	= new Color();
	var faceColorB	= new Color();
	var faceColorC	= new Color();
	
	for( var i = 0; i < faceLength; i++ )
	{		
		/**
		 * @type {FaceLookup}
		 */
		var faceLookup = scene.faceSortPile.lookupTable[ i ];
		
		if( faceLookup.face.visible === true )
		{
			faceColorA.set( faceLookup.face.material.color );
			faceColorB.set( faceLookup.face.material.color );
			faceColorC.set( faceLookup.face.material.color );

			faceColorA.multiply( faceLookup.mesh.vertices[ faceLookup.face.a ].lightData.diffuseColor );
			faceColorB.multiply( faceLookup.mesh.vertices[ faceLookup.face.b ].lightData.diffuseColor );
			faceColorC.multiply( faceLookup.mesh.vertices[ faceLookup.face.c ].lightData.diffuseColor );

			Draw.interpolatedTriangle( 
					faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
					faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
					faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
					faceColorA,
					faceColorB,
					faceColorC
				);
		}
	}
};
	

