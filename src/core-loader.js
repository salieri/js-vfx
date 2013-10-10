

require.config(
		{
			baseUrl	: '../src',
		}
);


require( 	
		[
			'Core/Helper',
			'Core/Point2D',
			'Core/Point3D',
			'Core/Vector3D',
			'Core/Color',
		],
		
		function()
		{
			// console.log( 'first' );
			
			require(
					[
						'Core/CanvasTexture',
						'Core/CanvasTextureContainer',
						//'Core/Color',
						'Core/Draw',
						'Core/InterpolatedTriangle',
						'Core/Line',
						'Core/Matrix',
						'Core/NormalizedColor',
						// 'Core/Point2D',
						// 'Core/Point3D',
						'Core/Surface',
						'Core/Triangle',
						//'Core/Vector3D'
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



