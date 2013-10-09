

require.config(
		{
			baseUrl	: '../src',
		}
);


require( 	
		[
			'Core/Helper'
		],
		
		function()
		{
			// console.log( 'first' );
			
			require(
					[
						'Core/CanvasTexture',
						'Core/CanvasTextureContainer',
						'Core/Color',
						'Core/Draw',
						'Core/Line',
						'Core/Matrix',
						'Core/Point2D',
						'Core/Point3D',
						'Core/Surface',
						'Core/Triangle',
						'Core/Vector3D'
					],

					function()
					{
						// console.log( 'second' );
						
						var event = new Event( 'EVS:CoreLoaded' );
						document.dispatchEvent( event );
					}		
				);
		}
	);



