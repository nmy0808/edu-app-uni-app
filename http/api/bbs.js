import request from '@/http/request.js'
/**
 * 社区列表
 */
export const getBbsListApi= (page=1) => {
	const url = '/mobile/bbs'
	const data = { page }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 帖子列表
 */
export const getPostListApi= ({page, keyword,bbs_id }) => {
	const url = '/mobile/post/list'
	const data = { page, keyword,bbs_id }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 查看帖子
 */
export const getPostDetailApi= ({id}) => {
	const url = '/mobile/post/read'
	const data = { id }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 查看帖子评论列表
 */
export const getPostCommentListApi= ({page, post_id}) => {
	const url = '/mobile/post_comment'
	const data = { page, post_id }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 点赞帖子
 */
export const postSupportApi= ({post_id}) => {
	const url = '/mobile/post/support'
	const data = { post_id }
	const options = {  }
	return request.post(url, data, options)
}
/**
 * 取消点赞帖子
 */
export const unPostSupportApi= ({post_id}) => {
	const url = '/mobile/post/unsupport'
	const data = { post_id }
	const options = {  }
	return request.post(url, data, options)
}
/**
 * 评论帖子
 * reply_user.id	252	Integer		被回复用户id
 * reply_user.username	ceshi22	String		被回复用户名
 * reply_user.avatar		String		被回复用户头像
 */
export const getPostReplyApi= ({post_id, content, reply_id = 0, reply_user}) => {
	const url = '/mobile/post/reply'
	const data = { post_id, content, reply_id, reply_user }
	const options = {  }
	return request.post(url, data, options)
}
/**
 * 删除帖子
 */
export const deletePostApi= ({id}) => {
	const url = '/mobile/post/delete'
	const data = { id }
	const options = {  }
	return request.post(url, data, options)
}
/**
 * 我的帖子列表
 */
export const getMyPostListApi= ({page}) => {
	const url = '/mobile/mypost'
	const data = { page }
	const options = {  }
	return request.get(url, data, options)
}
/**
 * 发布帖子
 * content.text	  String  帖子内容
 * content.images  Array  图片链接
 */
export const publishPostApi= ({bbs_id,content}) => {
	const url = '/mobile/post/save'
	const data = { bbs_id,content }
	const options = {  }
	return request.post(url, data, options)
}