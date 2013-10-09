
/**
 * Triad face
 * 
 * @param {int} a
 * @param {int} b
 * @param {int} c
 * @param {Material} material
 * @returns {Face}
 */

function Face( a, b, c, material )
{
	this.a	= a;
	this.b	= b;
	this.c	= c;
	
	this.material		= material || new SolidColorMaterial();
	this.normal			= new Vector3D();
	this.position		= new Point3D();	
	this.lightData		= new LightData();
}


Face.prototype = {	
	
	
	
};

