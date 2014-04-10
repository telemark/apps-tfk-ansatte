// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
  setup: function() {
    // before each test, ensure the application is ready to run.
    Ember.run(App, App.advanceReadiness);
  },

  teardown: function() {
    // reset the application state between each test
    App.reset();
  }
});

// QUnit test case
test("/", function() {
  // async helper telling the application to go to the '/' route
  visit("/");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal(find("h1").text(), "Finn ansatte", "Page title is correct");
    equal(find("h3").text(), "Telemark fylkeskommune: ansatte", "Application header is rendered");
    equal(find("li").length, 3, "There are three items in the list");
  });
});

test("/personvern", function() {
  // async helper telling the application to go to the '/' route
  visit("/personvern");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal(find("h1").text(), "Personvernerklæring", "Page title is correct");
    equal(find("h3").first().text(), "Telemark fylkeskommune: ansatte", "Application header is rendered");
    equal(find("h3").last().text(), "Les mer om cookies", "Application header is rendered");
    equal(find("h2").text(), "Bruk av Google Analytics", "Sub title is correct");
  });
});