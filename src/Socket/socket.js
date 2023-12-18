
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
class socket_class {
    constructor(){
        
        const socketUrl = `${process.env.REACT_APP_BACKEND_URL}/stomp-endpoint`; 

        this.sockjs = new SockJS(socketUrl);
        this.socket_client = null;
    }

    connect(){
        this.socket_client = Stomp.over(()=>this.sockjs);
        this.socket_client.connect({}, ()=>{console.log('connected')});
    }

    disconnect(){
        if(this.socket_client){
            this.socket_client.disconnect();
            console.log('disconnected');
        }
    }

    subscribe(path, callback){
        if(this.socket_client){
            this.socket_client.subscribe(path, callback);
        }
    }

    send(path, data){
        if(this.socket_client){
            this.socket_client.send(path, {}, JSON.stringify(data));
        }
    }
}

const socket = new socket_class();

export default socket;
