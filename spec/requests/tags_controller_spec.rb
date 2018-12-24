require 'rails_helper'

RSpec.describe Api::TagsController, type: :request do
  describe "GET #index" do
    before(:context) do
      create_list(:tag, 3)

      get "/api/tags"
    end

    it "returns HTTP success" do
      expect(response.status).to eq(200)
    end

    it "returns all tags" do
      tags = Tag.all
      expect(response.body).to eq(tags.to_json)
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      before(:context) do
        @old_tag_count = Tag.all.count
        @request_tag = build(:tag)

        post "/api/tags", params: { tag: @request_tag.as_json }
      end

      it "returns HTTP Created status" do
        expect(response.status).to eq(201)
      end

      it "saves new tag" do
        new_tag_count = Tag.all.count
        expect(new_tag_count).to eq(@old_tag_count + 1)

        latest_tag = Tag.order(:created_at).last
        expect(latest_tag.title).to eq(@request_tag.title)
      end

      it "returns new tag" do
        response_tag = JSON.parse(response.body)
        expect(response_tag["title"]).to eq(@request_tag.title)
      end
    end

    context "with invalid attributes" do
      before(:context) do
        @old_tag_count = Tag.all.count
        @request_tag = build(:tag, title: nil)

        # Force validations
        @request_tag.valid?

        post "/api/tags", params: { tag: @request_tag.as_json }
      end

      it "returns HTTP Bad Request status" do
        expect(response.status).to eq(400)
      end

      it "does not save new tag" do
        new_tag_count = Tag.all.count
        expect(new_tag_count).to eq(@old_tag_count)
      end

      it "returns errors" do
        response_parsed = JSON.parse(response.body)
        expect(response_parsed["errors"]).to eq(@request_tag.errors.full_messages)
      end
    end
  end

  describe "DELETE #destroy" do
    before(:context) do
      @tag = create(:tag)
      @task = create(:task, tag: @tag)
      @old_tag_count = Tag.all.count

      delete "/api/tags/#{@tag.id}"
    end

    it "returns HTTP OK status" do
      expect(response.status).to eq(200)
    end

    it "deletes tag" do
      new_tag_count = Tag.all.count
      expect(new_tag_count).to eq(@old_tag_count - 1)

      expect{Tag.find(@tag.id)}.to raise_error(ActiveRecord::RecordNotFound)
    end

    it "nullifies referenced tasks' tag_id" do
      @task.reload
      expect(@task.tag_id).to eq(nil)
    end
  end
end
