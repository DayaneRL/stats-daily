import {createContext, useState, useEffect } from "react";
// import firebase from '../services/connection';
// import { toast } from "react-toastify";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut, sendPasswordResetEmail, updateProfile, updateEmail, sendEmailVerification, verifyBeforeUpdateEmail } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, query, where, collectionGroup, getDoc, setDoc, doc } from "firebase/firestore";  
import db from "../services/connection";
import { toast } from "sonner";
import { redirect } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const AuthContext = createContext({});

function AuthProvider({children}){
    // const usersRef = collection(db, 'users');
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
           
            // let uid = value.user.uid;
            let userProfile = auth.currentUser;
            
            if (userProfile) {
                setUser(userProfile);
                storageUser(userProfile);
                setLoadingAuth(false);
            }
            toast.success(`Welcome ${userProfile?.displayName??''}!`);
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
            
            updateProfile(userCredential.user, {
                displayName: name, photoURL: '/src/assets/images/avatars/1.jpg'
            })
            .then(()=>{
                
                setUser(auth.currentUser);
                storageUser(auth.currentUser);
                setLoadingAuth(false);
                redirect('/');
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
        let userData = {
            uid: data.uid,
            email: data.email,
            emailVerified: data.emailVerified,
            displayName: data.displayName,
            photoURL: data.photoURL,
            lastLoginAt: data.lastLoginAt,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    async function logout(){
        setLoadingAuth(true);
        await signOut(auth);
        localStorage.removeItem('userData');
        setUser(null);
        setLoadingAuth(false);
    }

    const resetPassword = async (email) => {
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

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            toast.success('Verification email sent');
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    const updateUser = (name, photoURL) => {

        if(name!==user.displayName || photoURL!==user.photoURL){
            updateProfile(auth.currentUser, {
                displayName: name, photoURL: photoURL
            })
            .then(()=>{
                setUser(auth.currentUser);
                storageUser(auth.currentUser);
                toast.success('Profile updated successfully.');
            })
            .catch(error=>{
                toast.error(error.message);
                return;
            })
        }
    }

    const updateEmail = () => {
        // verifyBeforeUpdateEmail(auth.currentUser, email)
        // .then(()=>{
        //  toast.success('Please verify the new email to complete action'))
        //  logout()
        // }
        // .catch(error=>{
        //     toast.error(error.message);
        //     return;
        // })
    }

    async function uploadUserPhoto(image){   
        
        const formData = new FormData();
        formData.append('image', image, image?.name);

        const key = import.meta.env.VITE_imgbb_key;
        await fetch('https://api.imgbb.com/1/upload?key='+key, {
          method: 'POST',  
          body: formData,
        })
        .then(response => response.json())
        .then(({data}) => {
            console.log('Uploaded a blob or file!');
            console.log(data);

            //update profile
            updateProfile(auth.currentUser, {
                displayName: auth.currentUser.displayName, photoURL: data?.url
            })
            .then(()=>{
                setUser(auth.currentUser);
                storageUser(auth.currentUser);
            })
        });

    }

    const changeUserPassword = (newPassword) => {
        updatePassword(auth.currentUser, newPassword)
        .then(() => {
            // Update successful.
        }).catch((error) => {
        // An error ocurred
        // ...
        });
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
                resetPassword,
                updateUser,
                uploadUserPhoto,
                verifyEmail
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;