/**
 * @constructor
 */

function TextureRenderer()
{

}


TextureRenderer.prototype = {




};



/**
 * @constructor
 * @extends Renderer
 */

function TextureRenderer()
{

}


TextureRenderer.prototype = Helper.extend( Renderer.prototype );


/**
 * @param {Scene} scene
 */

TextureRenderer.prototype.draw = function( scene )
{
	scene.faceSortPile.sort();

	var faceLength	= scene.faceSortPile.lookupTable.length;

	for( var i = 0; i < faceLength; i++ )
	{
		/**
		 * @type {FaceLookup}
		 */
		var faceLookup = scene.faceSortPile.lookupTable[ i ];

		if( faceLookup.face.visible === true )
		{
			Draw.texturedTriangle(
					faceLookup.mesh.vertices[ faceLookup.face.a ].cameraProjected,
					faceLookup.mesh.vertices[ faceLookup.face.b ].cameraProjected,
					faceLookup.mesh.vertices[ faceLookup.face.c ].cameraProjected,
					faceLookup.face.uvA,
					faceLookup.face.uvB,
					faceLookup.face.uvC,
					faceLookup.face.material.getTexture()
			);
		}
	}
};


