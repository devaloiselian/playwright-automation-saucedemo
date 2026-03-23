Feature: Checkout Information
  As a customer ready to purchase
  I want to provide my shipping details
  So that my order can be processed and delivered

  Background:
    Given I am logged in as 'standard_user'
    And I have a product in my cart
    And I am on the Checkout Information page

  Scenario Outline: The system prevents continuation with missing required fields
    When I enter the First Name
    And I enter the Last Name
    And I enter the Postal Code
    And I click the 'Continue' button
    Then an error message appears with the text
    When I click the close error button ('X')
    Then the error message is hidden from view

    Examples:
      | Description            | FirstName | LastName | PostalCode | ExpectedError                  |
      | All fields empty       |           |          |            | Error: First Name is required  |
      | First Name is missing  |           | Doe      | 12345      | Error: First Name is required  |
      | Last Name is missing   | John      |          | 12345      | Error: Last Name is required   |
      | Postal Code is missing | John      | Doe      |            | Error: Postal Code is required |

  Scenario: Successful submission of shipping information
    When I fill the checkout form with valid details
    And I click the 'Continue' button
    Then I am redirected to the Checkout Overview page

  Scenario: Canceling the checkout process
    When I click the 'Cancel' button
    Then I am redirected back to the Shopping Cart page