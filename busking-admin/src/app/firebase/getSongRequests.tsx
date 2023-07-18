import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

export default async function getSongRequests() {
    const querySnapshot = await getDocs(collection(db, "requests"));
    return querySnapshot.docs.map(e => {return {data: e.data(), id: e.id}})
}