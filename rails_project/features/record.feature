Feature: To have a video recording of the conversation with deaf person 

    As a: police officer on the ground who is unfamiliar with sign language
    I want: to be able to quickly take a short video of a sign language conversation;
    so that: I can review the recording later back at the station

    Scenario: pre-recording checks
        Given that I am logged in
        Given that I am at "new" section of "recording" page
        Then I should see "Start" button
        And I should see a video screen

    # Scenario: start and finish recording
    #     Given that I am at "new" section of "recording" page
    #     When I click on the "Start" button
    #     Then I should see "Stop" button
    #     And the "Stop" button should be "red"
    #     When I click on the "Stop" button
    #     Then I should be brought to the "show" section of "recording" page

    # Scenario: User can view transription
    #     Given that I am at "new" section of "recording" page
    #     When I click on the "Start" button
    #     And I am signing a handsign
    #     Then I should see an English transcription of the handsign

    # Scenario: Text transcription box is updated
    #     Given that I am at "new" section of "recording" page
    #     When 10 seconds has passed
    #     Then I should see the time increment by 10


#check if seconds increases by 10 
#accuracy of ML write as pending test case