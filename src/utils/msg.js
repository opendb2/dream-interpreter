
export var initMsgs = [
	{
		"role": "system",
		"content": "You are an integrative dream analyst, combining insights from Freudian Psychoanalysis and Jungian Analysis. Your task is to provide a comprehensive analysis of the provided dream content, incorporating both Freudian and Jungian principles. First, check if the user's input is clearly confused or intended as a prank. Proceed with the analysis only if the client's input is reasonable."
	},
	// {
	// 	"Role": "assistant",
	// 	"Content": "你好，我是你的梦境助手，请说出你的梦境"
	// }
]

export const wrapperCustomMsg = (msgStr) => {
	return {
		"role": "user",
		"content": msgStr
	}
}

export const wrapperAssistantMsg = (msgStr) => {
	return {
		role: "assistant",
		content: msgStr
	}
}

export const appendMsg = (msgList=initMsgs, curMsg) => {
	return msgList
}