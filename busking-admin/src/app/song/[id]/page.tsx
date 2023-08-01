"use client";

import { Button, Input, Option, Select, Switch, Typography } from "@material-tailwind/react";
import { auth } from "../../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import getSongData from "@/app/firebase/song_data/getSongData";
import addSongData from "@/app/firebase/song_data/addSongData";

export default function Song(id: any) {
    const search: string = id.params.id;
    const name: string = search.split("-")[0].replace("%20", " ");
    const artist: string = search.split("-")[1].replace("%20", " ")

    const [songName, setSongName] = useState<string>(name);
    const [songArtist, setSongArtist] = useState<string>(artist);


    const [capoNumber, setCapoNumber] = useState<any>(-1);
    const [capoCElseG, setCapoCElseG] = useState<boolean>(false);
    const toggleCElseG = () => setCapoCElseG(!capoCElseG);
    const [notes, setNotes] = useState<string>("");
    const [nPlayed, setNPlayed] = useState<number>(0);
    const incrementNPlayed = () => setNPlayed(nPlayed + 1);
    const [nRejected, setNRejected] = useState<number>(0);
    const incrementNRejected = () => setNRejected(nRejected + 1);
    const [learned, setLearned] = useState<boolean>(false);
    const toggleLearned = () => setLearned(!learned);

    const [songData, setSongData] = useState<any>(null);



    const [user] = useAuthState(auth);

    useEffect(() => {
        console.log("useEffect from song/id")
        getSongData(name, artist).then(r => setSongData(r))
    }, []);


    return (
        <div>
            <Navbar />
            <div className="flex container items-center justify-center mt-3">
                <a href="/./mysongs" className="inline-block relative right-20"> back</a>
                <Typography className="m-3 text-3xl relative right-2" >ADD SONG DATA</Typography>
            </div>


            <div className="flex container items-center gap-3 p-3">
                <Input label="Name" color="white" value={songName} onChange={(r) => { setSongName(r.currentTarget.value.trim().toLowerCase()) }}></Input>
                <Input label="Artist" color="white" value={songArtist} onChange={(r) => { setSongArtist(r.currentTarget.value.trim().toLowerCase()) }}></Input>
            </div>
            <form className="flex container items-center gap-3 p-3">
                <Select onChange={(e) => { setCapoNumber(e) }} size="md">
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                </Select>
                <Switch onClick={toggleCElseG} label="C?"></Switch>
                <Typography className={"text-2xl".concat(capoNumber == "-1" ? " text-red-500" : "")}>
                    {`${capoNumber}${capoCElseG ? "C" : "G"}`}
                </Typography>
            </form>
            <form className="flex container items-center gap-3 px-3">
                <Input label="Additional notes" onChange={(r) => setNotes(r.currentTarget.value)}></Input>
            </form>
            <div className="flex container items-center justify-center gap-3 p-3">
                <Switch onClick={toggleLearned} onChange={(r) => { console.log(r.currentTarget.value) }} label="Learned?"></Switch>
            </div>

            <div className="flex container flex-col items-center gap-2 my-1">
                <div>
                    {`Played: ${nPlayed}`}
                </div>
                <div>
                    {`Rejected: ${nRejected}`}
                </div>
                <a href="/">
                    <Button className="mt-8" onClick={() => {
                        addSongData({
                            name: songName,
                            artist: songArtist,
                            capoNumber: capoNumber,
                            capoCElseG: capoCElseG,
                            notes: notes,
                            nPlayed: nPlayed,
                            nRejected: nRejected,
                            learned: learned
                        })
                    }}>add- Back to Home Page</Button>
                </a>
                <a href="/">
                    <Button className="" onClick={() => {
                        addSongData({
                            name: songName,
                            artist: songArtist,
                            capoNumber: capoNumber,
                            capoCElseG: capoCElseG,
                            notes: notes,
                            nPlayed: nPlayed,
                            nRejected: nRejected,
                            learned: learned
                        })
                    }}>add- Back to My Songs</Button>
                </a>
                <a href={`./-`}>
                    <Button className="" onClick={() => {
                        addSongData({
                            name: songName,
                            artist: songArtist,
                            capoNumber: capoNumber,
                            capoCElseG: capoCElseG,
                            notes: notes,
                            nPlayed: nPlayed,
                            nRejected: nRejected,
                            learned: learned
                        })
                    }}>add another song</Button>
                </a>
            </div>



            {/* <Button onClick={() => { getSongData(name, artist).then(r => console.log(r)) }}>get song data</Button> */}
        </div>
    )

}