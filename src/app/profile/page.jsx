/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import useAuth from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import React, { useCallback, useMemo, useState } from 'react'
import styles from "./formInfos.module.css";
import utils from "./utils.module.css";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { updateProfile, getAuth, updatePassword, linkWithPhoneNumber, updateEmail, verifyBeforeUpdateEmail, sendEmailVerification } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
const page = () => {
    const auth = getAuth();
    const { loading, user, setUser } = useAuth();
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState()
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const { theme } = useTheme()
    const handleProfileChange = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(getStorage(), `profile/${user.uid}`);

        try {
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef);
            await updateProfile(auth.currentUser, { photoURL: photoURL });
            const updatedUser = { ...user, photoURL };
            setUser(updatedUser);
        } catch (error) {
            toast.error(error);
        }
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await updateProfile(auth.currentUser, { displayName: user.displayName });
            await updatePassword(auth.currentUser, password);
            await updateEmail(auth.currentUser, email)
            const userDocRef = doc(db, 'users', auth.currentUser.uid);
            await setDoc(userDocRef, {
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                providerId: 'email&password',
                bio: bio,
                username: auth.currentUser.displayName,
            });
            toast.success("Profile updated successfully.");
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handlePhoneNoChange = async (e) => {
        e.preventDefault()
        try {
            await linkWithPhoneNumber(auth.currentUser, phone)
            toast.success("Phone number added successfully.");
        } catch (error) {
            toast.error(error.message);
        }
    }
    const emailVerification = async (e) => {
        e.preventDefault()
        if (auth.currentUser.emailVerified == true) {
            toast.success("Email already verified");
        }
        else {
            try {
                await sendEmailVerification(auth.currentUser)
                toast.success("Email verification sent successfully ");
            } catch (error) {
                toast.error(error.message);
            }
        }
    }
    const newEmailVerification = async (e) => {
        e.preventDefault()
        try {
            await verifyBeforeUpdateEmail(auth.currentUser, email)
            toast.success("mail verification sent successfully to the new Email.");
        } catch (error) {
            toast.error(error.message);
        }
    }
    console.log(user, auth.currentUser);
    return (
        <div
            className={`min-h-screen p-4 flex flex-col gap-6
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
      `}
        >
            <div className={styles.container}>
                <Link className={styles.link} href="/">
                    <svg
                        className={styles.linkIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                    <span>Back</span>
                </Link>
                <div className={styles.formEditWrapper}>
                    <div className={utils.header}>
                        <h1 className={utils.heading}>Change Info</h1>
                        <p className={utils.description}>
                            Changes will be reflected to every services
                        </p>
                        {
                            auth.currentUser.providerData[0].providerId == 'password' && (
                                <>
                                    <button
                                        className='
                                        bg-blue-500 
                                        hover:bg-blue-700 
                                        text-white 
                                        font-bold 
                                        h-12
                                        py-2 
                                        px-4 
                                        rounded 
                                        focus:outline-none 
                                        focus:shadow-outline
                                        '
                                        onClick={emailVerification}

                                    >VerifyEmail</button>
                                </>
                            )
                        }

                    </div>
                    <form className={styles.formEdit} method="POST">
                        <div className={styles.profileGroup}>
                            <div className={styles.profile}>
                                {user?.photo !== "" ? (
                                    <img
                                        src={user?.photoURL ? user?.photoURL : '/avatars/01.png'}
                                        style={{ width: "auto", height: "72px" }}
                                        alt=""
                                    />
                                ) : (
                                    <></>
                                )}
                                <input
                                    id="profile"
                                    type="file"
                                    onChange={handleProfileChange}
                                    hidden
                                />
                                <div className={styles.profileOver}>
                                    <label htmlFor="profile">
                                        <svg
                                            className={styles.profileIcon}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx="12" cy="12" r="3.2" />
                                            <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            <label htmlFor="profile" className={styles.profileLabel}>
                                CHANGE PHOTO
                            </label>
                        </div>

                        <div className={styles.inputs}>
                            <div className={styles.iptGroup}>
                                <label className={styles.iptLabel} htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className={styles.ipt}
                                    id="name"
                                    type="text"
                                    value={user.displayName}
                                    onChange={(e) => setUser({ ...user, displayName: e.target.value })}
                                    placeholder="Enter your name..."
                                />
                            </div>
                            <div className={styles.iptGroup}>
                                <label className={styles.iptLabel} htmlFor="bio">
                                    Bio
                                </label>
                                <textarea
                                    className={styles.textarea}
                                    id="bio"
                                    placeholder="Enter your bio..."
                                    value={bio}
                                    onChange={
                                        (e) => setBio(e.target.value)
                                    }
                                    rows={3}
                                ></textarea>
                            </div>
                            {auth.currentUser.providerData[0].providerId == 'password' && (
                                <>
                                    <div className={styles.iptGroup}>
                                        <label className={styles.iptLabel} htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className={styles.ipt}
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={
                                                (e) => setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email..."
                                        />
                                        <button
                                            className='
                                        bg-blue-500 
                                        hover:bg-blue-700 
                                        text-white 
                                        font-bold 
                                        h-12
                                        py-2 
                                        px-4 
                                        rounded 
                                        focus:outline-none 
                                        focus:shadow-outline
                                        '
                                            onClick={newEmailVerification}
                                        >VerifyNewEmail</button>
                                    </div>
                                    <div className={styles.iptGroup}>
                                        <label className={styles.iptLabel} htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            className={styles.ipt}
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={
                                                (e) => setPassword(e.target.value)
                                            }
                                            placeholder="Enter your new password..."
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <button className={styles.btn}
                            {
                            ...auth.currentUser.emailVerified == false ? 'disabled' : ''
                            }
                            onClick={handleClick}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default page
