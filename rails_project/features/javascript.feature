Feature: To have a video recording of the conversation with deaf person 

    As a: police officer on the ground who is unfamiliar with sign language
    I want: to be able to quickly take a short video of a sign language conversation;
    so that: I can review the recording later back at the station

     Scenario: start and finish recording
        Given that I am at "new" section of "recording" page
        When I click on the "Start" button
        Then I should see "Stop" button
        #Then the "Stop" button should be "red"
        When I click on the "Stop" button
        Then I should be brought to the "show" section of "recording" page

    Scenario: Text transcription box is updated
        Given that I am at "new" section of "recording" page
        When 10 seconds has passed
        Then I should see the time increment by 10