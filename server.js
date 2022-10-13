const path = require("path");

// const  mysql = require("mysql");

const myConnection = require("express-myconnection");
const routes = require('./routes/myroutes');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var cors = require('cors');
const util = require( 'util' );

var server = require('http').createServer(app);
var port = process.env.PORT || 3001;
var io = require('socket.io')(server);

// const connection = require("./db");
const {connectDB, closeDB} = require('./db');
const { debug, Console } = require("console");
var Accounts = require('web3-eth-accounts');
var Web3 = require('web3');
var Eth = require('web3-eth');
const EthereumTx = require('ethereumjs-tx');
const axios = require('axios');

//testnet
//var web3=new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
//binance smart chain

const testnet = `https://kovan.infura.io/v3/855cd4346ed04488ad9693e3bc5ee65a`;

// var web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
var web3 = new Web3(new Web3.providers.HttpProvider(testnet));


// var BEP20ABI = [
//       {
//         "inputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "owner",
//             "type": "address"
//           },
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "value",
//             "type": "uint256"
//           }
//         ],
//         "name": "Approval",
//         "type": "event"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "previousOwner",
//             "type": "address"
//           },
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "newOwner",
//             "type": "address"
//           }
//         ],
//         "name": "OwnershipTransferred",
//         "type": "event"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "from",
//             "type": "address"
//           },
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "to",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "value",
//             "type": "uint256"
//           }
//         ],
//         "name": "Transfer",
//         "type": "event"
//       },
//       {
//         "constant": true,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "owner",
//             "type": "address"
//           },
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           }
//         ],
//         "name": "allowance",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "approve",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "account",
//             "type": "address"
//           }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "decimals",
//         "outputs": [
//           {
//             "internalType": "uint8",
//             "name": "",
//             "type": "uint8"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "subtractedValue",
//             "type": "uint256"
//           }
//         ],
//         "name": "decreaseAllowance",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "getOwner",
//         "outputs": [
//           {
//             "internalType": "address",
//             "name": "",
//             "type": "address"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "addedValue",
//             "type": "uint256"
//           }
//         ],
//         "name": "increaseAllowance",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "mint",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//           {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "owner",
//         "outputs": [
//           {
//             "internalType": "address",
//             "name": "",
//             "type": "address"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [],
//         "name": "renounceOwnership",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//           {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "recipient",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "transfer",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "sender",
//             "type": "address"
//           },
//           {
//             "internalType": "address",
//             "name": "recipient",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "transferFrom",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "newOwner",
//             "type": "address"
//           }
//         ],
//         "name": "transferOwnership",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       }
//     ];

var BEP20ABI=  [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "baseURI",
        "type": "string"
      }
    ],
    "name": "BaseURIChange",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ItemCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "_INTERFACE_ID_ERC721_VERIFY_FINGERPRINT",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_metaDataURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_metaData",
        "type": "string"
      }
    ],
    "name": "create",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_metaDataURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_metaData",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_marketplace",
        "type": "address"
      }
    ],
    "name": "createPub",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "createrOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creaters",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "extraInfoMap",
    "outputs": [
      {
        "internalType": "string",
        "name": "metaDataURI",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "metaDataHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_metaData",
        "type": "string"
      }
    ],
    "name": "getMetaDataHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenMetaData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_fingerprint",
        "type": "bytes32"
      }
    ],
    "name": "verifyFingerprint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

var tokenAddress = "0xCF4eAD60198D7Ca75E69FC985ca38e983c48311B";

var myContract = new web3.eth.Contract(BEP20ABI, tokenAddress);

// var port = process.env.PORT || 3000,
 //   io = require('socket.io')(port),
    gameSocket = null;

    // global variables for the server
var enemies = [];
var playerSpawnPoints = [];
var clients = []; // Store Client list
var sockets = {};

var rooms = {};
var joinedRooms = {};
var challengeRooms = {};
var users = [];
const getUserName = (socket) => {
  var res = "";
  users.map((user, index) => {
    if (sockets[user.id] == socket) {
      res = user.name;
      return user.name;
    }
  });

  return res;
 };


const withdraw = () => {
  
}

const makeDb = (connection) => {
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}


