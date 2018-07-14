

const handleRegister=(req,res,dbb,bcrypt)=>{
	const{name,email,pass}=req.body;
	if(!email||!pass||!name){
		return res.status(400).json('incorrect form submission');
	}
	const hash=bcrypt.hashSync(pass);/* sync version of bcrypt to hash the pass from front end */

	
// 	bcrypt.hash(pass, null, null, function(err, hash) {
//     // Store hash in your password DB.
//     console.log(hash);
// });
	 // we are going to use database insert
	// database.users.push({
	// 	id:125,
	// 	name:name,
	// 	email:email,
	// 	pass:pass,
	// 	entries:0,
	// 	joined:new Date() 
	// }) 


	/* lets use transaction to aply change on multiple Databases 
	ie: login and users */

	dbb.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
						return trx ('users')
				.returning('*')
				.insert({

					email:loginEmail[0],
					name:name,
					joined:new Date()
				// }).then(console.log);
			})
				.then(response=>{
					res.json(response[0])
				})
				.then(trx.commit)
				.catch(trx.rollback)

				.catch(err=>{
					res.status(400).json("unable to load")
				})

		})

	})



	// res.json(database.users[database.users.length-1])



}
module.exports={
	handleRegister:handleRegister
};