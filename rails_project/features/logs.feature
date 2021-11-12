Feature: To have a log of past video recordings, police officer’s notes and 
        the transcription.


    As a: police officer 
    I want: to be able to look at past video recordings of the encounter with the PWD
    so that: I can refer to past videos and understand the hand signs

    Scenario: finding a relevant video among past recorded videos
        Given that I am at "index" section of "recording" page
        Then I should see a logs table
        And I should see 'Title', 'Date' and 'Edit'

    Scenario: link to correct past video screen
        Given that I want to rewatch a past recording
        When I click on the "Edit" button
        Then I should redirected to the correct page with the video
