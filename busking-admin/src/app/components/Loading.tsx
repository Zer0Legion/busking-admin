import { Spinner } from "@material-tailwind/react"

export default function Loading() {
    return (
        <div className = "flex container items-center justify-center h-screen">
            <Spinner />
        </div>
    )
}