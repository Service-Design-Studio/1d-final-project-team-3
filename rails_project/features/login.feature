Feature: Log in with google account.


    As a: police officer 
    I want: to be able to login to the web app
    so that:  I can view my account

    Scenario: Redirect to oAuth screen
        Given that I am on login page
        When I click on 'Log In with Google'
        Then I should see "View Past Recordings"

    Scenario: fill in credentials
        Given that I am on login page
        When I click on 'Log In with Google'
        Then I should see "View Past Recordings"