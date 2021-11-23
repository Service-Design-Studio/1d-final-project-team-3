Feature: To have a log of past video recordings, police officer’s notes and 
        the transcription.


    As a: police officer 
    I want: to be able to look at past video recordings of the encounter with the PWD
    so that: I can refer to past videos and understand the hand signs

    Scenario: finding a relevant video among past recorded videos
        Given that I am on the "Recording Logs" page
        Then I should see a logs table
        And I should see Title, Date and Edit
        And I should see "Home" button

    Scenario: link to correct past video screen
        Given that I am on the "Recording Logs" page
        When I click on the "Edit" button
        Then I should be brought to the corresponding "1" page
    
    Scenario: link to back to home 
        Given that I am on the "Recording Logs" page
        When I click on the "Home" button
        Then I should be brought to the "user" page
