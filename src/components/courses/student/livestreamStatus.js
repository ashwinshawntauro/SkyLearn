import { useEffect, useState } from "react";
import { Button } from "../../ui/button";

export default function Page({ livestreamId, userId, course_id }) {
    const [status, setStatus] = useState(null); // State to hold the status
    const [error, setError] = useState(null); // State to hold error messages
    console.log(course_id.course_id)

    const getStatus = async (livestreamId, userId) => {
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
        const courseids =course_id.course_id
        try {
            const response = await fetch("/api/raiseToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, livestreamId, courseids}),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token; // Get the JWT token from the response
                console.log("Generated JWT Token:", token); // Log the token to the console
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
            getStatus(livestreamId, userId);
        }
    }, [livestreamId, userId]);

    return (
        <div>
            {error ? (
                <div className="text-red-500 font-semibold mb-2">{error}</div>
            ) : status === null ? (
                <div>Loading status...</div>
            ) : (
                <div>
                    <div
                        className={`font-semibold ${status === "Present" ? "text-green-500" : "text-red-500"}`}
                    >
                        Status: {status}
                    </div>
                    {status !== "Present" && (
                        <Button
                            onClick={raiseToken}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                        >
                            Raise Token
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
