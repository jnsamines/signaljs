
// Object.Signal - Implementación de publicador/suscriptor sobre extensión en objetos.
// Permite detectar cambios en objetos


( function( signal ){

	// Se verifica que signal haya sido incluido
	if ( window.signal == undefined ) {
		return;
	}


	// Componente principal de opciones
	var component = {};

	// Eventos soportados
	component.events = {
		onChange : "change"
	};


	window.Entity = function(){};

	// Se extiende la clase Entity, para permitir observar sus propiedades
	// se agregan metodos para establecer y obtener cada una de las propiedades
	Entity.prototype.set = function( properties , values ){

		// se verifica el valor de values, si values === undefined
		// entonces quiere decir, que se usó el setter por objeto,
		// por lo que se busca a través de cada propiedad indicada.
		if ( values === undefined ){

			for( var prop in properties ){
				// Se establece el nuevo valor para una propiedad,
				// si esta ha sido predefinida originalmente.
				if( this[prop] !== undefined ){
					// emitir evento de cambio de valor
					signal.emit( component.events.onChange + ":" +  prop, { old : this[prop], "new" : properties[prop] });
					this[prop] = properties[prop];
				}
			}
		// de lo contrario se asume, que se usa el setter simple, por lo que solo se busca
		// la propiedad en concreto indicada
		}else{

			if ( this[properties] !== undefined ){
				// emitir evento de campo de valor
				signal.emit( component.events.onChange + ":" +  properties, { old : this[properties], "new" : values });
				this[properties] = values;
			}
		}

		return this;
	};


})( signal );




