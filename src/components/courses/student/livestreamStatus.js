import { useEffect, useState } from "react";
import { Button } from "../../ui/button";

export default function Page({ livestreamId, userId, course_id }) {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [tokenPresent,settokenPresent] = useState(null);
    const courseids = course_id.course_id

    const getStatus = async (livestreamId, userId,courseids) => {
        try {
            const response = await fetch(`/api/getTokenStudent?userId=${userId}&livestreamId=${livestreamId}&courseids=${courseids}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // const data = await response.json();
                settokenPresent(true)
            } 
        } catch (error) {
            console.error("Error raising token:", error);
        }
        try {
            const response = await fetch(`/api/getStudentClass?userId=${userId}&livestreamId=${livestreamId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStatus(data.status);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "An error occurred while fetching status");
            }
        } catch (error) {
            console.error("Error fetching status:", error);
            setError("Failed to fetch status. Please try again later.");
        }
    };
    const raiseToken = async () => {
        try {
            const response = await fetch("/api/raiseToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, livestreamId, courseids }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Token raised successfully!");
            } else {
                const errorData = await response.json();
                console.error("Error generating token:", errorData.error);
            }
        } catch (error) {
            console.error("Error raising token:", error);
        }
    };

    useEffect(() => {
        if (livestreamId && userId) {
            getStatus(livestreamId, userId,courseids);
        }
    }, [livestreamId, userId]);

    return (
        <div>
            {error ? (
                <div className="text-red-500 font-semibold font-sans mb-2">{error}</div>
            ) : status === null ? (
                <div>Loading status...</div>
            ) : (
                <div className="py-2">
                    <div
                        className={`font-serif ${status === "Present" ? "text-green-500" : "text-red-500"}`}
                    >
                        Status: {status}
                    </div>
                    {tokenPresent==false ? (
                    <div>
                    {status !== "Present" && (
                        <Button
                            onClick={raiseToken}
                            className="bg-primary font-semibold text-white px-4 py-2 rounded-lg hover:bg-primary-light"
                        >
                            Raise Token
                        </Button>
                    )}
                    </div>
                    ): tokenPresent==true?(
                        <Button disabled>Request sent</Button>
                    ): (<span></span>)}
                </div>
            )}
        </div>
    );
}
