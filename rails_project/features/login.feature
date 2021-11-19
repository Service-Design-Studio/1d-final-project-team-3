Feature: Log in with google account.


    As a: police officer 
    I want: to be able to login to the web app
    so that:  I can view my account

    Scenario: Redirect to oAuth screen
        Given that I am on login page
        When I click on 'Log In with Google'
        Then I should see google oAuth login screen

    Scenario: fill in credentials
        Given that I am on the Google login page
        When I fill in my email
        And I click on the next button
        Then I should see the Google enter password page
        When I fill in my password
        And I click on the next button
        Then I should be brought to the "/" section of "user" page