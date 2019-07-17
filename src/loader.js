
require.config(
		{
			paths	: {
					'jquery'	: '../vendor/js/jquery-1.10.2-min',
					'jqueryui'	: '../vendor/js/jquery-ui-1.10.4-min'
				},

			shim	: {
					'jquery'	: {
							exports : [ 'jquery', '$' ]
						},

					'jqueryui'	: {
							deps : [ 'jquery' ]
						}
				},

			baseUrl	: '../src'
		}
	);


