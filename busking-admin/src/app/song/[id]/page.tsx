"use client";

import { Button, Input, Option, Select, Switch, Typography } from "@material-tailwind/react";
import { auth } from "../../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import getSongData from "@/app/firebase/song_data/getSongData";
import addSongData from "@/app/firebase/song_data/addSongData";
import Loading from "@/app/components/Loading";

export default function Song(id: any) {
    const search: string = id.params.id;
    const name: string = search.split("-")[0].replaceAll("%20", " ").trim();
    const artist: string = search.split("-")[1].replaceAll("%20", " ").trim();

    const [songName, setSongName] = useState<string>(name);
    const [songArtist, setSongArtist] = useState<string>(artist);


    const [capoNumber, setCapoNumber] = useState<any>(null);
    const [capoCElseG, setCapoCElseG] = useState<any>(null);
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
        getSongData(name).then(r => {
            setSongData(r); 
            if (r.length == 1) {
                setCapoNumber(r[0].capoNumber);
                setCapoCElseG(r[0].capoCElseG);
                setLearned(r[0].learned);
                setNotes(r[0].notes);
                setSongArtist(r[0].artist);
            } else if (r.length > 1) {
                let match = null;
                for (let i = 0; i < r.length; i++) {
                    let currArtist = r[i].artist;
                    if (currArtist == songArtist) {
                        match = i;
                    }
                }
                if (match == null) {
                    match = 0;
                }
                setCapoNumber(r[match].capoNumber);
                setCapoCElseG(r[match].capoCElseG);
                setLearned(r[match].learned);
                setNotes(r[match].notes);
                setSongArtist(r[match].artist);
            }

        });
      
    }, []);


    return (songData == null) ? <Loading /> : (
        <div>
            <Navbar />
        
            <div className="flex container items-center justify-center mt-3">
                <a href="/./mysongs" className="inline-block relative right-20"> back</a>
                <Typography className="m-3 text-3xl relative right-2" >ADD SONG DATA</Typography>
            </div>


            <div className="flex container items-center gap-3 p-3">
                <Input label="Name" color="white" value={songName} onChange={(r) => { setSongName(r.currentTarget.value.toLowerCase()) }}></Input>
                <Input label="Artist" color="white" value={songArtist} onChange={(r) => { setSongArtist(r.currentTarget.value.toLowerCase()) }}></Input>
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
                    {`${capoNumber ? capoNumber : "_"}${capoCElseG ? "C" : "G"}`}
                </Typography>
            </form>
            <form className="flex container items-center gap-3 px-3">
                <Input label="Additional notes" onChange={(r) => setNotes(r.currentTarget.value)}></Input>
            </form>
            <div className="flex container items-center justify-center gap-3 p-3">
                <Switch onClick={toggleLearned} onChange={(r) => { console.log(r.currentTarget.value) }} label="Learned?"></Switch>
            </div>

            <div className="flex container flex-col items-center gap-2 my-1">
                {/* <div>
                    {`Played: ${nPlayed}`}
                </div>
                <div>
                    {`Rejected: ${nRejected}`}
                </div> */}

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
                <a href="/./mysongs">
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



            {/* <Button onClick={() => {
                console.log(songName);
                console.log(songArtist);
                getSongData(songName, songArtist).then(r => console.log(r))
            }}>get song data</Button>
            <Button onClick={() => console.log(songData)}>console.log songData</Button> */}
        </div>
    )

}