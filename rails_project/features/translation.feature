Feature: To have a transcription of the video recording of the sign language conversation with a deaf person

  As a: police officer on the ground who is trying to understand a deaf person,
  I want: to be able to quickly have a transcription of a sign language conversation;
  so that: I can see and understand what the hand sign means in English.

  Scenario: User can view transription
    Given that I am at "new" section of "recording" page
    When I click on the "Start" button
    And I am signing a handsign
    Then I should see an English transcription of the handsign

  Scenario: User can save transcription
    Given that I am already recording a video with transcription
    When I click on the "Stop" button
    Then I should be brought to the "edit" section of "recording" page