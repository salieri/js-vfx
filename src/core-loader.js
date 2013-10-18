

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
			'Core/Color',
		],
		
		function()
		{
			require(
					[
						'Core/Vector3D',
					],
		
					function()
					{
						// console.log( 'first' );

						require(
								[
									'Core/BetterInterpolatedTriangle',
									'Core/BetterTriangle',
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
									'Core/TexturedTriangle',
									'Core/Triangle'
									//'Core/Vector3D'
								],

								function()
								{
									// console.log( 'second' );
									
									if( document.createEvent )
									{
										var event = document.createEvent( 'HTMLEvents' );

										event.initEvent( 'EVS:CoreLoaded', true, true );
										document.dispatchEvent( event );
									}
									else
									{
										var event = document.createEventObject();
										document.fireEvent( 'onEVS:CoreLoaded', event );
									}
								}		
							);
					}
				);
		}
	);



