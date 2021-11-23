require 'capybara/rspec'

Given('that I am at {string} section of {string} page') do |action,controller|
    visit "#{controller}/#{action}"
end
  
Then('I should see a video screen') do
    expect(page).to have_xpath '//*[@id="video-player"]'
end

Then('I should see a logs table') do
    expect(page).to have_table
end

Then('I should be brought to the corresponding {string} page') do |path|
    expect(current_path).to eq edit_recording_path(path)
end

And('I should see Title, Date and Edit') do
    within('table') do
        expect(page).to have_xpath(".//th", :count => 3)
    end
    Rails.application.load_seed
end

And('I should see {string} button') do |buttonName|
    expect(page).to have_button buttonName
end

When('I click on "Edit" column') do
    within('table') do
        click_link "Edit"
    end
end

When('I click on the {string} button') do |buttonName|
    click_button buttonName
end

When 'I am signing a handsign' do
    next
end

Then 'I should see an English transcription of the handsign' do
    next
end

Then 'I should be brought to the {string} section of {string} page' do |action,controller|
    expect(current_path).to eq "/#{controller}/#{action}"
end

Then 'I should be brought to the {string} page' do |action|
    expect(current_path).to eq "/#{action}"
end

Given 'that I am on login page' do
    visit 'http://localhost:3000/login'
end

When 'I click on {string}' do |link|
    click_link link
end

Then 'I should see google oAuth login screen' do
    expect(page).to have_selector('input')
end

Given 'that I am on the Google login page' do
    expect(page).to have_selector('input')
end

When 'I fill in my email' do
    fill_in 'data-initial-value', :with => '1004413@sutd.edu.sg'
end

When 'I fill in my password' do
    fill_in 'data-initial-value', :with => 'sutd1234'
end

And 'I click on the next button' do
    click_button "Next"
end

Then 'I should see the Google enter password page' do
    expect(page).to have_text('Welcome')
end

Given 'that I am on the "Recording Logs" page' do
    visit "/recording"
end

Given ('that I am at {string} page') do |controller|
    visit "#{controller}"
end

When ('10 seconds has passed') do 
    expect(page).to  have_selector('textarea')
end

Then ('I should see the time increment by 10') do
    expect(page).to have_text('00:00:10,000 --> 00:00:20,000:', wait: 10)
end