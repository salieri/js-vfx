

var Helper = {
	
	/**
	 * @param {Event} event
	 * @param {string} elementID
	 * 
	 * @link http://stackoverflow.com/a/5932203/844771
	 * @author Ryan Artecona
	 */
	
	getCanvasCoordinates : function( event, elementID )
	{
		var totalOffsetX = 0;
		var totalOffsetY = 0;
		var canvasX = 0;
		var canvasY = 0;
		var element = Helper.getElement( elementID );

		do
		{
			totalOffsetX += element.offsetLeft - element.scrollLeft;
			totalOffsetY += element.offsetTop - element.scrollTop;
		}
		while( element = element.offsetParent )

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		return { x:canvasX, y:canvasY };
	},
	
	
	/**
	 * @param {string} elementType Type of element
	 * @param {string} elementID Optional element ID
	 * @returns {Element}
	 */
	
	createElement : function( elementType, elementID )
	{
		var element = document.createElement( elementType );
		
		if( elementID )
		{
			element.setAttribute( 'id', elementID );
		}
		
		return element;
	},
	
	
	/**
	 * @param {string} elementID Element ID
	 */
	
	getElement : function( elementID )
	{
		return document.getElementById( elementID );
	}
	
	
};
