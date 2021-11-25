Feature: To watch and edit past videos that have been saved to there recording log

    As a: police officer 
    I want: to be able to look at past video recordings of the encounter with the PWD
    so that: I can refer to past videos and understand the hand signs

    Scenario: Validate edit recording UI
        Given that I am logged in
        Given that I am on the edit page, "1" section
        Then I should see "Title" and "Transcription" text area
        And I should see "Update Recording" button
        And I should see "destroy" button

    Scenario: Title and Transcript is editable
        Given that I am logged in
        Given that I am on the edit page, "1" section
        When I fill in "#recording_title" with "Sample Title"
        When I fill in "#recording_transcription" with "This is the new transcription"
        And I click on the "Update Recording" button
        Then I should be brought to the "Home" page

    Scenario: Video is destroyed
        Given that I am logged in
        Given that I am on the edit page, "1" section
        And I click on the "destroy" button
        Then a pop up will appear