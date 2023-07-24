"use client";

import Navbar from "../components/Navbar";
import { auth } from "../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, List, ListItem, Spinner, Typography } from "@material-tailwind/react";
import getSongData from "../firebase/song_data/getAllSongData";
import { useEffect, useState } from "react";
import SongData from "../interfaces/SongData";

export default function MySongs() {

    const [user] = useAuthState(auth);
    const [songData, setSongData] = useState<any>([]);

    useEffect(() => {
        console.log("useEffect: my songs");
        getSongData().then(r => setSongData(r));
    }, [])

    return user && (user.email == "lengkhai@gmail.com" || user.email == "jancycheeqianshi@gmail.com") ? (
        <div>
            <Navbar></Navbar>

            <div className="m-2 flex container justify-evenly items-center">
                <Typography>MY SONGS</Typography>
                <a href={`./song/-`}>
                    <Button>
                        Add Song
                    </Button>
                </a>
            </div>

            {songData ? <List>
                {songData.map((r: SongData) => (
                    <ListItem
                        className="text-white bg-blue-gray-400"
                        color="white"
                        key={`${r.name}-${r.artist}`}
                    >
                        <a className="" href={`./song/${r.name}-${r.artist}`}>
                            <div key={r.name.concat(r.artist)}>
                                {r.name} {r.artist ? `-${r.artist}` : ""}
                            </div>
                        </a>
                    </ListItem>
                ))}
            </List> : <div />}

        </div>
    ) : (<div className="h-screen w-screen flex container justify-center items-center"><Spinner /></div>)
}
