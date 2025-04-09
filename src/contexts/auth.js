import {createContext, useState, useEffect } from "react";
// import firebase from '../services/connection';
// import { toast } from "react-toastify";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut, sendPasswordResetEmail, updateProfile, updateEmail } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, query, where, collectionGroup, getDoc, setDoc, doc } from "firebase/firestore";  
import db from "../services/connection";
import { toast } from "sonner";
import { redirect } from "react-router-dom";

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
            let userProfile = auth.currentUser;
            
            // const userProfile = await getDoc(doc(db, "users", uid))
            console.log(userProfile)
            
            if (userProfile) {
                console.log(userProfile)
                setUser(userProfile);
                storageUser(userProfile);
                setLoadingAuth(false);
            }
            toast.success('Welcome '+userProfile.displayName);
        })
        .catch((error)=>{
            console.log(error, error.code);
            if(error.code=='auth/invalid-credential'){
                toast.error('Email or password invalid');
            }else{
                toast.error('Something went worng');
            }
            setLoadingAuth(false);
        })
    }

    async function register(name, email, password){
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential)=>{
            let uid = userCredential.user.uid;
            console.log(uid);

            // const docRef = await setDoc(doc(db, `users/${uid}`), {
            //     username: username,
            //     email: email,
            //     photoURL: '1.jpg',
            // })
            updateProfile(userCredential.user, {
                displayName: name, photoURL: '/src/assets/images/avatars/1.jpg'
            })
            .then(()=>{
                
                setUser(auth.currentUser);
                storageUser(auth.currentUser);
                setLoadingAuth(false);
                redirect('/')
                
                console.log('redirect');
                toast.success('Welcome '+name);
            })
            // console.log("Document written with ID: ", docRef.id);
        })
        .catch((error)=>{
            console.log(error);
            toast.error('Something went wrong. Message: '+error.message);
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

    const resetpassword = async (email) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            toast.success('Password reset email sent!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
        });
    }

    const updateUser = (name, photoURL, email) => {

        if(name!==user.displayName || photoURL!==user.photoURL){
            updateProfile(auth.currentUser, {
                displayName: name, photoURL: photoURL
            })
            .then(()=>{
                setUser(auth.currentUser);
                storageUser(auth.currentUser);
            })
            .catch(error=>{
                toast.error(error.message);
                return;
            })
        }

        if(email!==user.email){
            //nao pode, precisa autenticar o email antes de trocar
            // updateEmail(auth.currentUser, email)
            // .catch(error=>{
            //     toast.error(error.message);
            //     return;
            // })
        }

        toast.success('Profile updated successfully.');
    }

    //!! = converter para booleano, se houver valor é true, se vazio é false
    return(
        <AuthContext.Provider 
            value={{
                signed: !!user,
                user,
                loading,
                register,
                logout,
                login,
                loadingAuth, 
                setUser, 
                storageUser, 
                resetpassword,
                updateUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;