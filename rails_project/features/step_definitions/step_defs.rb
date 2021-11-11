require 'capybara/rspec'

Given('that I am at {string} section of {string} page') do |action,controller|
    visit "#{controller}/#{action}"
end
  
Then('I should see a video screen') do
    expect(page).to have_xpath '//*[@id="live"]'
end

Then('I should see {string} button') do |buttonName|
    expect(page).to have_button buttonName
end

When('I click on the {string} button') do |buttonName|
    click_button 'Start'
end
