/**
 * 페이지 헤더
 */
const HeaderComponent = function () {
	const headerTemplete = `
	<div class="header" :class="{'mobile': isMobile, 'active': isOpen}">
		<div >
			<h1 v-show="!isMobile"><a href="#none"><img src="/resources/img/img_logo.png" alt=""></a></h1>
			<div class="channel_select" :class="{mb40: !isMobile}">
				<div class="input_section">
					<ul class="input_wrap">
						<li class="input_area">
							<label for="">채널명 </label>
							<div class="select_list channel-list" v-bind:class="{on: showChannelList}"> <!--dropdown  열릴때 on클래스 추가, 아래 ul태그 block-->
								<div class="active" @click="openChannelList">
									{{selectedChannel.name}} <!-- span class="bul_type01">{{selectedChannel.cuser}}</span> -->
								</div>
								<ul style="display: none; z-index: 10000;" class="option-list" v-show="showChannelList">
									<li v-for="item in channels"><a href="#none" @click="changeChannel(item.code)">{{item.name}} <!-- <span class="bul_type01">{{item.cuser}}</span>--></a></li>
									
									<li><a href="/chan/list.view" v-if="!isMobile">채널관리</a></li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<a href="#none" class="btn_small01 nav-log-out" 
				:style="!isMobile && 'margin-left: 40px; transform: translateY(-20px);'">로그아웃</a>
			<a href="#none" class="btn_small01 menu-close" v-if="isMobile" @click="closeMobileMenu">X</a>
			
			<span class="bell" style="
			    display: inline-block;
			    top: 28px;
			    position: absolute;
			    margin-left: 20px;
			    font-size: 12px; display: none">
			    	<a href="#" class="alam_msg work_label04" style="border-radius: 10px; padding: 2px 4px;" data-cnt="0">알림 0</a>
			    </span>
			<nav>
				<ul>
					<li><a href="/work/list.view" :class="{on: selectedMenu == 'work'}">작업관리</a></li>
					<li><a href="/ia/list.view" :class="{on: selectedMenu == 'menu'}">화면목록</a></li>
					<li v-if="!isMobile"><a href="/ia/cal" :class="{on: selectedMenu == 'cal'}">스케쥴</a></li>
					<li v-if="!isMobile"><a href="/user/list.view" :class="{on: selectedMenu == 'user'}">권한관리</a></li>
				</ul>
			</nav>
			<a href="#none" class="btn_logout" style="display: none;">로그아웃</a>
		</div>
		
	</div>`;
	
	
	return {
		template: headerTemplete,
		mixins: [resizeMixin, channelMixin],
		data: function () {
			return {
				isOpen: false
			}
		},
		mounted: function () {
			var app = this;
			const btnWrapper = document.createElement('div');
			const btnBefore = document.querySelector('.container');
			
			document.querySelector('.wrapper').insertBefore(btnWrapper, btnBefore);
			
			var btnComponent = Vue.extend(this);
			new btnComponent({
				template: `<button class="mobile-menu-open" @click="openMenu" v-if="$parent.isMobile"></button>`,
				parent: this,
				methods: {
					openMenu: function () {
						this.$emit('open-menu');
					}
				}
			})
			.$on('open-menu', this.openMenu)
			.$mount(btnWrapper);
		},
		computed: {
			selectedMenu: function () {
				if (location.pathname.indexOf('/work') != -1) {
					return 'work';
				}
				else if (location.pathname.indexOf('/ia') != -1) {
					if (location.pathname.indexOf('cal') != -1) {
						return 'cal';
					}
					else {
						return 'menu'
					}
				}
				else if (location.pathname.indexOf('/user') != -1) {
					return 'user';
				}
			}
		},
		methods: {
			closeMobileMenu: function () {
				this.isOpen = false;
			},
			openMenu: function () {
				this.isOpen = true;
			}
		}
	};
};
		
Vue.component('header-component', HeaderComponent());

