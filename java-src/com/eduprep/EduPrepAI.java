package com.eduprep;

import javax.swing.SwingUtilities;

/**
 * Main entry point for EduPrep AI Desktop Application
 * Initializes the Java GUI and Firebase Connection.
 */
public class EduPrepAI {

    public static void main(String[] args) {
        System.out.println("Starting EduPrep AI Desktop Platform...");
        // Initialize Firebase
        FirebaseService.initialize();
        
        // Launch GUI
        SwingUtilities.invokeLater(() -> {
            MainFrame mainFrame = new MainFrame();
            mainFrame.setVisible(true);
        });
    }
}
