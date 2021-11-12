require 'capybara/rspec'

Given('that I am at {string} section of {string} page') do |action,controller|
    visit "#{controller}/#{action}"
end
  
Then('I should see a video screen') do
    expect(page).to have_xpath '//*[@id="live"]'
end

Then('I should see a logs table') do
    expect(page).to have_css 'table'
end

And('I should see 'Title', 'Date' and 'Edit'') do
    expect(page).to have_text('Title', 'Date', 'Edit')
end

Then('I should see {string} button') do |buttonName|
    expect(page).to have_button buttonName
end

When('I click on the {string} button') do |buttonName|
    click_button 'Start'
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
