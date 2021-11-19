require 'capybara/rspec'

Given('that I am at {string} section of {string} page') do |action,controller|
    visit "#{controller}/#{action}"
end
  
Then('I should see a video screen') do
    expect(page).to have_xpath '//*[@id="live"]'
end

Then('I should see a logs table') do
    expect(page).to have_table
end

And('I should see Title, Date and Edit') do
    expect(page).to have_text('Title', 'Date', 'Edit')
end

Then('I should see {string} button') do |buttonName|
    expect(page).to click_link_or_button buttonName
end

When('I click on the {string} button') do |buttonName|
    click_button buttonName
end

When 'I am signing a handsign' do
    
end

Then 'I should see an English transcription of the handsign' do

end

Given 'I am already recording a video with transcription' do
    
end

Then 'I should be brought to the {string} section of {string} page' do
    expect(current_path).to eq "recording/edit"
end

Given 'that I am on login page' do
    expect(page).to have_text('Log In with Google')
end

When 'I click on {string}' do |link|
    click_link link
end

Then 'I should see google oAuth login screen'
    expect(page).to have_text('sds-txt-app')
end

Given 'that I am on the Google login page' do
    expect(page).to have_text('sds-txt-app')
end

When 'I fill in my email' do
    fill_in 'input', :with => '1004413@sutd.edu'
end

And 'I click on the next button' do
    
end

Then 'I should see the Google enter password page' do
    
end