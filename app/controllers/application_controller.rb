class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  rescue_from ActiveRecord::RecordInvalid, with: :render_bad_request_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def render_bad_request_response(exception)
    render json: {
      errors: exception.record.errors.full_messages
    }, status: :bad_request
  end

  def render_not_found_response(exception)
    render json: {
      error: exception.message
    }, status: :not_found
  end
end
