Feature: Login Flow Validation
  As a registered user
  I want to log into the application safely
  So that I can access the store inventory

  Background:
    Given I navigate to the SauceDemo login page at 'https://www.saucedemo.com/'
    And the header logo is visible

  Scenario Outline: Unsuccessful login attempts show specific error messages and can be dismissed
    When I enter the username
    And I enter the password
    And I click the Login button
    Then an error message appears with the text 'Expected Error'
    When I click the close error button ('X')
    Then the error message is hidden from the view

    Examples:
      | Description         | Username      | Password       | Expected Error                                                            |
      | empty fields        |               |                | Epic sadface: Username is required                                        |
      | only username       | standard_user |                | Epic sadface: Password is required                                        |
      | only password       |               | secret_sauce   | Epic sadface: Username is required                                        |
      | invalid credentials | invalid_user  | wrong_password | Epic sadface: Username and password do not match any user in this service |

  Scenario: Successful login with valid credentials navigates to the inventory page
    When I enter the username 'standard_user'
    And I enter the password 'secret_sauce'
    And I click the Login button
    Then I am redirected to the inventory page
    And the page title displays 'Products'