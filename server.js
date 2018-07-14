const express=require ('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');


const register=require('./controllers/register');
const sushi=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

var knex = require('knex');

/*({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});  or as a function   */
const dbb=knex({
  client: 'pg',
  connection: {
    // host : 'postgresql-solid-19539',
    // user : 'postgres',
    // password : '',
    // database : 'smart-brain'
    connectionString:process.env.DATABASE_URL,
    ssl:true,
  }
});

console.log(dbb.select('*').from('users'));


const app=express();
/*by creating and connecting the database, we don't need this here any more */
// const database = {
// 	users:[
// 	{
// 		id:'123',
// 		name:'john',
// 		pass:'cookies',
// 		email:'john@gmail.com',
// 		entries:0,
// 		joined:new Date()
// 	},
// 	{
// 		id:'124',
// 		name:'joe',
// 		pass:'tala',
// 		email:'joe@gmail.com',
// 		entries:0,
// 		joined:new Date()

// 	}

// 	],

// 	login:[
// 		{
// 			id:'987',
// 			hash:'',
// 			email:'john@gmail.com'
// 		}
// 	]
// }

app.use(bodyParser.json());
app.use(cors());
// app.get('/',(req,res)=>{
// 	res.send("app is absolutely running on port 3000");
// })
app.get('/',(req,res)=>{
	res.send('it is working ! hoooray!')/*res.send(database.users)*/;

})

app.post('/signin',(req,res)=>{sushi.handleSignin(req,res,dbb,bcrypt)});
app.post('/register', (req,res)=>{register.handleRegister(req,res,dbb,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,dbb)})



app.post('/image',(req,res)=>{image.handleImage(req,res)})
app.post('/imageurl',(req,res)=>{image.handleApicall(req,res)})



app.listen(process.env.PORT||3001,()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})
