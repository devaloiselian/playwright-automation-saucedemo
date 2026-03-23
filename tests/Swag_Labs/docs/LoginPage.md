Feature: Login Page UI Components Visibility
  As a user
  I want the login page to load all components correctly
  So that I can understand how to authenticate in the application

  Scenario: Core elements and helper texts are displayed correctly on the login page
    Given I navigate to the SauceDemo login page at 'https://www.saucedemo.com/'
    Then the header logo is visible and displays the text 'Swag Labs'
    And the following form elements are visible and enabled:
      | Element Name   |
      | Username input |
      | Password input |
      | Login button   |
    And the accepted usernames helper container is visible
    And the usernames container contains the header 'Accepted usernames are:'
    And the usernames container lists the following users:
      | standard_user           |
      | locked_out_user         |
      | problem_user            |
      | performance_glitch_user |
      | error_user              |
      | visual_user             |
    And the password helper container is visible
    And the password container contains the header 'Password for all users:'
    And the password container displays the hint 'secret_sauce'