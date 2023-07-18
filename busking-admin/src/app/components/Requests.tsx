import { Button, List, ListItem, ListItemSuffix, Dialog, DialogBody } from "@material-tailwind/react";
import getSongRequests from "../firebase/getSongRequests";
import { Key, useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import deleteSong from "../firebase/deleteSong";

interface Song {
    data: {
        name: string,
        artist: string,
        remarks: string
    },
    id: string

}

export default function Requests() {
    const [data, setData] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpen = () => setDialogOpen(!dialogOpen);

    useEffect(() => {
        getSongRequests().then(d => setData(d)).catch(e => console.log(e));
    }, [data])


    // getSongRequests().then(d => setData(d)).catch(e => console.log(e));
    return (
        <div>
            {/* <Button onClick={() => getSongRequests().then(r => console.log(r))}>console log requests</Button> */}
            <List>
                {data && data.reverse().map((d: Song) => {
                    return (
                        <ListItem
                            className="text-white bg-blue-gray-400"
                            color="white"
                            key={d.data.name}
                        >
                            <div className="w-full" onClick={() => {
                                console.log("clicking")
                            }}>{`${d.data.name} - ${d.data.artist}`}</div>
                            
                            <ListItemSuffix>
                                <div className="flex container gap-2 items-end">
                                    {d.data.remarks && (
                                        <div onClick={handleOpen}>Remarks</div>
                                    )}
                                    <Dialog open={dialogOpen} handler={setDialogOpen}>
                                        <DialogBody>{d.data.remarks}</DialogBody>
                                    </Dialog>

                                    <DoneIcon id={d.id} onClick={(e) => {
                                        deleteSong(e.currentTarget.id);
                                        getSongRequests().then(d => setData(d)).catch(e => console.log(e));
                                    }} />
                                </div>
                            </ListItemSuffix>

                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}