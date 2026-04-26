package com.eduprep.ui;

import javax.swing.*;
import java.awt.*;
import com.eduprep.services.GeminiService;

/**
 * Flashcard Generator Module
 * Automatically generates study flashcards.
 */
public class FlashcardPanel extends JPanel {

    private JTextField topicField;
    private JButton generateBtn;
    private JTextArea flashcardArea;
    private GeminiService aiService;

    public FlashcardPanel() {
        aiService = new GeminiService();
        setLayout(new BorderLayout(10, 10));

        JPanel topPanel = new JPanel();
        topPanel.add(new JLabel("Topic:"));
        topicField = new JTextField(20);
        topPanel.add(topicField);
        generateBtn = new JButton("Generate Flashcards");
        topPanel.add(generateBtn);

        flashcardArea = new JTextArea(10, 50);
        flashcardArea.setEditable(false);

        generateBtn.addActionListener(e -> {
            String flashcards = aiService.generateFlashcards(topicField.getText());
            flashcardArea.setText(flashcards);
        });

        add(topPanel, BorderLayout.NORTH);
        add(new JScrollPane(flashcardArea), BorderLayout.CENTER);
    }
}
