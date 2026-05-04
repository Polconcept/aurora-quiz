"use server";

import { db } from "./db";
import { quizSubmissions } from "./db/schema";
import { auth } from "./auth";
import { v4 as uuidv4 } from "uuid";

export async function saveQuizSubmission(assessment: {
  condition: string;
  duration: string;
  tried: string;
  seriousness: string;
}) {
  const session = await auth();
  
  await db.insert(quizSubmissions).values({
    id: uuidv4(),
    userId: session?.user?.id || null,
    condition: assessment.condition,
    duration: assessment.duration,
    tried: assessment.tried,
    seriousness: assessment.seriousness,
    createdAt: new Date(),
  });
}
