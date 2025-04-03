import {createContext, useState, useEffect } from "react";
// import firebase from '../services/connection';
// import { toast } from "react-toastify";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, query, where, collectionGroup, getDoc, setDoc, doc } from "firebase/firestore";  
import db from "../services/connection";

export const AuthContext = createContext({});

function AuthProvider({children}){
    const usersRef = collection(db, 'users');
    const auth = getAuth();

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        function loadStorage(){
            const storageUser = localStorage.getItem('userData');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();

    },[]);

    async function login(email, password){
        setLoadingAuth(true);
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value)=>{
           
            let uid = value.user.uid;
            
            const userProfile = await getDoc(doc(db, "users", uid))
            console.log(userProfile)
            console.log(userProfile)
            
            if (userProfile?.exists()) {
                console.log(userProfile)
                let data = {
                    uid: uid,
                    // nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                }
                
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            }
            // toast.success('Seja bem vindo(a) '+userProfile.data().nome);
        })
        .catch((error)=>{
            console.log(error);
            if(error.code=='auth/user-not-found' ||error.code=='auth/wrong-password'){
                // toast.warning('Email ou senha incorreta');
            }else{
                // toast.error('Ops... algo deu errado');
            }
            setLoadingAuth(false);
        })
    }

    async function register(username, email, password){
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential)=>{
            let uid = userCredential.user.uid;

            const docRef = await setDoc(doc(db, `users/${uid}`), {
                username: username,
                email: email,
                avatarUrl: '1.jpg',
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    email: email,
                    username: username,
                    avatarUrl: '1.jpg'
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                // toast.success('Seja bem vindo(a) '+nome);
            })
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error)=>{
            console.log(error);
            // toast.error('Algo deu errado. Message: '+error.message);
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('userData', JSON.stringify(data));
    }

    async function logout(){
        setLoadingAuth(true);
        await signOut(auth);
        localStorage.removeItem('userData');
        // toast.info('Usuário deslogado');
        setUser(null);
        setLoadingAuth(false);
    }

    //!! = converter para booleano, se houver valor é true, se vazio é false
    return(
        <AuthContext.Provider 
            value={{signed: !!user,user,loading,register,logout,login,loadingAuth, setUser, storageUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;