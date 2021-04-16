import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

    let firebaseConfig = {
        apiKey: "AIzaSyDMBYVoUx6Vr9CBkrlmq_J1gRr22tkCgJo",
        authDomain: "reactapp-5da74.firebaseapp.com",
        databaseURL: "https://reactapp-5da74-default-rtdb.firebaseio.com",
        projectId: "reactapp-5da74",
        storageBucket: "reactapp-5da74.appspot.com",
        messagingSenderId: "712813211882",
        appId: "1:712813211882:web:c9d409e371816f7d4de793",
        
    };
  

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        // Referenciado a database para acessar em outros locais
        this.app = app.database();

        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid =  app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
          return null;
        }
    
        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    
      }
    
}

export default new Firebase();