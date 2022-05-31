'use strict'

import Header from './Header.js';
import {AppContext} from './root.js';



const HeaderParent = function() { 
	const [channel, setChannel] = React.useState({});
	
	const contextSett = {
		channel: channel,
		setChannel: setChannel
	}
	
	return (
		<AppContext.Provider value={contextSett}>
			<Header />
		</AppContext.Provider>
	);
}


// header render
ReactDOM.render(
	<HeaderParent />,
	document.getElementById('header')
);

const ChannelName = function () {
	const appContext = React.useContext(AppContext);
	
	const [channel, setChannel] = React.useState(appContext.channel);
	
	console.log(channel)
	
	return <strong className="tit-channel-type">{channel.name}</strong>;
}

ReactDOM.render(
	<ChannelName />,
	document.getElementById('channelNameArea')
);

