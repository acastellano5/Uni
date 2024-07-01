import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { useGlobalContext } from "../context/globalProvider";

import firestore, { query } from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('User');
const groupCollection = firestore().collection('Group')
const db = firestore()

//_______________________________________________________________
export async function getGroupById(id) {
    const {orgId} = useGlobalContext()
    const returningArray = []
    try {
        if (id) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("id", '==', id)
            .get()
            for(const key of groups.docs)
                {
                    console.log(key.data());
                }
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getGroupByName(name) {
    const {orgId} = useGlobalContext()
    const returningArray = []
    try {
        if (name) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("name", '==', name)
            .get()
            for(const key of groups.docs)
                {
                    console.log(key.data());
                }
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getAllGroups() {
    const {orgId} = useGlobalContext()
    const returningArray = []
    try {
        
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .get()
            for(const key of groups.docs)
                {
                    console.log(key.data());
                }
        

    } catch (error) {
        console.log(error);
    }
}

export async function getGroupByCategory(category) {
    const {orgId} = useGlobalContext()
    const returningArray = []
    try {
        if (category) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("category", '==', category)
            .get()
            for(const key of groups.docs)
                {
                    console.log(key.data());
                }
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getGroupByDescription(id) {
    const {orgId} = useGlobalContext()
    const returningArray = []
    try {
        if (id) {
            console.log("Hi");
            const groups = await groupCollection
            .where('orgId','==', orgId)
            .where("description", 'in', id)
            .get()
            for(const key of groups.docs)
                {
                    console.log(key.data());
                }
        }

    } catch (error) {
        console.log(error);
    }
}
//_______________________________________________________________