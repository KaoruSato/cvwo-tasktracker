class Api::TagsController < ApplicationController
  def index
    tags = Tag.all

    render json: tags
  end

  def create
    tag = Tag.new(tag_params)
    tag.save!

    render json: tag, status: :created
  end

  def destroy
    tag = Tag.find(params[:id])
    tag.destroy

    head :ok
  end

  private
    def tag_params
      params.require(:tag).permit(:title)
    end
end
