package com.eduprep.services;

/**
 * Service to connect to Google's Gemini API for grading and flashcard generation.
 */
public class GeminiService {
    
    private final String apiKey;
    
    public GeminiService() {
        // Fetch from environment variables usually
        this.apiKey = System.getenv("GEMINI_API_KEY");
    }
    
    /**
     * Autogrades the student's answer based on the official marking scheme.
     * @param question The exam question
     * @param studentAnswer The student's written response
     * @param markingScheme The official marking scheme text
     * @return Grade and feedback text
     */
    public String evaluateAnswer(String question, String studentAnswer, String markingScheme) {
        System.out.println("Calling Gemini API to evaluate answer...");
        // Build prompt and make REST call or use officially supported Java SDK.
        // Prompt format: "Grade this answer against the scheme: [scheme]. Answer: [answer]"
        return "Score: 3/5.\nFeedback: You missed mentioning the specific catalyst used.";
    }
    
    /**
     * Generates flashcards based on a topic.
     */
    public String generateFlashcards(String topic) {
        System.out.println("Calling Gemini API for flashcards on topic: " + topic);
        return "Q: What is Newton's Second Law? | A: F = ma";
    }
}
