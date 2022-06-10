export default (axios) => ({

	async getAllPosts(indexPag, paged){
		let { data } = await axios.get(`/posts/?limit=${paged}&offset=${(indexPag || 0) * paged }`)
		return data
	},

	async getCategoryPosts(idCat, indexPag, paged){
		let { data } = await axios.get(`/posts/${idCat}/category/?limit=${paged}&offset=${(indexPag || 0) * paged }`)
		return data
	},

	async getPost(id){
		let { data } = await axios.get(`/posts/${id}`)
		return data
	},

	async getPopularPosts(){
		let { data } = await axios.get(`/posts/popular/get`)
		return data
	},

	async getTargetPosts(category){
		let { data } = await axios.get(`/posts/target/${category}`)
		return data
	},

	async createPostComments(body){
		let { data } = await axios.post(`/posts/comment`, body)
		return data
	},

	async addFavoritePost(body){
		let { data } = await axios.post(`/posts/favorite`, body)
		return data
	},

	async deleteFavoritePost(body){
		let { data } = await axios.post(`/posts/favorite/delete`, body)
		return data
	},

	async getFavoritePost(idUser){
		let { data } = await axios.get(`/posts/favorite/${idUser}`)
		return data
	},
})