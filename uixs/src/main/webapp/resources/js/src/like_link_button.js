'use strict';

const useState = React.useState;

const LikeButton = () => {

    const [liked, setLiked] = useState(false);

    if (liked) {
        return 'You liked this.';
    }
    else {
        return <button onClick = {() => setLiked(true)}>Like</button>
    }
};

export {LikeButton};

//const domContainer = document.querySelector('#root');
//ReactDOM.render(e(LikeButton), domContainer);