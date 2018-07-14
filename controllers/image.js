
const Clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b5c094f100df42e0a2a16a9e24effa9e'
});


const handleApicall=(req,res)=>{

app.models
.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
.then(data=>{
	res.json(data)
	
})
.catch(err=>res.status(400).json('unable to work with API'))


}







const handleImage=(req,res)=>{
	const {id}=req.body;
	let found=false;
	database.users.forEach(user=>{
		if(user.id===id){
			found=true;
			user.entries++;
			return res.json(user.entries);
		}
	})

		if(!found){
			res.status(400).json('not found :) !')
		}
	

}
module.exports={
	handleImage,
	handleApicall
};