
require.config(
		{
			paths	: {
					'jquery'	: 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
					'jqueryui'	: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min'
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


