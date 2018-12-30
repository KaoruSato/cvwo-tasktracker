require 'rails_helper'

RSpec.describe IndexController, type: :request do
  describe "GET #index" do
    it "returns HTTP success" do
      get "/"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #all" do
    before(:context) do
      create_list(:task, 3, done: false)
      create_list(:tag, 3)

      get "/api/all"
    end

    it "returns HTTP Success" do
      expect(response.status).to eq(200)
    end

    it "returns all tasks and tags" do
      tasks = Task.all
      tags = Tag.all

      all = {
        tasks: tasks,
        tags: tags
      }

      expect(response.body).to eq(all.to_json)
    end
  end
end
