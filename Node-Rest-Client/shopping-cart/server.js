'use strict'
 
const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
 
const server = new Hapi.Server();
 
server.connection({
    host: '127.0.0.1',
    port: 3000
});
 
// Register vision for our views
server.register(Vision, (err) => {
    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: './views',
    });
});
 
server.start((err) => {
    if (err) {
        throw err;
    }
 
    console.log(`Server running at: ${server.info.uri}`);
});



server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        Request.get('http://localhost:8080/ShoppingCart/rest/shopping_carts', function (error, response, body) {
            if (error) {
                throw error;
            }
 
            const data = JSON.parse(body);
            reply.view('index', { result: data });
        });
    }
});



server.route({
    method: 'GET',
    path: '/shopping_carts/{id}',
    handler: function (request, reply) {
        const cartID = encodeURIComponent(request.params.id);
 
        Request.get(`http://localhost:8080/ShoppingCart/rest/shopping_carts/${cartID}/items`, function (error, response, body) {
            if (error) {
                throw error;
            }
 
				const data = JSON.parse(body);
                reply.view('items', { result: data, cartID : cartID });
            });
        
    }
});

server.route({
    method: 'GET',
    path: '/shopping_carts/delete/{id}',
    handler: function (request, reply) {
        const cartID = encodeURIComponent(request.params.id);
 
        Request.delete(`http://localhost:8080/ShoppingCart/rest/shopping_carts/${cartID}`, function (error, response, body) {
            if (error) {
			
                throw error;
            }
 
				const data = JSON.parse(body);
                reply.redirect('/');
            });
        
    }
});


server.route({
    method: 'GET',
    path: '/shopping_carts/add/{name}',
    handler: function (request, reply) {
        var name = encodeURIComponent(request.params.name);
		var postData ={
			name : "mitalNew"
		}
		
        Request.post('http://localhost:8080/ShoppingCart/rest/shopping_carts',postData,function (error, response,body) {
            if (error) {
			
                throw error;
            }
 
				//const data = JSON.parse(body);
                reply.redirect('/');
            });
        
    }
});


server.route({
    method: 'GET',
    path: '/shopping_carts/delete/item/{cartId}/{itemId}',
    handler: function (request, reply) {
        const cartID = encodeURIComponent(request.params.cartId);
		const itemID = encodeURIComponent(request.params.itemId);
 
        Request.delete(`http://localhost:8080/ShoppingCart/rest/shopping_carts/${cartID}/items/${itemID}`, function (error, response, body) {
            if (error) {
			
                throw error;
            }
 
				const data = JSON.parse(body);
                reply.redirect('/');
            });
        
    }
});



 

 