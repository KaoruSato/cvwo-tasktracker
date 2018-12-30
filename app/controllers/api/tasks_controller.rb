class Api::TasksController < ApplicationController
  def index
    tasks = Task.all

    render json: tasks
  end

  def create
    task = Task.new(task_params)
    task.save!

    render json: task, status: :created
  end

  def show
    task = Task.find(params[:id])

    render json: task
  end

  def update
    task = Task.find(params[:id])
    task.update!(task_params)

    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy

    head :ok
  end

  private
    def task_params
      params.require(:task).permit(:title, :done, :tag_id)
    end
end
