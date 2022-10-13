'use strict';
const fs = require('fs');
var Accounts = require('web3-eth-accounts');
var Web3 = require('web3')
var Eth = require('web3-eth');
// const db = require("../db");
const {connectDB, closeDB} = require('../db');

const controller = {};

//testnet
//var web3=new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
//binance smart chain
var web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

controller.w_login = (req, res) => {

	const db = connectDB();
	
	db.query('SELECT * FROM w_users',[] , function(err,results)
	{
		closeDB(db);

		if(err) {
			res.json({
				success: -1
			});
			return;
		}
		
		var ok = -1;
		var user = {};
		results.map((r) => {
			if(r.address == req.body.address )
			{
				ok = 1;
				user.id = r.id;
				user.name = r.username;
				user.score = r.score;
			}

		});
		if(ok == 1)
		{
			res.json({
				success: 1,
				data: user
			});
		}
		else
		{
			res.json({
				success: -1
			});
		}

		
	});

};

controller.w_signup = (req, res) => {
	var ok = 1;
	var user = {};

	const db = connectDB();

	db.query('SELECT * FROM w_users',[] , function(err,results)
	{
		if (err) {
			ok = -1;
		} else if (results.length > 0) {
			results.map((r) => {
				if(r.username == req.body.username )
				{
					ok = -1;
					console.log("username exist");
				}
	
			});
		}
		
		if(ok!=1){
			closeDB(db);
			res.json({
				success: -2
			});
		}
		else{
			
			var account=web3.eth.accounts.create();
			console.log("signup");
			db.query("INSERT INTO w_users (username, password,address,private_key) VALUES ('" + req.body.username + "', '" + req.body.password +"','"+account.address+"','"+account.privatekey+"')" , function(error, r) {
							
				if(err) {
					closeDB(db);

					res.json({
						success: -1
					});
				}
				else {
					db.query('SELECT * FROM w_users',[] , function(err,results)
					{
						closeDB(db);

						results.map((r) => {
							if(r.address == req.body.address )
							{
								ok = 1;
								user.id = r.id;
								user.name = r.username;
								user.score = r.score;
							}
				
						});
						res.json({
							success: 1,
							data: user
						});

						
					});
				}
			});
		}

		
	});
}

controller.login = (req, res) => {
	const db = connectDB();
	
	db.query('SELECT * FROM w_users',[] , function(err,results)
	{
		if(err) {
			res.json({
				success: -1
			});
			return;
		}
		
		var ok = -1;
		var user = {};
		results.map((r) => {
			if(r.username == req.body.username && r.password == req.body.password)
			// if(r.username == req.query.username && r.password == req.query.password)
			{
				ok = 1;
				user.id = r.id;
				user.name = r.username;
				user.score = r.score;
				user.address = r.address;
			}

		});
		if(ok == 1)
		{
			res.json({
				success: 1,
				data: user
			});
		}
		else
		{
			res.json({
				success: -1
			});
		}
	});

};

controller.signup = (req, res) => {
	const db = connectDB();
	
	db.query("SELECT * FROM w_users WHERE username = '" + req.body.username + "'" , function(err, results)
	{
		if(err) {
			res.json({
				success: -1
			});
		} else {
			console.log(results);
			if (results.length > 0) {
				res.json({
					success: 0
				});
			} else {
				const account = web3.eth.accounts.create();
				console.log("signup");
				db.query("INSERT INTO w_users (username, password,address,private_key) VALUES ('" + req.body.username + "', '" + req.body.password +"','"+account.address+"','"+account.privateKey+"')" , function(error, r) {
						if(err) {
						res.json({
							success: -1
						});
					}
					else {
						res.json({
							success: 1
						});
					}
				});
			}
		}
		
	});

};

controller.savegame = (req, res) => {
	let userId = req.body.userId;
	let saveName = req.body.saveName;
	let fen = req.body.fen;

	const db = connectDB();

	db.query("DELETE FROM chess_save WHERE userId = '" + userId + "'");

	db.query("INSERT INTO chess_save (userId, name, fen) VALUES ('" + userId + "', now(), '" + fen + "')" , function(error, r) {
		if(error) res.json(error);
		else {
			res.json({
				success: 1,
			});
		}
	});

};

controller.getSavedGame = (req, res) => {
	let userId = req.body.userId;

	const db = connectDB();

	db.query("SELECT name, fen FROM chess_save WHERE userId = '" + userId + "' ORDER BY name DESC", function(err, results) {
		console.log("GetSavedGames : userId " + userId);
		console.log(results);

		let savedGames = [];
		if(err) {
			res.json({
				savedGames: []
			});
			return;
		} 
		
		results.map((r) => {
			savedGames.push({
				name: r.name,
				fen: r.fen
			});
		});

		res.json({
			savedGames: savedGames
		});
		
	});

};

module.exports = controller;
