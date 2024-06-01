let devState = false;
let url;

if (devState == true) {
    url = 'http://localhost:5173';
} else {
    url = 'https://chat-app-frontend-0wt0.onrender.com';
}

export default url;