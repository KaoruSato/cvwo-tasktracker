class ApplicationController < ActionController::Base
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
