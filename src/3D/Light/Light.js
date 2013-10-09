

function Light()
{
	this.position = new Point3D;
}


Light.prototype = {
	
	
	/**
	 * @param {Vector3D} viewerDirection
	 * @param {Point3D} normal3DPosition
	 * @param {Vector3D} normal
	 * @param {LightData} targetLightData
	 */
	
	calculateLightData : function( viewerDirection, normal3DPosition, normal, targetLightData )
	{
		// do nothing
	}
	
};


