

const handleProfileGet= (req,res,dbb)=>{
	// const {id}=req.params;
	// database.users.forEach(user=>{
	// 	if(user.id===id){
	// 		return res.json(user);
	// 	}else{
	// 		res.json('no such user')
	// 	}
	// })
	const {id}=req.params;
	// let found=false;
	// database.users.forEach(user=>{
	// 	if(user.id===id){
	// 		found=true;
	// 		return res.json(user);
	// 	}
	// })
	dbb.select('*').from('users').where({id:id})
	.then(user=>{
		console.log(user[0])
		if(user.length){

				return res.json(user[0]);

		} else {
			res.json("the user with the ID above doesn't exist ! dude get a life! ")
		}
	
	})

		// if(!found){
		// 	res.status(400).json('not founddddd!')
		// }

	}
	module.exports={
		handleProfileGet
	};