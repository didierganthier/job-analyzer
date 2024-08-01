import axios from 'axios';


const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.API_KEY}`;

export const generateContent = async (job: string) => {
    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `You are an advanced AI language model specialized in job market analysis. I will provide you with a job post, and you will analyze it to extract key information. Please provide the following details from the job post:

                            1. **Job Title**: The official title of the job.
                            2. **Company Name**: The name of the company offering the job.
                            3. **Location**: The location where the job is based.
                            4. **Years of Experience Required**: The minimum years of experience required for the job.
                            5. **Skills and Qualifications**: A list of specific skills and qualifications required for the job.
                            6. **Responsibilities**: The primary responsibilities and duties associated with the job.
                            7. **Salary Range**: The salary range offered for the position (if mentioned).
                            8. **Education Requirements**: The educational qualifications required for the job.
                            9. **Application Instructions**: The preferred method and instructions for applying to the job.
                            10. **Other Insights**: Any additional useful information, such as company culture, benefits, or special requirements.

                            Here is the job post for analysis: ${job}
 `
                    }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(API_URL, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
};
