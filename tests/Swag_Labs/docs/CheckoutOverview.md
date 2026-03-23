Feature: Checkout Overview and Order Completion
  As a customer who has provided shipping details
  I want to review my final costs and confirm my purchase
  So that my order is successfully placed

  Background:
    Given I am logged in as 'standard_user'
    And I have completed the Checkout Information step
    And I am on the Checkout Overview page

  Scenario: The overview page displays correct items and accurate pricing math
    Then the page title displays 'Checkout: Overview'
    And the ordered items are displayed correctly
    And the pricing breakdown (Subtotal, Tax, and Total) is visible
    And the mathematical sum of the Subtotal and Tax equals the Total price exactly

  Scenario: Successfully finishing the purchase process
    When I click the 'Finish' button
    Then I am redirected to the Order Complete page
    And the title displays 'Checkout: Complete!'
    And I see the success message 'Thank you for your order!'

  Scenario: Returning home after a successful purchase clears the cart
    Given I am on the Order Complete page
    When I click the 'Back Home' button
    Then I am redirected to the inventory page
    And the shopping cart badge is empty and hidden