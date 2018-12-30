class IndexController < ApplicationController
  def index
  end

  def all
    tasks = Task.all
    tags = Tag.all

    all = {
      tasks: tasks,
      tags: tags
    }

    render json: all
  end
end
