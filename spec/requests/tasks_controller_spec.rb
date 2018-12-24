require 'rails_helper'

RSpec.describe Api::TasksController, type: :request do
  describe "GET #index" do
    before(:context) do
      create_list(:task, 3)

      get "/api/tasks"
    end

    it "returns HTTP success" do
      expect(response.status).to eq(200)
    end

    it "returns all tasks" do
      tasks = Task.all
      expect(response.body).to eq(tasks.to_json)
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      before(:context) do
        @old_task_count = Task.all.count
        @request_task = build(:task)

        post "/api/tasks", params: { task: @request_task.as_json }
      end

      it "returns HTTP Created status" do
        expect(response.status).to eq(201)
      end

      it "saves new task" do
        new_task_count = Task.all.count
        expect(new_task_count).to eq(@old_task_count + 1)

        latest_task = Task.order(:created_at).last
        expect(latest_task.title).to eq(@request_task.title)
      end

      it "returns new task" do
        response_task = JSON.parse(response.body)
        expect(response_task["title"]).to eq(@request_task.title)
      end
    end

    context "with invalid attributes" do
      before(:context) do
        @old_task_count = Task.all.count
        @request_task = build(:task, title: nil)

        # Force validations
        @request_task.valid?

        post "/api/tasks", params: { task: @request_task.as_json }
      end

      it "returns HTTP Bad Request status" do
        expect(response.status).to eq(400)
      end

      it "does not save new task" do
        new_task_count = Task.all.count
        expect(new_task_count).to eq(@old_task_count)
      end

      it "returns errors" do
        response_parsed = JSON.parse(response.body)
        expect(response_parsed["errors"]).to eq(@request_task.errors.full_messages)
      end
    end
  end

  describe "GET #show" do
    context "with valid ID" do
      before(:context) do
        @task = create(:task)

        get "/api/tasks/#{@task.id}"
      end

      it "returns HTTP success" do
        expect(response.status).to eq(200)
      end

      it "returns task with given ID" do
        response_task = JSON.parse(response.body)
        expect(response_task["title"]).to eq(@task.title)
      end
    end

    context "with invalid ID" do
      before(:context) do
        random_id = Faker::Number.number(3)
        get "/api/tasks/#{random_id}"
      end

      it "returns HTTP Not Found status" do
        expect(response.status).to eq(404)
      end
    end
  end

  describe "PUT #update" do
    before(:context) do
      @task = create(:task)
      @request_task = build(:task, done: !@task.done)

      put "/api/tasks/#{@task.id}", params: { task: @request_task.as_json }
    end

    it "returns HTTP OK status" do
      expect(response.status).to eq(200)
    end

    it "updates task" do
      updated_task = Task.find(@task.id)

      expect(updated_task.title).to eq(@request_task.title)
      expect(updated_task.done).to eq(@request_task.done)
    end

    it "returns updated task" do
      response_task = JSON.parse(response.body)

      expect(response_task["title"]).to eq(@request_task.title)
      expect(response_task["done"]).to eq(@request_task.done)
    end
  end

  describe "DELETE #destroy" do
    before(:context) do
      @task = create(:task)
      @old_task_count = Task.all.count

      delete "/api/tasks/#{@task.id}"
    end

    it "returns HTTP OK status" do
      expect(response.status).to eq(200)
    end

    it "deletes task" do
      new_task_count = Task.all.count
      expect(new_task_count).to eq(@old_task_count - 1)

      expect{Task.find(@task.id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
