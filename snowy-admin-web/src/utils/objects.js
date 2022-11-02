import pinyin from 'js-pinyin'
import store from '@/store/index'

/**
 * 中文转拼音
 * @param first 仅首字母
 * @returns {String}
 */
Object.defineProperty(String.prototype, 'toPinyin', {
	writable: false,
	enumerable: false,
	configurable: true,
	value: function (first) {
		let str = this
		if (first) {
			return pinyin.getCamelChars(str).replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
		}
		return pinyin.getFullChars(str).replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
	}
})

/**
 * 字符检索
 * @param input 检索值
 * @returns {Boolean}
 */
Object.defineProperty(String.prototype, 'filter', {
	writable: false,
	enumerable: false,
	configurable: true,
	value: function (input) {
		let str = this
		let en = str.toLowerCase().includes(input.toLowerCase())
		let zhFull = str.toPinyin().toLowerCase().includes(input.toLowerCase())
		let zhFirst = str.toPinyin(true).toLowerCase().includes(input.toLowerCase())
		return en || zhFull || zhFirst
	}
})