const getRooms = () => {
  var res = [];

  	for(var id in rooms)
  	{
      if ((joinedRooms.hasOwnProperty(rooms[id].id) && joinedRooms[rooms[id].id]) || (challengeRooms.hasOwnProperty(rooms[id].id) && challengeRooms[rooms[id].id]) ) {
        continue;
      }

  		var element = {};
  		element.id = rooms[id].id;
      element.name = rooms[id].name;
      element.amount = rooms[id].amount;
  		res.push(element); 
  	}

    console.log("*** Created Rooms");
    console.log(res);

    return res;
 };

const joinRoom = (socket, room) => {
  rooms[room.id].sockets.push(socket);
  socket.join(room.id, () => {
    // store the room id in the socket for future use
    socket.roomId = room.id;
    console.log(socket.id, "Joined", room.id);
   
      
    if(room.sockets.length == 2)
    {
      deleteChallengeRoomDB(room);

      joinedRooms[room.id] = true;

      socket.broadcast.emit('show room', {rooms: getRooms()});

      rooms[room.id].sockets.map((s, index) => {
          s.emit("gameTurn", {turn: index + 1, playing: 2, otherName: getUserName(rooms[room.id].sockets[1 - index])
          });
     
        });

        
      //socket.emit("gameTurn", {turn: 2, playing: 1});
    }
  });
};

const leaveRooms = (socket) => {
  const roomsToDelete = [];
  for (const id in rooms) {
    const room = rooms[id];
    // check to see if the socket is in the current room
    if (room.sockets.includes(socket)) {
      socket.leave(id);
      // remove the socket from the room object
      room.sockets = room.sockets.filter((item) => item !== socket);
    }
    // Prepare to delete any rooms that are now empty
    if (room.sockets.length == 0) {
      roomsToDelete.push(room);
    }
  }

  // Delete all the empty rooms that we found earlier
  for (const room of roomsToDelete) {
    delete rooms[room.id];
  }
};

const deleteRoom = (room) => {
  joinedRooms[room.id] = false;
  challengeRooms[room.id] = false;

  for(const id in rooms) {
      
    if(room.id ==  id) {
        delete rooms[id];   
        console.log("deleted");   
    }
  }
}

const deleteChallengeRoomDB = (room) => {
  const connection = connectDB();
  const db = makeDb(connection);

  db.query("DELETE FROM chess_challenges WHERE roomId = '" + room.id + "'");
}

const getChallenge = async (user) => {
  var res = [];

  const connection = connectDB();
  const db = makeDb(connection);

  const rows = await db.query("SELECT fromUserId, score, toUserId, status, roomId,challenge_amount FROM chess_challenges WHERE fromUserId = '" + user.id + "' OR toUserId = '" + user.id + "' ORDER BY timestamp DESC");
  let hasNotifications = 0;
  let flag = {};

  flag[user.id] = true;

  // console.log("Socket : ");
  // console.log(sockets);

  for ( let row of rows) {
  //rows.map((row) => {
    
    console.log("row : ");
    console.log(row);
    var score;

    let fromName = user.name;
    let toName = user.name;
    let userRow = []; 

    flag[row.fromUserId] = true;
    flag[row.toUserId] = true;

    if (row.fromUserId == user.id) {

      userRow = await db.query("SELECT username FROM w_users WHERE id = '" + row.toUserId + "'");
      
      if (userRow.length == 0) {
        continue;
      }
      
      toName = userRow[0].username;
      // if the other player was accepted
      if (row.status == 1) {
        if (!sockets.hasOwnProperty(row.toUserId)) continue;
        
        hasNotifications = 1;
      } else {
        
      }
    } else {
      
      // if (!sockets.hasOwnProperty(row.fromUserId)) continue;

      userRow = await db.query("SELECT username,score FROM w_users WHERE id = '" + row.fromUserId + "'");
      if (userRow.length == 0) {
        continue;
      }
      fromName = userRow[0].username;
      score= userRow[0].score.toString();
      // if a new challenge was received
      if (row.status == 0) {
        
        hasNotifications = 1;
      }

      console.log("*******notifications : " + hasNotifications);
    }
    
    

    res.push({
      fromUserId: row.fromUserId,
      fromUserName: fromName,
      toUserId: row.toUserId,
      score: score,
      room_amount:row.challenge_amount,
      toUserName: toName,
      status: row.status,
      roomId: row.roomId
    });
  }
  console.log("USERS SORT");
  users.sort(function(a,b){return a.score>b.score;});
  for (const user of users) {

    if (flag.hasOwnProperty(user.id) && flag[user.id]) {
      continue;
    }

    res.push({
      fromUserId: "",
      fromUserName: "",
      toUserId: user.id,
      toUserName: user.name,
      score: user.score.toString(),
      room_amount:"0",
      status: -1,
      roomId: ""
    });
  }
  //});

  return {notification: hasNotifications, challenges: res};
}
const checkScore = (room, sendMessage = false) => {
  let winner = null;
  for (const client of room.sockets) {
    if (client.score >= NUM_ROUNDS) {
      winner = client;
      break;
    }
  }

  if (winner) {
    if (sendMessage) {
      for (const client of room.sockets) {
        client.emit('gameOver', client.id === winner.id ? "You won the game!" : "You lost the game :(");
      }
    }

    return true;
  }

  return false;
};




