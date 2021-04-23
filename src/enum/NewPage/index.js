/**
 * @description Newpage
 */

export default {

	/**
	 * @enum 归档日志状态
	 */
	NEWPAGE_STATE: {
		0: {
			text: '关闭',
			status: 'Default',
		},
		1: {
			text: '运行中',
			status: 'Processing',
		},
		2: {
			text: '已上线',
			status: 'Success',
		},
		3: {
			text: '异常',
			status: 'Error',
		},
	}
}
