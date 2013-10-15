
document.addEventListener( 
		'EVS:CoreLoaded', 
		function()
		{
			// console.log( 'third' );

			require(
					[
						'3D/Ambience',
						'3D/Edge',
						'3D/Face',
						'3D/FaceLookup',
						'3D/FaceSortPile',
						'3D/Mesh',
						'3D/Scene',
						'3D/Vertex',

						'3D/Camera/Camera',
						'3D/Camera/MovableCamera',
						'3D/Camera/SimpleCamera',

						'3D/Factory/CuboidFactory',
						'3D/Factory/SphereFactory',
						'3D/Factory/TorusFactory',

						'3D/Light/Light',
						'3D/Light/LightData',
						'3D/Light/OmniLight',

						'3D/Material/Material',
						'3D/Material/SolidColorMaterial',
						
						'3D/Renderer/Renderer',
						'3D/Renderer/FlatRenderer',
						'3D/Renderer/FlatShaderRenderer',
						'3D/Renderer/GouraudShaderRenderer',
						'3D/Renderer/VertexRenderer',
						'3D/Renderer/WireframeRenderer'
					],

					function()
					{
						// console.log( 'fourth' );

						if( document.createEvent )
						{
							var event = document.createEvent( 'HTMLEvents' );
							event.initEvent( 'EVS:3DLoaded', true, true );
							document.dispatchEvent( event );
						}
						else
						{
							var event = document.createEventObject();
							document.fireEvent( 'onEVS:3DLoaded', event );
						}

					}
				);
		}
	);


require( 
	[
		'core-loader'
	]
);

