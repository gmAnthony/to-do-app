require 'net/http'
require 'uri'

class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

  private

  def authenticate_request
    @current_user = decode_auth_token
  rescue JWT::DecodeError => e
    render json: { error: e.message }, status: :unauthorized
  end

  def decode_auth_token
    token = request.headers['Authorization'].split(' ').last
    return if token.nil?

    public_key = retrieve_public_key(token)
    decoded_token = JWT.decode(token, public_key, true, { algorithm: 'RS256' })

    decoded_token[0]
  end

  def retrieve_public_key(token)
    header = JWT.decode(token, nil, false)
    kid = header[1]['kid']
    uri = URI("https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com")
    response = Net::HTTP.get(uri)
    certificates = JSON.parse(response)
    OpenSSL::X509::Certificate.new(certificates[kid]).public_key
  end
end