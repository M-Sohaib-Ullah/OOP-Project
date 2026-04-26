package com.eduprep;

import javax.swing.*;
import com.eduprep.ui.ExamEnginePanel;
import com.eduprep.ui.DashboardPanel;

/**
 * Main application window.
 */
public class MainFrame extends JFrame {

    public MainFrame() {
        setTitle("EduPrep AI - CAIE Exam Preparation");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        JTabbedPane tabbedPane = new JTabbedPane();
        tabbedPane.add("Dashboard", new DashboardPanel());
        tabbedPane.add("Exam Engine", new ExamEnginePanel());
        // tabbedPane.add("Leaderboard", new LeaderboardPanel()); // To be implemented
        
        add(tabbedPane);
        setLocationRelativeTo(null);
    }
}
