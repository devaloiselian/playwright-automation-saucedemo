Feature: Shopping Cart
  As a customer with items in the cart
  I want to review my selected products
  So that I can manage my order before checking out

  Background:
    Given I am logged in as 'standard_user'
    And I have added at least one product to the cart
    When I click the shopping cart icon
    Then I am redirected to the cart page

  Scenario: The cart page accurately reflects the added items
    Then the page title displays 'Your Cart'
    And the shopping cart badge displays the correct number of items
    And the cart list displays the exact products I added

  Scenario: Navigation buttons redirect the user correctly
    When I click the 'Continue Shopping' button
    Then I am redirected back to the inventory page
    
  Scenario: Proceeding to checkout
    When I click the 'Checkout' button
    Then I am redirected to the Checkout Information page