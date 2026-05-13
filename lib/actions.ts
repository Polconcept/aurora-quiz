"use server";

export async function saveQuizSubmission(assessment: {
  condition: string;
  duration: string;
  tried: string;
  seriousness: string;
}) {
  const webhookUrl = process.env.LATENODE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("LATENODE_WEBHOOK_URL is not defined in environment variables");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...assessment,
        source: "Quiz Flow",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send lead to Latenode: ${response.statusText}`);
    }

    console.log("Lead successfully sent to Latenode/Airtable");
  } catch (error) {
    console.error("Error sending lead to Latenode:", error);
  }
}
