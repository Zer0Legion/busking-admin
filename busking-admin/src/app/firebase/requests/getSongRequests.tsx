import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config";

export default async function getSongRequests() {
    const requestsRef = collection(db, "requests");
    const q = query(requestsRef, orderBy("created"));
    const songs: any[] = [];

    const querySnapshot = await getDocs(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            songs.push(doc.data().name);
        });
    })
    return querySnapshot.docs.map(e => { return { data: e.data(), id: e.id } })
}