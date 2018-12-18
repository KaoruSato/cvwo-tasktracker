require 'rails_helper'

RSpec.describe IndexController, type: :request do
  describe "GET #index" do
    it "returns HTTP success" do
      get "/"
      expect(response).to have_http_status(:success)
    end
  end
end
