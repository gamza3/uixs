/**
 * 공통 mixins
 */
var channelMixin = {
	data: function data() {
		return {
			channels: [],
			selectedChannelIndex: 0,
			selectedChannel: {},
			showChannelList: false
		};
	},
	created: function created() {
		var _app = this;

		uijs.ajaxDef({
			ajaxOption: {
				url: '/chan/channels.data'
			},
			callback: function callback(data) {
				_app.channels = data;
			}
		});
	},
	mounted: function mounted() {
		if (this.channels && this.channels.length > 0) {

			var channelCode = sessionStorage.getItem('channel') == null ? 'PB_M' : sessionStorage.getItem('channel');

			this.selectedChannel = this.channels.filter(function (channel, index) {
				if (channel.code == channelCode) {
					selectedChannelIndex = index;

					return channel;
				}
			})[0];
		}
	},
	methods: {
		openChannelList: function openChannelList() {
			this.showChannelList = !this.showChannelList;
		},
		// 채널 변경
		changeChannel: function changeChannel(code) {
			this.selectedChannel = this.channels.filter(function (channel, index) {
				if (channel.code == code) {
					selectedChannelIndex = index;

					return channel;
				}
			})[0];

			// 채널 리스트 닫기
			this.showChannelList = false;

			// 세션 스토리지에 채널 코드 저장
			uijs.channel.set(code);

			location.reload();
		},
		getChannelCode: function getChannelCode() {
			return sessionStorage.getItem('channel') == null ? 'PB_M' : sessionStorage.getItem('channel');
		}
	}
};