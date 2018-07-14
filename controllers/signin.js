

const handleSignin=(req,res,dbb,bcrypt)=>{
if(!req.body.pass || !req.body.email){

	return res.status(400).json('incorrect form submission');
}

// // Load hash from your password DB.
// bcrypt.compare("baby", '$2a$10$KL8/CdpIf6qsuuUpXY2S5ucuNVJEgvcpB/gIwtfGkeRGFFjS2RL5u', function(err, res) {
//    console.log('the first guess:',res) // res == true
// });
// bcrypt.compare("veggies", '$2a$10$KL8/CdpIf6qsuuUpXY2S5ucuNVJEgvcpB/gIwtfGkeRGFFjS2RL5u', function(err, res) {
//    console.log('2nd guess: ',res) // res = false
// });

// 	if(req.body.email===database.users[0].email 
//      && req.body.pass===database.users[0].pass) {
// 		res.json('successs')
// 	}else { res.send('login failed')  }


dbb.select('email','hash').from('login')
.where('email','=', req.body.email)
// .then(data=>{
// 	console.log(data)
// })
.then(data=>{
		const isValid=bcrypt.compareSync(req.body.pass,data[0].hash);
		if(isValid){
						dbb.select('*').from('users')
						.where('email','=',req.body.email)
						.then(user=>{

							console.log(user[0]);
								res.json(user[0])
							})
							.catch(err=>res.status(400).json('unable to get users'))
					} else {
						res.status(400).json('Wroooooong email or password')
					}
			})
			.catch(err=>res.status(400).json('Wrong Credentials'))
		




}
module.exports={
	handleSignin:handleSignin
};