const requireApi = require.context('@/http/api', true, /.js$/)
const module = {}

requireApi.keys().forEach((key, index) => {
	if (key !== 'index.js') {
		Object.assign(module, requireApi(key))
	}
})


export default module
