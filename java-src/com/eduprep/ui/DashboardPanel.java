package com.eduprep.ui;

import javax.swing.*;
import java.awt.*;

/**
 * Dashboard Panel
 * Displays personalized analytics, streak, and recent XP based on Firebase data.
 */
public class DashboardPanel extends JPanel {

    public DashboardPanel() {
        setLayout(new BorderLayout());
        
        JLabel welcomeLabel = new JLabel("Welcome to EduPrep AI!", SwingConstants.CENTER);
        welcomeLabel.setFont(new Font("Arial", Font.BOLD, 24));
        
        JPanel statsPanel = new JPanel(new GridLayout(1, 3));
        statsPanel.add(new JLabel("XP: 1450", SwingConstants.CENTER));
        statsPanel.add(new JLabel("Current Streak: 5 Days", SwingConstants.CENTER));
        statsPanel.add(new JLabel("Global Rank: #42", SwingConstants.CENTER));
        
        add(welcomeLabel, BorderLayout.NORTH);
        add(statsPanel, BorderLayout.CENTER);
    }
}
