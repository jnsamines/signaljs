

// SignalJS - Implementación básica para el patrón publisher / suscriber
// Permite el uso del patrón publicador / suscriptor
var signal = {};

(function( exports ){

	// Componente principal de la aplicación, que permite manejar todas las funciones
	// utilitarias y propiedades del sistema.
	var component = {
		subscribers_by_topic : [],
		identifier : 0
	};


	// Función para adición de suscriptores a un tema en específico.
	// <param name="topic"> Tema al cual se va a realizar la suscripción. </param>
	// <param name="func"> Función de suscripción. </param>
	exports.subscribe = function( topic, func ){

		// se agrega el nuevo tema a la lista de suscripciones, si no ha sido agregado.
		if ( component.subscribers_by_topic[ topic ]  === undefined ){
			component.subscribers_by_topic[ topic ] = [];
		}

		// Para crear identificadores únicos por tema de suscripción,
		// se inicializa el campo "identifier" como la cantidad de suscriptores actuales
		component.identifier = component.subscribers_by_topic[ topic ].length;
		component.identifier++;

		// Se agrega la nueva suscripcion, a la lista de suscripcion del tema especificado.
		// se asigna tanto la función de notificación, como el identificador generado ( para posteriores suscripciones )
		component.subscribers_by_topic[ topic ].push({ signal : func, identifier : component.identifier })

		// Se devuelve el identificador generado.
		return component.identifier;
	};


	// Función para cancelar la suscripción a un tema específico.
	// <param name="topic"> Tema al cual se desea cancelar la suscripción. </param>
	// <param name="identifier"> Identificador de la suscripción. ( Este es generado al momento de realizar la suscripción al tema ). </param>
	exports.unsubscribe = function( topic , identifier ){
		
		// se obtiene la lista de suscriptores para el tema en específico.
		var subscribers = component.subscribers_by_topic[ topic ];

		// Si el tema de suscripción no existe, se devuelve falso
		if ( subscribers === undefined ){
			return false;
		}

		// se recorre la lista de suscripcion para el tema, para buscar el identificador proporcionado.
		for( var suscriptor = 0; suscriptor < subscribers.length ; suscriptor++ ){
			if ( subscribers[ suscriptor ].identifier === identifier ){
				subscribers.splice( suscriptor, 1 );
				return true;
			}
		}

		return false;
	};

	// Función para la publicación de una nueva notificación a un tema específico
	// <param name="topic"> Tema al cual se realizará la publicación. </param>
	// <param name="data"> Información pasada a través de la función de suscripción de un suscriptor. </param>
	exports.emit = function( topic, data ){

		// se obtiene la lista de suscriptores para el tema en específico.
		var subscribers = component.subscribers_by_topic[ topic ];

		// Se verifica que el tema al cual se realizará la publicación exista.
		if ( subscribers === undefined ){
			return;
		}

		// Se recorren todos los suscriptores encontrados para el tema
		for( var suscriptor = 0; suscriptor < subscribers.length; suscriptor ++){

			// se notifica a cada suscriptor acerca de la nueva publicación,
			// pasando la información especificada al suscritor.
			subscribers[ suscriptor ].signal( data );
		}

	};


})( signal );