const beginRound = (socket, id) => {
  // This is a hack to make sure this function is only being called once during
  // game play. Basically, the client needs to send us the
  if (id && socket.id !== id) {
    return;
  }

  // Get the room
  const room = rooms[socket.roomId];
  if (!room) {
    return;
  }

  // Make sure to cancel the 20 second lose round timer so we make sure we only
  // have one timer going at any point.
  if (room.timeout) {
    clearTimeout(room.timeout);
  }

  // If we've already found a game winner, we don't need to start a new round.
  if (checkScore(room)) {
    return;
  }

  // the different potential spawning positions on the game map. measured in meters.
  let positions = [
    {x: 8, y: 8},
    {x: 120, y: 8},
    {x: 120, y: 120},
    {x: 8, y: 120}
  ];
  // Shuffle each position... we're going to use some clever trickery to
  // determine where each player should be spawned. Using lodash for the the shuffle
  // functionality.
  positions = _.shuffle(positions);

  // isIt will represent the new socket that will be considered to be "IT"
  let isIt = null;
  // This is going to be a dictionary that we're going to send to every client.
  // the keys will represent the socket ID and the values will be another dictionary
  // that will represent each player.
  
  const output = {};

  // We're going to loop through each player in the room.
  for (const client of room.sockets) {
    // here is the trickery. We're just going to get the last object in the positions
    // array to get the position for this player. Now there will be one less choice in
    // in the positions array.
    const position = positions.pop();
    client.x = position.x;
    client.y = position.y;
    // if the player was already it, we don't want to make them it again.
    if (client.isIt) {
      // the player won the round! increment their score.
      client.score = id ? client.score + 1 : client.score;
      client.isIt = false;
    }
    // we're going to use lodash's handy isEmpty check to see if we have an IT socket already.
    // if we don't mark the current player as it! mark the as not it just in case.
    else if (_.isEmpty(isIt)) {
      client.isIt = true;
      isIt = client;
    } else {
      client.isIt = false;
    }

    // this is the sub dictionary that represents the current player.
    output[client.id] = {
      x: client.x,
      y: client.y,
      score: client.score,
      isIt: client.isIt
    }
  }

  // After all that madness, check if we have a game winner! If we do, then
  // just return out.
  if (checkScore(room, true)) {
    return;
  }

  // Tell all the players to update themselves client side
  for (const client of room.sockets) {
    client.emit('checkifit', output);
  }

  // Start the round over if the player didn't catch anyone. They've lost the round
  // so decrement their score :(. Note that setTimeout is measured in milliseconds hence
  // the multipication by 1000
  room.timeout = setTimeout(() => {
    if (isIt) {
      isIt.score = isIt.score - 1;
    }
    beginRound(socket, null);
  }, 20 * 1000);

};







// Allow express to serve static files in folder structure set by Unity Build
//app.use("/TemplateData",express.static(__dirname + "/TemplateData"));
//app.use("/Release",express.static(__dirname + "/Release"));

// app.use(myConnection(mysql, {
// 	host: 'localhost',
// 	user: 'root',
// 	password: '',
// 	port: 3306,
// 	database: 'annancsh_mygame'


// }));



//app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.use('/api', routes);
//app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname));
app.use("/TemplateData",express.static(__dirname + "/TemplateData"));
app.use("/Build",express.static(__dirname + "/Build"));
app.get('/',function(req, res)
        {
            res.sendFile(__dirname + '/index.html');
        }); 


// Start server
// server.listen(port);
server.listen(port, function(){
	console.log('listening on *:' + port + '  \n --- server is running ...');
});


// Redirect response to serve index.html
  
