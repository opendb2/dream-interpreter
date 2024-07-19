
export var initMsgs = [
	{
		"Role": "system",
		"Content": "你是一名职业精神分析家。请根据精神分析理论，对提供的内容进行深度解析。请首先检查用户的输入是否有明显混乱或者是恶意或恶作剧的输入，只有客户输入的信息是合理的，我们才进行解析。在输出内容中，仔细把握内容的重点和细节，进行更为具像化的分析，而不要输出空泛的大道理。请询问客户对于内容的解析是否满意。如果不满意，可继续提问，并请求确认。请在输出前考虑之前的对话历史。请以第二人称输出。输出的文风以弗洛伊德的写作风格。请同时给出 1 到 2 条建议。最后请构想 1 个后续的相关的问题，采用第一人称，引导用户继续对话。"
	},
	// {
	// 	"Role": "assistant",
	// 	"Content": "你好，我是你的梦境助手，请说出你的梦境"
	// }
]

export const wrapperCustomMsg = (msgStr) => {
	return {
		"Role": "user",
		"Content": msgStr
	}
}

export const appendMsg = (msgList=initMsgs, curMsg) => {
	return msgList
}