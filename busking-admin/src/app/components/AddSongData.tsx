import { Button, Dialog, DialogBody, Input, Select, Switch, Option, IconButton } from "@material-tailwind/react"
import addSongData from "../firebase/song_data/addSongData"
import { useState } from "react";

export default function AddSongData({ name, artist }: { name: string, artist: string }) {

    const [songScreenOpen, setSongScreenOpen] = useState(false);

    console.log(name, artist)

    return (
                <div className="w-screen"> 
                    <div>
                        {`${name}`.concat(artist ? artist : "") }
                    </div>


                    <Input placeholder="Additional Notes"></Input>
                    <Switch label="C shape?" ></Switch>
                    <Select>
                        <Option>1</Option>
                    </Select>

                    {/* <Button onClick={() => {
                        addSongData({
                            name: name,
                            artist: artist,
                            capoNumber: capoNumber,
                            capoCElseG: capoCElseG,
                            notes: notes,
                            nPlayed: nPlayed,
                            nRejected: nRejected,
                            learned: learned
                        })
                    }}>add song data</Button> */}
                </div>

    )
}