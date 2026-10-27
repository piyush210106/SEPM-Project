import axios from "axios";

const triggerAIprocessing = ({resume_id, resume_url, firebase_uid}) => {
    const url = `${process.env.AI_SERVICE_URL}/process-resume`;

    axios.post(url,
                {
                    resume_id, resume_url, firebase_uid,
                },
                {
                    timeout: 60000,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Internal-Secret": process.env.AI_INTERNAL_SECRET, 
                    }
                }
    )
    .then((res) => {
        console.log("[AI Processing] Request accepted. Status:", res.status, "| Response:", res.data);
    })
    .catch((error) => {
        console.log("[AI Processing] ERROR:", error.message);
        if (error.response) {
            console.log("[AI Processing] Response status:", error.response.status);
            console.log("[AI Processing] Response body:", error.response.data);
        } else if (error.request) {
            console.log("[AI Processing] No response received — service may be down or wrong URL");
        }
    });

}

export default triggerAIprocessing;
