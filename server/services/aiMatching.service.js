import axios from "axios";

const triggerAIMatching = ({applicationId, job_text, resumeId}) => {
    const url = `${process.env.AI_SERVICE_URL}/application-matching`;
    console.log("[AI Matching] Triggering request...");
    console.log("[AI Matching] URL:", url);
    console.log("[AI Matching] Payload:", { applicationId, resumeId, job_text_length: job_text?.length });

    axios.post(url,
                {
                    applicationId, job_text, resumeId,
                },
                {
                    timeout: 60000, // 60s — AI pipeline (embed + Pinecone + Gemini) can take 10-20s
                    headers: {
                        "Content-Type": "application/json",
                        "X-Internal-Secret": process.env.AI_INTERNAL_SECRET, 
                    }
                }
    )
    .then((res) => {
        console.log("[AI Matching] Request accepted by AI service. Status:", res.status, "| Response:", res.data);
    })
    .catch((error) => {
        console.log("[AI Matching] ERROR:", error.message);
        if (error.response) {
            // AI service replied with an error status (4xx/5xx)
            console.log("[AI Matching] Response status:", error.response.status);
            console.log("[AI Matching] Response body:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.log("[AI Matching] No response received — service may be down or wrong URL");
        }
    });
    
}

export default triggerAIMatching;