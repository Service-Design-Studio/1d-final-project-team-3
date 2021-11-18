Feature: To have access to video recording feature, and logs feature.


    As a: police officer 
    I want: to be able to quickly take a short video of a sign language conversation
    so that:  I can review the recording later back at the station

    Scenario: check landing page features
        Given that I am at "/" section of "user" page
        Then I should see "Recording" button
        And I should see "View Past Recordings"

    Scenario: going to the logs page
        Given that I am at "/" section of "user" page
        When I click on the "View Past Recordings" button
        Then I should be brought to the "index" section of "recording" page
    
    Scenario: starting a video recording
        Given that I am at "/" section of "user" page
        When I click on the "Home" button
        Then I should be brought to the "new" section of "recording" page
