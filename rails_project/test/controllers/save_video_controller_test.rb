require "test_helper"

class SaveVideoControllerTest < ActionDispatch::IntegrationTest
  test "should get save_video" do
    get save_video_save_video_url
    assert_response :success
  end
end
