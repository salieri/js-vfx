/**
 * @constructor
 */

function CanvasTextureContainer()
{
	this.textures	= {};
}
	

CanvasTextureContainer.prototype = {
	
	/**
	 * Add texture to container
	 * 
	 * @param {string} textureName
	 * @param {string} src
	 */
	
	add : function( textureName, src )
	{
		if( this.exists( textureName ) === true )
		{
			this.remove( textureName );
		}		
		
		var ct = new CanvasTexture( src );
		var me = this;
		
		this.textures[ textureName ] = ct;
		
		ct.onload = function() {
			me.eventImageLoaded( textureName );
		};
		
		return ct;
	},
	

	/**
	 * Add multiple canvas textures
	 * 
	 * Usage:
	 * 
	 * srcReferenceObject = {
	 *		myTexture1 : 'http://www.google.com/logo.png',
	 *		myTexture2 : 'http://www.microsoft.com/logo.png',
	 *		...
	 * };
	 * 
	 * @param {Object} srcReferenceObject
	 */
	
	addMany : function( srcReferenceObject )
	{
		for( var textureName in srcReferenceObject )
		{
			if( srcReferenceObject.hasOwnProperty( textureName ) === true )
			{
				if( this.textures.hasOwnProperty( textureName ) === true )
				{
					this.add( textureName, srcReferenceObject[ textureName ] );
				}
			}
		}
	},
	
	
	/**
	 * @param {string} textureName
	 */
	
	remove : function( textureName )
	{
		if( this.textures[ textureName ] !== null )
		{
			this.textures[ textureName ].destroy();
		}
		
		delete this.textures[ textureName ];
	},
	
	
	/**
	 * @param {string} textureName
	 * @returns {Boolean}
	 */
	
	exists : function( textureName )
	{
		if( this.get( textureName ) !== null )
		{
			return true;
		}
		
		return false;
	},
	
	
	reset : function()
	{
		for( var key in this.textures )
		{
			if( this.textures.hasOwnProperty( key ) === true )
			{
				this.remove( key );
			}
		}
		
		this.textures = {};
	},
	
	
	/**
	 * @param {string} textureName
	 * @returns {CanvasTexture|null}
	 */
	
	get : function( textureName )
	{
		if( this.textures.hasOwnProperty( textureName ) === true )
		{
			return this.textures[ textureName ];
		}
		
		return null;
	},
	
	
	/**
	 * @returns {Boolean}
	 */
	
	isLoaded : function()
	{
		for( var key in this.textures )
		{
			if( this.textures.hasOwnProperty( key ) === true )
			{
				if( this.textures[ key ] !== null )
				{
					if( this.textures[ key ].loaded !== true )
					{
						return false;
					}
				}
			}
		}
		
		return true;
	},
	
	
	eventImageLoaded : function ( textureName )
	{
		if( this.isLoaded() === true )
		{
			if( typeof( this.onload ) === 'function' )
			{
				this.onload();
			}			
		}
	}
	
};


