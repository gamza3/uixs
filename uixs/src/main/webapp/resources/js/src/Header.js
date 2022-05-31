/**
 * 페이지 헤더
 */
import {AppContext} from './root.js'; 
 
const useState = React.useState;
 
export default function () {
	const appContext = React.useContext(AppContext);
	
	const [channelList, setChannelList] = useState([]);
	const [selectedChannel, setSelectedChannel] = useState({});
	const [isShow, setIsShow] = useState(false);
	
	// 채널 목록 열기
	const openChannelList = function (e) {
		e.preventDefault();
		
		setIsShow(!isShow);
	};
	
	// 채널 변경하기
	const changeChannel = function (e, item) {
		e.preventDefault();
		
		setSelectedChannel(item);
		setIsShow(!isShow);
	};
	
	// mounted
	React.useEffect(function () {
		fetch('/chan/channels.data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			// param data
			//body: JSON.stringify(data)
		})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			setChannelList(data);
			setSelectedChannel(data[0]);
		});
	}, []);
	
	
	React.useEffect(function () {
		appContext.setChannel(selectedChannel);
		
		console.log(appContext.channel)
	}, [selectedChannel]);
	
	return (
		<div className="header">
			<div>
				<h1><a href="#none"><img src="/resources/img/img_logo.png" alt="" /></a></h1>
				<div className="channel_select mb40">
					<div className="input_section">
						<ul className="input_wrap">
							<li className="input_area">
								<label htmlFor="">{selectedChannel.name}</label>
								<div className={'select_list channel-list' + (isShow ? ' on': '')} > 
									<div className="active" onClick={openChannelList}>
										{selectedChannel.name}
									</div>
									{isShow && 
									<ul style={{zIndex: '10000'}} className="option-list">
									{
										channelList.map(function (item) {
											return <li key={item.name}><a href="#none" onClick={(e) => {changeChannel(e, item)}}>{item.name}</a></li>
										})
									}
										<li><a href="/chan/list.view">채널관리</a></li>
									</ul>
									}
								</div>
							</li>
						</ul>
					</div>
				</div>
				<a href="#none" className="btn_small01 nav-log-out" style={{marginLeft: 40, transform:'translateY(-20px)'}}>로그아웃</a>
				<span 
					className="bell" 
					style={{
					    display: 'inline-block',
					    top: 28,
					    position: 'absolute',
					    marginLeft: 20,
					    fontSize: 12, display: 'none'
				    }}>
				    <a href="#" className="alam_msg work_label04" style={{borderRadius: 10, padding: '2px 4px'}} data-cnt="0">알림 0</a>
				</span>
				<nav>
					<ul>
						<li><a href="/work/list.view">작업관리</a></li>
						<li><a href="/ia/list.view">화면목록</a></li>
						<li><a href="/user/list.view">권한관리</a></li>
					</ul>
				</nav>
				<a href="#none" className="btn_logout" style={{display:'none'}}>로그아웃</a>
			</div>
		</div>
	);
}
