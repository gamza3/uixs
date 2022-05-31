var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 페이지 헤더
 */
import { AppContext } from './root.js';

var useState = React.useState;

export default function () {
	var appContext = React.useContext(AppContext);

	var _useState = useState([]),
	    _useState2 = _slicedToArray(_useState, 2),
	    channelList = _useState2[0],
	    setChannelList = _useState2[1];

	var _useState3 = useState({}),
	    _useState4 = _slicedToArray(_useState3, 2),
	    selectedChannel = _useState4[0],
	    setSelectedChannel = _useState4[1];

	var _useState5 = useState(false),
	    _useState6 = _slicedToArray(_useState5, 2),
	    isShow = _useState6[0],
	    setIsShow = _useState6[1];

	// 채널 목록 열기


	var openChannelList = function openChannelList(e) {
		e.preventDefault();

		setIsShow(!isShow);
	};

	// 채널 변경하기
	var changeChannel = function changeChannel(e, item) {
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
			}
			// param data
			//body: JSON.stringify(data)
		}).then(function (response) {
			return response.json();
		}).then(function (data) {
			setChannelList(data);
			setSelectedChannel(data[0]);
		});
	}, []);

	React.useEffect(function () {
		appContext.setChannel(selectedChannel);

		console.log(appContext.channel);
	}, [selectedChannel]);

	return React.createElement(
		'div',
		{ className: 'header' },
		React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				React.createElement(
					'a',
					{ href: '#none' },
					React.createElement('img', { src: '/resources/img/img_logo.png', alt: '' })
				)
			),
			React.createElement(
				'div',
				{ className: 'channel_select mb40' },
				React.createElement(
					'div',
					{ className: 'input_section' },
					React.createElement(
						'ul',
						{ className: 'input_wrap' },
						React.createElement(
							'li',
							{ className: 'input_area' },
							React.createElement(
								'label',
								{ htmlFor: '' },
								selectedChannel.name
							),
							React.createElement(
								'div',
								{ className: 'select_list channel-list' + (isShow ? ' on' : '') },
								React.createElement(
									'div',
									{ className: 'active', onClick: openChannelList },
									selectedChannel.name
								),
								isShow && React.createElement(
									'ul',
									{ style: { zIndex: '10000' }, className: 'option-list' },
									channelList.map(function (item) {
										return React.createElement(
											'li',
											{ key: item.name },
											React.createElement(
												'a',
												{ href: '#none', onClick: function onClick(e) {
														changeChannel(e, item);
													} },
												item.name
											)
										);
									}),
									React.createElement(
										'li',
										null,
										React.createElement(
											'a',
											{ href: '/chan/list.view' },
											'\uCC44\uB110\uAD00\uB9AC'
										)
									)
								)
							)
						)
					)
				)
			),
			React.createElement(
				'a',
				{ href: '#none', className: 'btn_small01 nav-log-out', style: { marginLeft: 40, transform: 'translateY(-20px)' } },
				'\uB85C\uADF8\uC544\uC6C3'
			),
			React.createElement(
				'span',
				{
					className: 'bell',
					style: _defineProperty({
						display: 'inline-block',
						top: 28,
						position: 'absolute',
						marginLeft: 20,
						fontSize: 12 }, 'display', 'none') },
				React.createElement(
					'a',
					{ href: '#', className: 'alam_msg work_label04', style: { borderRadius: 10, padding: '2px 4px' }, 'data-cnt': '0' },
					'\uC54C\uB9BC 0'
				)
			),
			React.createElement(
				'nav',
				null,
				React.createElement(
					'ul',
					null,
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ href: '/work/list.view' },
							'\uC791\uC5C5\uAD00\uB9AC'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ href: '/ia/list.view' },
							'\uD654\uBA74\uBAA9\uB85D'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ href: '/user/list.view' },
							'\uAD8C\uD55C\uAD00\uB9AC'
						)
					)
				)
			),
			React.createElement(
				'a',
				{ href: '#none', className: 'btn_logout', style: { display: 'none' } },
				'\uB85C\uADF8\uC544\uC6C3'
			)
		)
	);
}