// Implement socket functionality
gameSocket = io.on('connection', function(socket){

// #################################



 socket.on('ready', () => {
    console.log(socket.id, "is ready!");
    const room = rooms[socket.roomId];
    // when we have two players... START THE GAME!
    if (room.sockets.length == 2) {
      // tell each player to start the game.
      for (const client of room.sockets) {
        client.emit('initGame');
      }
    }
  });


 socket.on('deleteRoom', (room) => {

    console.log(rooms);
    
    joinedRooms[room.id] = false;

    for(const id in rooms)
    {
        if(room.id ==  id)
        {
          delete rooms[id];   
          console.log("deleted");   
        }
    }
    deleteRoom(room);

    // if the room is a challenge room
    deleteChallengeRoomDB(room);

    socket.broadcast.emit('show room', {rooms: getRooms()});
    
 });


 socket.on('give up', (room) => {
  for (var sock of rooms[room.id].sockets) {
    //room.name : turn for WHITE and BLACK
    sock.emit('gave up', {turn: room.name});
    
  }
 });

 socket.on('increaseScore', (user) => {
   console.log("increase score");
  const connection = connectDB();
  const db = makeDb(connection);
  for (const c_user of users)
    if(c_user.id==user.id)
      c_user.score=user.score;
  db.query("UPDATE w_users SET score = '" + user.score + "' WHERE id = '" + user.id + "'");
  closeDB();
 });
  
		  

 socket.on('set winner', (user) => {
    console.log("set winner");
    var id = user.address;
    //for (var id in rooms) {

  if (rooms.hasOwnProperty(id)) {
    rooms[id].sockets.map(async (s, index) => {
      if (s != socket) {
          otherplayername = getUserName(rooms[id].sockets[index]);
          
          console.log(otherplayername, user.name);
          const connection = connectDB();
          const db = makeDb(connection);
          var looser_account=await db.query("select address,private_key from w_users WHERE username = '" + otherplayername + "'");
          var winner_account=await db.query("select address,private_key from w_users WHERE username = '" + user.name + "'");
          var admin_account=await db.query("select address,private_key from w_users WHERE username = '" + "admin" + "'");
          
          
          var winner_amount = parseFloat(rooms[id].amount) * 0.9;
          var admin_fee = parseFloat(rooms[id].amount) * 0.1;
          const gasLimitHex = web3.utils.toHex(90000);
          console.log(winner_amount)


          //send to winner
      // transaction
      let data =await myContract.methods.transfer(winner_account[0].address, web3.utils.toHex(web3.utils.toWei(winner_amount.toString()))).encodeABI();

      // transection
      web3.eth.getTransactionCount(looser_account[0].address).then(function (lastCountOfTransaction) {
      console.log(data);
      var txdetail = {
        "nonce":'0x' + lastCountOfTransaction.toString(16),
        "to": tokenAddress,
        "value": web3.utils.toHex(web3.utils.toWei("0")),
        "gas": gasLimitHex,
        "gasPrice": web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        "data":data
      }

      const privateKey1Buffer = new Buffer.from(looser_account[0].private_key.slice(2), 'hex')

      console.log("privateKey1Buffer : ", looser_account[0].address);
      const transaction = new EthereumTx(txdetail);
      transaction.sign(privateKey1Buffer);
      const serializedTransaction = transaction.serialize();
    
      console.log("serializedTransaction : ", serializedTransaction);
      try {
        web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
          .on('receipt',async (res) => { console.log("result : ", res); 
        //pay_fee
        console.log("pay fee"); 
        data =await myContract.methods.transfer(admin_account[0].address, web3.utils.toHex(web3.utils.toWei(admin_fee.toString()))).encodeABI();
        web3.eth.getTransactionCount(looser_account[0].address).then(function (lastCountOfTransaction) {
        console.log(data);
        var txdetail = {
          "nonce":'0x' + lastCountOfTransaction.toString(16),
          "to": tokenAddress,
          "value": web3.utils.toHex(web3.utils.toWei("0")),
          "gas": gasLimitHex,
          "gasPrice": web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
          "data":data
        }

        const privateKey1Buffer = new Buffer.from(looser_account[0].private_key.slice(2), 'hex')

        console.log("privateKey1Buffer : ", looser_account[0].address);
        const transaction = new EthereumTx(txdetail);
        transaction.sign(privateKey1Buffer);
        const serializedTransaction = transaction.serialize();
      
        console.log("serializedTransaction : ", serializedTransaction);
        try {
          web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
            .on('receipt', (res) => { console.log("result : ", res); });
        }
        catch (e) {
          console.log("sendSignedTransaction error : ", e);
        }
    });
      });
      }
      catch (e) {
        console.log("sendSignedTransaction error : ", e);
      }
      });
   
      }

        if (index == 1) {
          deleteRoom(id);
        }
      })
    }
  });

  //get balance
  //if it not has enough BNB transfer BNB to wallet
  socket.on('get balance', (user) => {
    console.log('get balance ' + user.address);
   
    //get token balance
    getBalance(user.address).then(function (token_balance) {
      var wallet_balace = web3.utils.fromWei(token_balance);
      console.log("BEP20 balance : ", wallet_balace);

      //get BNB balance
      web3.eth.getBalance(user.address, function (error, balance) {
        if (!error) {
        
        console.log("get balance" + balance);//Will give value in.
        var wallet = web3.utils.fromWei(balance);
        console.log("sent wallet" + wallet);

        //transfer BNB
        if (wallet < 0.001&&wallet_balace>0) {
          
          getAdmin().then(function (admin_account) {
            console.log("admin_account : ", admin_account);
          bnb_transaction(admin_account[0], user.address, 0.002);
          });
        }
       // socket.emit('sent balance', { balance: wallet });
      }
      else console.log(' we have a problem: ', error);
    });
      socket.emit('sent balance', { balance: wallet_balace });
    })

  });

  async function getAdmin() {
    const connection = connectDB();
    const db = makeDb(connection);
    var admin_account=await db.query("select address,private_key from w_users WHERE username = '" + "admin" + "'");
    closeDB();
    return admin_account;
  }

  async function getBalance(walletAddress) {
    var balance = await myContract.methods.balanceOf(walletAddress).call();
    return balance;
  }

  



  //widthraw
  socket.on('withdraw',async (widthraw)  => {
    console.log('withdraw : ', widthraw);

    const connection = connectDB();
    const db = makeDb(connection);

    var accounts=await db.query("select address,private_key from w_users WHERE id = '" + widthraw.id + "'");
    closeDB();

    var send_account = web3.eth.accounts.privateKeyToAccount(accounts[0].private_key);
    var amount = widthraw.amount.toFixed(6);
    
    console.log('from address : ', accounts[0].private_key);
    console.log('to address : ', widthraw.toaddress);
    
    const gasPrice =30;
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(90000);

    console.log('gasPrice : ' + gasPrice + " : ", amount);
    
    // transaction
    let data =await myContract.methods.transfer(widthraw.toaddress, web3.utils.toHex(web3.utils.toWei(amount.toString()))).encodeABI();

    // transection
    web3.eth.getTransactionCount(accounts[0].address).then(function (lastCountOfTransaction) {
      console.log(data);
      var txdetail = {
        "nonce":'0x' + lastCountOfTransaction.toString(16),
        "to": tokenAddress,
        "value": web3.utils.toHex(web3.utils.toWei("0")),
        "gas": gasLimitHex,
        "gasPrice": web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        "data":data
      }

      const privateKey1Buffer = new Buffer.from(accounts[0].private_key.slice(2), 'hex')

      console.log("privateKey1Buffer : ", privateKey1Buffer);
      const transaction = new EthereumTx(txdetail);
      transaction.sign(privateKey1Buffer);
      const serializedTransaction = transaction.serialize();
    
      console.log("serializedTransaction : ", serializedTransaction);
      try {
        web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
          .on('receipt', (res) => { console.log("result : ", res); });
      }
      catch (e) {
        console.log("sendSignedTransaction error : ", e);
      }
    });

  })
  
  socket.on('get transactions',async (user) => {
    console.log('get balance ' + user.address);
    
    //https://api.etherscan.io/api?module=account&action=txlist&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken
    //https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=0x53854DfF58b78e7E0c1BD86dD18980e28038f695&address=0x1213556B2F0a0Db1eAA8DE9E3FfF574E63700115&blockno=4000000&apikey=YACI5FBNF39PI3FD7ZVWRWFFCAH6RAVY7W
    const res = await axios.get(`https://api.bscscan.com/api?module=account&action=tokentx&address=${user.address}&contractAddress=${tokenAddress}&startblock=0&endblock=99999999&sort=asc&apikey=YACI5FBNF39PI3FD7ZVWRWFFCAH6RAVY7W`);
    
    //console.log(res.data);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    var txlist = [];
    for (var tx of res.data.result) {
      var date = new Date(tx.timeStamp* 1000);
      //console.log(date);
      console.log("from : " + tx.to, " user address " + user.address);
      if(tx.to.toLowerCase()!=user.address.toLowerCase())
        txlist.push({ date: months[date.getMonth()]+" "+date.getDate(), address: tx.to, amount: "-"+web3.utils.fromWei(tx.value).toString() })
      else
        txlist.push({ date:months[date.getMonth()]+" "+date.getDate(), address: tx.from, amount: web3.utils.fromWei(tx.value).toString()})
    }
    console.log(txlist);

    socket.emit("show transaction",{transactions:txlist});  
  })

  //BNB transaction
  const bnb_transaction = (from, toaddress, amount) => {
    
    console.log("bnb transaction : ", from + " " + toaddress);
      web3.eth.getTransactionCount(from.address).then(function (lastCountOfTransaction) {
            
              const gasLimitHex = web3.utils.toHex(21000);
              console.log(lastCountOfTransaction);
              var txdetail = {
                "nonce":'0x' + lastCountOfTransaction.toString(16),
                "to": toaddress,
                "value": web3.utils.toHex(web3.utils.toWei(amount.toString())),
                "gas": gasLimitHex,
                "gasPrice": web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
              }

            console.log("gasfee : ",web3.utils.toWei('30', 'gwei'));
            console.log("amount : ",web3.utils.toWei(amount.toString()));

            if (parseFloat(web3.utils.toWei(amount.toString())) < parseFloat(web3.utils.toWei('30', 'gwei'))){
              
            console.log("gasfee : ",web3.utils.toWei('30', 'gwei'));
            console.log("amount : ",web3.utils.toWei(amount.toString()));
            console.log("result : ",web3.utils.toWei(amount.toString()) < web3.utils.toWei('30', 'gwei'));
              return;
              }
            
            const privateKey1Buffer = new Buffer.from(from.private_key.slice(2), 'hex')

            console.log("privateKey1Buffer : ", privateKey1Buffer);
            const transaction = new EthereumTx(txdetail);
            transaction.sign(privateKey1Buffer);
            const serializedTransaction = transaction.serialize();
          
            console.log("serializedTransaction : ", serializedTransaction);
            try {
              web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
                .on('receipt', (res) => { console.log("result : ", res); });
            }
            catch (e) {
              console.log("sendSignedTransaction error : ", e);
            }
          });
       
  }

  

  socket.on('get room list' , (user) => {
  	// Emit room
  	console.log("Get Room List : ");
    console.log(user);

    sockets[user.id] = socket;
    
    const found = users.some(el => el.id == user.id);
    if (!found) users.push({ id: user.id, name: user.name, score: user.score });
  	
    socket.emit('show room', {rooms: getRooms()});

    socket.broadcast.emit("got challenge notifications", {notification: 1});
    
  });

  

  socket.on('get user list' , (user) => {
  	// Emit room
  	console.log("Get User List : " + user);

    socket.emit('show users', {users: users});
    
  });

  

  socket.on('startGame', (data, callback) => {
    const room = rooms[socket.roomId];
    if (!room) {
      return;
    }
    const others = [];
    for (const client of room.sockets) {
      client.x = 0;
      client.y = 0;
      client.score = 0;
      if (client === socket) {
        continue;
      }
      others.push({
        id: client.id,
        x: client.x,
        y: client.y,
        score: client.score,
        isIt: false,
      });
    }

    // Tell the client who they are and who everyone else is!
    const ack = {
      me: {
        id: socket.id,
        x: socket.x,
        y: socket.y,
        score: socket.score,
        isIt: false,
      },
      others
    };

    callback(ack);

    // Start the game in 5 seconds
    setTimeout(() => {
      beginRound(socket, null);
    }, 5000);
  });



  socket.on('createRoom', (roomName) => {
    console.log('create Room',roomName.amount);
    const room = {
      id: guid(), // generate a unique id for the new room, that way we don't need to deal with duplicates.
      name: roomName.name,
      amount:roomName.amount,
      sockets: []
    };
    rooms[room.id] = room;
    console.log(rooms);
    // have the socket join the room they've just created.
   // joinRoom(socket, room);
    socket.emit('createdRoom', room);

    socket.broadcast.emit('show room', {rooms: getRooms()});

  });


    socket.on('joinRoom', (r) => {

      console.log("join room" , r);
      if (!rooms.hasOwnProperty(r.id)) {
        deleteChallengeRoomDB(r);
        return;
      }
      const room = rooms[r.id];
      joinRoom(socket, room);
    
  });


  socket.on('send message',(message)=>{
    console.log(socket.id, "send message"+message.message);
    for (var sock of rooms[message.id].sockets) { 
        sock.emit('sent message', {name:message.username,message: message.message});
    }
  });

  socket.on('invite a challenge', (req) => {
    console.log("invite a challenge : ");
    const connection = connectDB();
    const db = makeDb(connection);

    db.query("INSERT INTO chess_challenges (fromUserId,score, toUserId,challenge_amount) VALUES ('" + req.users[0].id + "', " + "'"+req.users[0].score+"','" + req.users[1].id +"','" + req.users[2].name+ "')");

    //sockets[users[1].id].emit('received a challenge', {user: users[0]});
    if (sockets.hasOwnProperty(req.users[1].id)) {
      sockets[req.users[1].id].emit('got challenge notifications', {notification: 1});
    }

    getChallenge(req.users[0]).then((res) => {
      
      socket.emit("show challenges", {challenges: res.challenges});
    });
  });

  // Accept the challenge
  socket.on('createChallenge', (req) => {
    console.log('create a challenge room');
    const room = {
      id: guid(), // generate a unique id for the new room, that way we don't need to deal with duplicates.
      name: "challenge room",
      amount: req.users[2].name,
      sockets: []
    };
    rooms[room.id] = room;
    challengeRooms[room.id] = true;
    
    const connection = connectDB();
    const db = makeDb(connection);

    db.query("UPDATE chess_challenges SET status = '1', roomId = '" + room.id + "' WHERE fromUserId = '" + req.users[0].id + "' AND toUserId = '" + req.users[1].id + "'");
    // have the socket join the room they've just created.
   // joinRoom(socket, room);
    socket.emit('createdRoom', room);

    if (sockets.hasOwnProperty(req.users[0].id)) {
      sockets[req.users[0].id].emit('got challenge notifications', {notification: 1});
    }
    
  });
  
  // Start the challenge
  socket.on('startChallenge', (r) => {
    console.log('Start the challenge');
    
    deleteChallengeRoomDB(r);

    if (!rooms.hasOwnProperty(r.id)) {
      return;
    }
    const room = rooms[r.id];
    joinRoom(socket, room);

  });

  // Exit the challenge
  socket.on('exitChallenge', (r) => {
    console.log('Exit the challenge');
    
    deleteChallengeRoomDB(r);
    deleteRoom(r);
  });
  // Get challenges

  socket.on('get challenges', (user) => {
    console.log("Get challenges");
    
    getChallenge(user).then((res) => {
      console.log(res);

      socket.emit("got challenge notifications", {notification: res.notification});
      
      socket.emit("show challenges", {challenges: res.challenges});
    });
    
  });

  
  socket.on('leaveRoom', () => {
    leaveRooms(socket);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
    for (var id in rooms) {
      rooms[id].sockets.map((s, index) => {
        if (s == socket) {
          for (var sock of rooms[id].sockets) {
            if (sock != socket) {
              sock.emit('other disconnected');
            }
          }
        }
      });
    }

    leaveRooms(socket);
    for(var id in sockets) {
      if(sockets.hasOwnProperty(id) && sockets[id] == socket) {
          delete sockets[id];
      }
    }
  });

    var currentPlayer = {};
	  currentPlayer.name = 'unknown';
    
    console.log('socket connected: ' + socket.id);
    
    socket.emit('connected', {});



	/////////////////////////////////



	//sockets.push(socket)

	socket.on('click', function(data) {
		console.log('clicked   == ' + data.index + (data.turn == 0 ? "White" : "Black") );
    rooms[data.roomId].sockets.map((s, index) => {
      if(socket !== s) {
        s.emit('other player turned', data);
      }
    });
		// sockets.map( (s) => {
		// 	if(socket !== s)
		// 	{
		// 		s.emit('other player turned', data);
		// 		console.log(' === connected === ');
		// 	}
      
		// });
		//socket.broadcast.emit('other player turned', data);
	})

    ////////////////////////////////////////////////////




    socket.on('player linked', function() {
		
		console.log(' recv: player linked');
        
     });
     
     socket.on('player connect', function() {
		console.log(currentPlayer.name+' recv: player connect');
		for(var i =0; i<clients.length;i++) {
			var playerConnected = {
				name:clients[i].name,
				position:clients[i].position,
				rotation:clients[i].position,
				health:clients[i].health
			};
		//	in your current game, we need to tell you about the other players.
			socket.emit('other player connected', playerConnected);
			console.log(currentPlayer.name+' emit: other player connected: '+JSON.stringify(playerConnected));
		} 
        
     });
     
     socket.on('play', function(data) {
		console.log(currentPlayer.name +' recv: play: '+ JSON.stringify(data));
		// if this is the first person to join the game init the enemies
		if(clients.length === 0) {
			numberOfEnemies = data.enemySpawnPoints.length;
			enemies = [];
			data.enemySpawnPoints.forEach(function(enemySpawnPoint) {
				var enemy = {
					name: guid(),
					position: enemySpawnPoint.position,
					rotation: enemySpawnPoint.rotation,
					health: 100
				};
				enemies.push(enemy);
			});
			playerSpawnPoints = [];
			data.playerSpawnPoints.forEach(function(_playerSpawnPoint) {
				var playerSpawnPoint = {
					position: _playerSpawnPoint.position,
					rotation: _playerSpawnPoint.rotation
				};
				playerSpawnPoints.push(playerSpawnPoint);
			});
		}

		var enemiesResponse = {
			enemies: enemies
		};
		// we always will send the enemies when the player joins
		console.log(currentPlayer.name+' emit: enemies: '+JSON.stringify(enemiesResponse));
		socket.emit('enemies', enemiesResponse);
		var randomSpawnPoint = playerSpawnPoints[Math.floor(Math.random() * playerSpawnPoints.length)];
		currentPlayer = {
			name:data.name,
			position: randomSpawnPoint.position,
			rotation: randomSpawnPoint.rotation,
			health: 100
		};
		clients.push(currentPlayer);
		// in your current game, tell you that you have joined
		console.log(currentPlayer.name+' emit: play: '+JSON.stringify(currentPlayer));
		socket.emit('play', currentPlayer);
		// in your current game, we need to tell the other players about you.
		socket.broadcast.emit('other player connected', currentPlayer);
	});
    
    socket.on('player move', function(data) {
		console.log('recv: move: '+JSON.stringify(data));
		currentPlayer.position = data.position;
		socket.broadcast.emit('player move', currentPlayer);
	});

	socket.on('player turn', function(data) {
		console.log('recv: turn: '+JSON.stringify(data));
		currentPlayer.rotation = data.rotation;
		socket.broadcast.emit('player turn', currentPlayer);
	});

	socket.on('player shoot', function() {
		console.log(currentPlayer.name+' recv: shoot');
		var data = {
			name: currentPlayer.name
		};
		console.log(currentPlayer.name+' bcst: shoot: '+JSON.stringify(data));
		socket.emit('player shoot', data);
		socket.broadcast.emit('player shoot', data);
	});

	socket.on('health', function(data) {
		console.log(currentPlayer.name+' recv: health: '+JSON.stringify(data));
		// only change the health once, we can do this by checking the originating player
		if(data.from === currentPlayer.name) {
			var indexDamaged = 0;
			if(!data.isEnemy) {
				clients = clients.map(function(client, index) {
					if(client.name === data.name) {
						indexDamaged = index;
						client.health -= data.healthChange;
					}
					return client;
				});
			} else {
				enemies = enemies.map(function(enemy, index) {
					if(enemy.name === data.name) {
						indexDamaged = index;
						enemy.health -= data.healthChange;
					}
					return enemy;
				});
			}

			var response = {
				name: (!data.isEnemy) ? clients[indexDamaged].name : enemies[indexDamaged].name,
				health: (!data.isEnemy) ? clients[indexDamaged].health : enemies[indexDamaged].health
			};
			console.log(currentPlayer.name+' bcst: health: '+JSON.stringify(response));
			socket.emit('health', response);
			socket.broadcast.emit('health', response);
		}
	});


});

function guid() {
	function s4() {
		return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const get_msgsender = async () => {
  var res=await myContract.methods.tokenMetaData(5).call({from:"0x413EBD57EbA0f200ed592c31E7dB6119C92A7973"});
  console.log("result :",JSON.parse(`${res}`).image);
  const balance = await web3.eth.getBalance("0x413EBD57EbA0f200ed592c31E7dB6119C92A7973");
  console.log("balance :",balance);

}


get_msgsender();