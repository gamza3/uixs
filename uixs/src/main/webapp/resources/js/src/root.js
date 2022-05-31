'use strict'

Vue.prototype.$dateDiff = dateDiff;
Vue.prototype.$socket = new SockJS('/echo');

Vue.prototype.$sendMsg = function (param) {
	// 메세지 전송
	var sendParam = {
		receiver_auth: 'WORKER',
		receiver_part: '',
		sender_id: param[0], 
		content: param[1]
	};
	
	try {
		uijs.ajaxDef({
			url: '/msg/send'
			, data: sendParam
			, dataType: 'text'
			, callback: function (data) {
				// 작업요청내역 다시 로드
				Vue.prototype.$socket.send(sendParam.sender_id+','+sendParam.receiver_auth+','+sendParam.receiver_part+','+sendParam.content);
			}
		});
	}
	catch(e) {
		console.log(e.message);
	}
};

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(search, pos) {
		return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
	};
}

const _store = new Vuex.Store({
	state: {
		hasMessage: false,
		channels: [],
		loginInfo: {},
		isMobile: false
	},
	mutations: {
		setChannels: function (state, payload) {
			state.channels = payload;
		},
		setLoginInfo: function (state, payload) {
			state.loginInfo = payload;
		},
		setIsMobile: function (state, payload) {
			state.isMobile = payload;
		},
		setHasMessage: function (state, payload) {
			state.hasMessage = payload;
		}
	},
	actions: {
		//start:  채널정보 읽어오기
		read__channels: async function(context) {
			const response = await axios.post('/chan/channels.data');
			
			context.commit('setChannels', response.data);
		},//end: read__channels
		
		//start: 로그인 정보 read
		read__loginInfo: function (context) {
			axios.get('/login/info.data')
			.then(function (response) {
				if (response.data.userid == null) {
					if (location.pathname !== '/login') {
						location.href = '/login';		
					}
				}
				else {
					context.commit('setLoginInfo', response.data);
				}
			});
		}, //end: read__loginInfo
	},
	getters: {
		getChannels(state) {
			return state.channels;
		},
		getLoginInfo(state) {
			return state.loginInfo;
		},
		getIsMobile(state) {
			return state.isMobile;
		},
		getHasMessage(state) {
			return state.hasMessage;
		}
	},
	modules: {
		workStore: {
			namespaced: true,
			state: {
				workDetailOpener: null
			},
			mutations: {
				setWorkDetailOpener: function (state, payload) {
					state.workDetailOpener = payload;
				}
			},
			actions: {
				
			},
			getters: {
				getWorkDetailOpener: function (state) {
					return state.workDetailOpener;
				}
			}
		}
	}
});


const MessageComponent = {
	template: `<div class="msg-alert" v-if="on" role="button" @click="openMessage" style="cursor:pointer"></div>`,
	data: function () {
		return {}
	},
	computed: {
		on: function () {
			return this.$store.getters.getHasMessage
		}
	},
	methods: {
		openMessage: function () {
			uijs.viewMsg();
			this.$store.commit('setHasMessage', false);
		}
	}
};

Vue.component('msg-component', MessageComponent);


