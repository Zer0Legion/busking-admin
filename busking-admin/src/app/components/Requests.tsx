import { Button, List, ListItem, ListItemSuffix, Dialog, DialogBody, Drawer, IconButton, Input, Textarea, Typography, Select, Switch, Option } from "@material-tailwind/react";
import getSongRequests from "../firebase/requests/getSongRequests";
import { Key, useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import deleteSong from "../firebase/requests/deleteSong";
import { SongRequest } from "../interfaces/SongRequest";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import React from "react";


export default function Requests() {
    async function getRequests() {
        const requestsRef = collection(db, "requests");
        const q = query(requestsRef, orderBy("created"));

        const querySnapshot = await getDocs(q);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setData(querySnapshot.docs.map(e => { return { data: e.data(), id: e.id } }))
        })
        return querySnapshot.docs.map(e => { return { data: e.data(), id: e.id } })
    }

    const [data, setData] = useState<any>(null);

    const [capoNumber, setCapoNumber] = useState<number>(-1);
    const [capoCElseG, setCapoCElseG] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>("");
    const [nPlayed, setNPlayed] = useState<number>(0);
    const [nRejected, setNRejected] = useState<number>(0);
    const [learned, setLearned] = useState<boolean>(false);


    useEffect(() => {
        getRequests().then(d => setData(d)).catch(e => console.log(e));
    }, [])

    return (
        <div>
            {/* {songScreenData[0]} { songScreenData[1] } {songScreenData[2]} */}
            {/* <Button onClick={() => getSongRequests().then(r => console.log(r))}>console log requests</Button> */}
            <List>
                {data && data.map((d: SongRequest) => {
                    return (
                        <div key={d.id}>
                            <ListItem
                                className= {d.data.remarks ? "text-white bg-blue-gray-400 rounded-b-none" : "text-white bg-blue-gray-400"} 
                                color="white"
                                onClick={() => {
                                }}
                            >
                                <a href={`./song/${d.data.name}-${d.data.artist}`}>
                                    <div className="w-full" onClick={() => {

                                    }}>{`${d.data.name}`.concat(d.data.artist === "" ? "" : `- ${d.data.artist}`)}
                                    </div>
                                </a>
                                <ListItemSuffix>
                                    <div className="flex container gap-2 items-end">

                                        <a target="_blank" href={`https://www.google.com/search?q=${d.data.name}+${d.data.artist}+lyrics`}>Lyrics</a>

                                        <DoneIcon id={d.id} onClick={(e) => {
                                            deleteSong(e.currentTarget.id);
                                            // console.log("get song req after delete")
                                            // getSongRequests().then(d => setData(d)).catch(e => console.log(e));
                                        }} />
                                    </div>
                                </ListItemSuffix>


                            </ListItem>
                            {d.data.remarks ? (
                                <ListItem className="text-white bg-blue-gray-200 rounded-t-none" color="white">
                                    {d.data.remarks}
                                </ListItem>
                            ) : <span></span>}
                        </div>
                    )
                })}
                <div></div>
            </List>
        </div>
    )
}