import { useState } from "react";
import axios from 'axios'

export default function useAvailabilities() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<{ time: string; available: boolean }[] | null>(null);

    const fetchAvailability = async ({ slug, partySize, day, time }: { slug: string, partySize: string, day: string, time: string }) => {

        setLoading(true)
        try {
            console.log("hi")
            const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability`, {
                params: {
                    day,
                    time,
                    partySize
                }
            });
            setLoading(false);
            console.log("response", response)
            setData(response.data)
        }
        catch (err: any) {
            setLoading(false);
            setError(err.response.data.errorMessage)
        }
    }

    return { loading, data, error, fetchAvailability };
}