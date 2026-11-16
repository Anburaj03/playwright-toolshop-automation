Feature: Product Search

  Scenario: Search with a valid product name
    Given I am on the home page
    When I search for "Hammer"
    Then I should see the product "Thor Hammer"

  Scenario: Search with a product that does not exist
    Given I am on the home page
    When I search for "zzzzxxxx"
    Then I should see the message "There are no products found."