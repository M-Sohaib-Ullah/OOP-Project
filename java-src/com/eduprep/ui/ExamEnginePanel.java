package com.eduprep.ui;

import javax.swing.*;
import java.awt.*;
import com.eduprep.services.GeminiService;

/**
 * Exam Engine Module
 * Simulates timed past-paper environment and collects answers.
 */
public class ExamEnginePanel extends JPanel {

    private JTextArea questionArea;
    private JTextArea answerArea;
    private JButton submitBtn;
    private JLabel feedbackLabel;
    private GeminiService aiService;
    
    public ExamEnginePanel() {
        aiService = new GeminiService();
        setLayout(new BorderLayout(10, 10));
        
        questionArea = new JTextArea("Question: Describe the mechanism of an SN2 reaction.");
        questionArea.setEditable(false);
        answerArea = new JTextArea(10, 50);
        
        submitBtn = new JButton("Submit Answer for AI Grading");
        feedbackLabel = new JLabel("Status: Waiting for submission...");
        
        submitBtn.addActionListener(e -> {
            String feedback = aiService.evaluateAnswer(
                "Describe the mechanism of an SN2 reaction.",
                answerArea.getText(),
                "Must include single step, concerted mechanism, inversion of configuration."
            );
            feedbackLabel.setText("<html>" + feedback.replace("\n", "<br>") + "</html>");
            // Add gamification XP here
        });
        
        add(new JScrollPane(questionArea), BorderLayout.NORTH);
        add(new JScrollPane(answerArea), BorderLayout.CENTER);
        
        JPanel bottomPanel = new JPanel(new BorderLayout());
        bottomPanel.add(submitBtn, BorderLayout.NORTH);
        bottomPanel.add(feedbackLabel, BorderLayout.CENTER);
        add(bottomPanel, BorderLayout.SOUTH);
    }
}
