/**
 * @param scene
 * @constructor
 */

function FaceSortPile( scene )
{
	this.scene			= scene;	
	this.lookupTable	= [];
	this.forceInit		= true;
}


FaceSortPile.prototype = {

	populate : function()
	{
		var idx			= 0;
		var	meshLength	= this.scene.meshes.length;
		
		for( var i = 0; i < meshLength; i++ )
		{
			var faces		= this.scene.meshes[ i ].faces;
			var faceLength	= faces.length;
			
			for( var j = 0; j < faceLength; j++ )
			{
				this.lookupTable[ idx ] = new FaceLookup( faces[ j ], this.scene.meshes[ i ] );
				idx++;
			}
		}		
	},

	
	resize : function()
	{
		var	faceCount	= 0;
		var	meshLength	= this.scene.meshes.length;
		
		for( var i = 0; i < meshLength; i++ )
		{
			faceCount += this.scene.meshes[ i ].faces.length;
		}	
	
		if( this.lookupTable.length !== faceCount )
		{
			this.lookupTable = new Array( faceCount );
		}	
	},
	

	init : function()
	{
		this.forceInit = false;
		
		this.resize();
		this.populate();		
	},


	sort : function()
	{
		this.lookupTable.sort( 
				function( a, b )
				{
					if( a.face.position.z > b.face.position.z )
					{
						return 1;
					}
					
					if( a.face.position.z < b.face.position.z ) 
					{
						return -1;
					}
					
					return 0;
				}				
			);		
	}

};

