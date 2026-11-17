Feature: Login

  Scenario: Login with valid credentials
    Given I am on the login page
    When I login with email "customer@practicesoftwaretesting.com" and password "welcome01"
    Then I should be on the account page

  Scenario: Login with empty fields
    Given I am on the login page
    When I click the login button
    Then I should see the message "Email is required"
    And I should see the message "Password is required"