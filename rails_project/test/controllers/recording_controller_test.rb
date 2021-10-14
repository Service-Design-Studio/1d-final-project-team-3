require "test_helper"

class RecordingControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get recording_index_url
    assert_response :success
  end
end
