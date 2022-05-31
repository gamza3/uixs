/**
 * 공통 mixins
 */
var channelMixin = {
	data: function () {
		return {
//			channels: [],
			selectedChannelIndex: 0,
			selectedChannel: {},
			showChannelList: false,
//			loginInfo: {},
		}
	},
	created: async function () {
		var _app = this;
	},
	watch: {
		channels: function () {
			var channelCode = localStorage.getItem('channel') == null ? this.channels[0].code : localStorage.getItem('channel');

			this.selectedChannel = this.getSelectedChannel(channelCode);

			// 세션 스토리지에 채널 코드 저장
			this.setSessionChannel(channelCode);
		}
	},
	computed: {
		channels: function (){
			return this.$store.getters.getChannels;
		},
		getChannelCode: function () {
			return localStorage.getItem('channel') == null ? 
				(Object.keys(this.selectedChannel).length ? this.selectedChannel.code : 'PB_M') : 
				localStorage.getItem('channel');
		},
		loginInfo: function () {
			return this.$store.getters.getLoginInfo;
		},
		isMobile: function () {
			return this.$store.getters.getIsMobile;
		}
	},
	mounted: function () {
	},
	methods: {
		app__init: function () {
			// 채널 로드
			this.read__channels();
			// 로그인정보 로드
			this.read__loginInfo();
		},
		setSessionChannel: function (code) {
			sessionStorage.setItem('channel', code);
			window.localStorage.setItem('channel', code);
		},
		getSelectedChannel: function (code) {
			var app = this;
			return this.channels.filter(function (channel, index) {
				if (channel.code == code) {
					app.selectedChannelIndex = index;
					
					return channel;
				}
			})[0];
		},
		openChannelList: function () {
			this.showChannelList = !this.showChannelList;
		},
		// 채널 변경
		changeChannel: function (code) {
			this.selectedChannel = this.getSelectedChannel(code);
			
			// 채널 리스트 닫기
			this.showChannelList = false;
			
			// 세션 스토리지에 채널 코드 저장
			this.setSessionChannel(code);
			
			location.reload();
		},
		read__channels: function () {
			this.$store.dispatch('read__channels');
		},
		// 로그인 정보
		read__loginInfo: function () {
			this.$store.dispatch('read__loginInfo');
		},
		// ajax loading
		loading: function (flag) {
			var loadingContainer = $('<div/>', {class: 'loading-container2'});
	        var loading = $('<div/>', {class: 'loading'});
	        var loadingText = $('<div/>', {id: 'loading-text'}).css({'color': '#fff'}).text('loading');
	            
	        loading.appendTo(loadingContainer);
	        loadingText.appendTo(loadingContainer);
	        
	        if (flag == 'start') {
				// 딤드영역 생성
		        var dimd = document.createElement('div');
		        dimd.id = 'loading-dim';
		        dimd.style.backgroundColor = '#000';
		        dimd.style.opacity = '0.5'; 
		        dimd.style.position = 'fixed';
		        dimd.style.width = '100%';
		        dimd.style.height = '100%';
		        dimd.style.left = 0;
		        dimd.style.top = 0;
				// 딤드 바디에 추가
		        document.body.appendChild(dimd);
		        
		        // 로딩바 추가
	            loadingContainer.appendTo('body');
	        }
	        else {
				// 로딩바 제거
	            $('.loading-container2').remove();
	            
	            // 딤드 대상
	            var dimd = document.getElementById('loading-dim');
	            // 딤드 제거	
	            document.body.removeChild(dimd);
	        }
		},
		// ia 목록 생성
		getMenuPathString: function (requestIaList) {
			var path = requestIaList.map(function (item) {
				var itemArr = item.PATH.split('[>]');
				var itemArrRevers = itemArr.reverse();
				
				return itemArrRevers.join(' > ');
			});
			
			return path;
		}
	}
};

var resizeMixin = {
	data: function () {
	},
	computed: {
		
	},
	mounted: function () {
		if (window.innerWidth < 760) {
			this.setIsMobile(true);
			document.querySelector('.container').classList.add('mobile-container');
			document.querySelector('.wrapper').classList.add('mobile-wrapper');
		}
		else {
			this.setIsMobile(false);
			document.querySelector('.wrapper').classList.remove('mobile-container');
			document.querySelector('.wrapper').classList.remove('mobile-wrapper');
		}
		
		window.addEventListener('resize', this.sizeCheck, true);
	},
	destroyed: function () {
		window.removeEventListener('resize', this.sizeCheck, true);
	},
	methods: {
		sizeCheck: function (e) {
			if (e.target.innerWidth <= 760) {
				this.setIsMobile(true);
				document.querySelector('.container').classList.add('mobile-container');
				document.querySelector('.wrapper').classList.add('mobile-wrapper');
			}
			else {
				this.setIsMobile(false);
				document.querySelector('.container').classList.remove('mobile-container');
				document.querySelector('.wrapper').classList.remove('mobile-wrapper');
			}
		},
		setIsMobile: function (payload) {
			this.$store.commit('setIsMobile', payload);
		}
	}
};