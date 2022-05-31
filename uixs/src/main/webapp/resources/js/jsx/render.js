'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Header from './Header.js';
import { AppContext } from './root.js';

var HeaderParent = function HeaderParent() {
	var _React$useState = React.useState({}),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    channel = _React$useState2[0],
	    setChannel = _React$useState2[1];

	var contextSett = {
		channel: channel,
		setChannel: setChannel
	};

	return React.createElement(
		AppContext.Provider,
		{ value: contextSett },
		React.createElement(Header, null)
	);
};

// header render
ReactDOM.render(React.createElement(HeaderParent, null), document.getElementById('header'));

var ChannelName = function ChannelName() {
	var appContext = React.useContext(AppContext);

	var _React$useState3 = React.useState(appContext.channel),
	    _React$useState4 = _slicedToArray(_React$useState3, 2),
	    channel = _React$useState4[0],
	    setChannel = _React$useState4[1];

	console.log(channel);

	return React.createElement(
		'strong',
		{ className: 'tit-channel-type' },
		channel.name
	);
};

ReactDOM.render(React.createElement(ChannelName, null), document.getElementById('channelNameArea'));