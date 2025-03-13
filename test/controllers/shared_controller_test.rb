require "test_helper"

class SharedControllerTest < ActionDispatch::IntegrationTest
  test "should get _sidebar" do
    get shared__sidebar_url
    assert_response :success
  end
end
