Feature: Inventory Page
  As a registered user
  I want to view the product catalog and navigate the store
  So that I can find products to purchase

  Background:
    Given I am logged in as 'standard_user'
    And I am on the inventory page

  Scenario: The inventory page displays all structural elements correctly
    Then the page title displays 'Products'
    And the product grid displays exactly 6 items
    And each product card contains an image, title, description, and price
    And the footer is visible and displays the year '2026' and copyright notice
    And the footer contains social media links for Twitter, Facebook, and LinkedIn

  Scenario: The hamburger menu displays the correct navigation options
    When I click the hamburger menu button
    Then the sidebar opens
    And the following menu options are visible in order:
      | Menu Option       |
      | All Items         |
      | About             |
      | Logout            |
      | Reset App State   |

  Scenario: Adding and removing a product directly from the inventory grid
    When I click the 'Add to cart' button for the first product
    Then the button transforms into a 'Remove' button
    And the shopping cart badge updates to display '1'
    When I click the 'Remove' button for the same product
    Then the button transforms back into an 'Add to cart' button
    And the shopping cart badge is hidden