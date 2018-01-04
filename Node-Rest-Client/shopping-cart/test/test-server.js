"use strict";

var chai = require('chai');  
var chaiHttp = require('chai-http');
var servertest = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Test Shopping Cart ', function() {  
    it('should list ALL carts on / GET', function() {
            chai.request('localhost:3000')  
			.get('/')
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				done();
			});
    });
	
    it('should List all items within cart /shopping_carts/<id> GET', function(){
			chai.request('localhost:3000')  
			.get('/shopping_carts/1')
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body[0].should.have.property('item_id');
				res.body[0].should.have.property('description');
				res.body[0].item_id.should.equal('9');
				res.body[0].description.should.equal('new item in one');
				done();
			});
	
	});
    
    it('should delete a SINGLE cart on /shopping_carts/<id> DELETE',function(){
			
					chai.request('localhost:3000')  
					.get('/shopping_carts/delete/5')
					.end(function(err, res) {
						  res.should.have.status(200);
						  res.should.be.json;
						  res.body.should.be.a('object');
						  res.body.should.have.property('status');
						  res.body.should.have.property('message');
						  res.body.status.should.equal('200');
						  res.body.message.should.equal('Cart Deleted Successfully');
						  done();
					});
			
	
	});
	
	it('should delete a SINGLE Item from cart on /shopping_carts/<cartID>/items/<itemId> DELETE',function(){
			
					chai.request('localhost:3000')  
					.get('/shopping_carts/delete/item/1/9')
					.end(function(err, res) {
						  res.should.have.status(200);
						  res.should.be.json;
						  res.body.should.be.a('object');
						  res.body.should.have.property('status');
						  res.body.should.have.property('message');
						  res.body.status.should.equal('200');
						  res.body.message.should.equal('Item Deleted Successfully');
						  done();
					});
			
	
	});
});