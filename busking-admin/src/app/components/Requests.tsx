import { Button, List, ListItem, ListItemSuffix, Dialog, DialogBody, Drawer, IconButton, Input, Textarea, Typography, Select, Switch, Option } from "@material-tailwind/react";
import getSongRequests from "../firebase/requests/getSongRequests";
import { Key, useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import deleteSong from "../firebase/requests/deleteSong";
import { SongRequest } from "../interfaces/SongRequest";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import addSongData from "../firebase/song_data/addSongData";
import AddSongData from "./AddSongData";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

// Audience submit 1 song: 3 reads
// go on admin page after add song- 497 - 514 = 17 reads, 520
// Refresh admin page 1 read
// delete song 522/19/15 526/20/16

export default function Requests() {
    async function getRequests() {
        console.log("getRequests");
        const requestsRef = collection(db, "requests");
        const q = query(requestsRef, orderBy("created"));

        const querySnapshot = await getDocs(q);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setData(querySnapshot.docs.map(e => { return { data: e.data(), id: e.id } }))
        })
        return querySnapshot.docs.map(e => { return { data: e.data(), id: e.id } })
    }



    const [data, setData] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [songScreenData, setSongScreenData] = useState<any>([null, null]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = (name: string, artist: string) => {
        setDrawerOpen(true);
        setSongScreenData([name, artist]);
    };
    const closeDrawer = () => setDrawerOpen(false);

    const [capoNumber, setCapoNumber] = useState<number>(-1);
    const [capoCElseG, setCapoCElseG] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>("");
    const [nPlayed, setNPlayed] = useState<number>(0);
    const [nRejected, setNRejected] = useState<number>(0);
    const [learned, setLearned] = useState<boolean>(false);

    const handleDialogOpen = () => setDialogOpen(!dialogOpen);

    useEffect(() => {
        console.log("useeffect");
        getRequests().then(d => setData(d)).catch(e => console.log(e));
    }, [])


    // getSongRequests().then(d => setData(d)).catch(e => console.log(e));
    return (
        <div>
            {/* <Button onClick={() => getSongRequests().then(r => console.log(r))}>console log requests</Button> */}
            <List>
                {data && data.map((d: SongRequest) => {
                    return (
                        <ListItem
                            className="text-white bg-blue-gray-400"
                            color="white"
                            key={d.id}
                        >
                            <a href={`./song/${d.data.name}-${d.data.artist}`}>
                            <div className="w-full" onClick={() => {
                                
                            }}>{`${d.data.name}`.concat(d.data.artist === "" ? "" : `- ${d.data.artist}`)}
                            </div>
                            </a>
                            <ListItemSuffix>
                                <div className="flex container gap-2 items-end">
                                    {d.data.remarks && (
                                        <div onClick={handleDialogOpen}>Remarks</div>
                                    )}
                                    <a target="_blank" href={`https://www.google.com/search?q=${d.data.name}+${d.data.artist}+lyrics`}>Lyrics</a>

                                    <Dialog open={dialogOpen} handler={setDialogOpen}>
                                        <DialogBody>{d.data.remarks}</DialogBody>
                                    </Dialog>

                                    <DoneIcon id={d.id} onClick={(e) => {
                                        deleteSong(e.currentTarget.id);
                                        // console.log("get song req after delete")
                                        // getSongRequests().then(d => setData(d)).catch(e => console.log(e));
                                    }} />
                                </div>
                            </ListItemSuffix>

                        </ListItem>
                    )
                })}
                <div></div>
            </List>
        </div>
    )
}