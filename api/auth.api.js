export default (axios) => ({
	async signUp(body){
		let { data } = await axios.post(`/auth/signup`, body)
		return data
	},
})