import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast";

export default function Page({ livestreamId, userId, course_id }) {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [tokenPresent, settokenPresent] = useState(null);
    const courseids = course_id.course_id
    const { toast } = useToast()

    const getStatus = async (livestreamId, userId, courseids) => {
        try {
            const response = await fetch(`/api/Token/getTokenStudent?userId=${userId}&livestreamId=${livestreamId}&courseids=${courseids}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                settokenPresent(true)
            }
            else {
                settokenPresent(false)
            }
        } catch (error) {
            console.error("Error raising token:", error);
        }
        try {
            const response = await fetch(`/api/Livestreams/getStudentClass?userId=${userId}&livestreamId=${livestreamId}`, {
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
            const response = await fetch("/api/Token/raiseToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, livestreamId, courseids }),
            });

            if (response.ok) {
                toast({
                    variant: "failure",
                    title: "SkyLearn",
                    description: "Dont worry! Token raised successfully!",
                })
                getStatus(livestreamId, userId, courseids);
            } else {
                const errorData = await response.json();
                console.error("Error generating token:", errorData.error);
                toast({
                    variant: "failure",
                    title: "SkyLearn",
                    description: "Sorry! Couldnt raise token",
                })
            }
        } catch (error) {
            console.error("Error raising token:", error);
            toast({
                variant: "failure",
                title: "SkyLearn",
                description: "Sorry! There was an issue",
            })
        }
    };

    useEffect(() => {
        if (livestreamId && userId) {
            getStatus(livestreamId, userId, courseids);
        }
    }, [livestreamId, userId]);

    return (
        <div>
            {error ? (
                <div className="text-red-500 font-semibold font-sans mb-2">{error}</div>
            ) : status === null ? (
                <div className="py-2">
                    <div className="font-serif inline-flex">
                        <Skeleton className="w-6 h-6" />
                        <Skeleton className="ml-2 w-32 h-6" />
                    </div>

                    <div className="mt-4">
                        <Skeleton className="w-40 h-10 rounded-lg" />
                    </div>
                </div>
            ) : (
                <div className="py-2">
                    <div
                        className={`font-serif ${status === "Present" ? "text-green-500" : "text-red-500"} inline-flex`}
                    >
                        {status === "Present" ? (<svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clipRule="evenodd" />
                        </svg>) :
                            (<svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                            </svg>
                            )}
                        Attendance : {status}
                    </div>
                    {!tokenPresent ? (
                        <div>
                            {status !== "Present" && (
                                <Button
                                    onClick={raiseToken}
                                    className="bg-primary px-5 font-semibold text-white py-2 rounded-lg hover:bg-primary-light"
                                >
                                    Raise Token
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Button disabled className="flex px-5">Request sent</Button>
                    )}
                </div>
            )}
        </div>
    );
}
