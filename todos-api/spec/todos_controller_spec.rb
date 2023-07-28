require 'rails_helper'

RSpec.describe TodosController, type: :controller do
  def encoded_token(user_id)
    exp = Time.now.to_i + 4 * 3600
    exp_payload = { user_id: user_id, exp: exp }

    private_key = OpenSSL::PKey::RSA.new(File.read(ENV['PRIVATE_KEY_PATH']))
    JWT.encode(exp_payload, private_key, 'RS256')
  end
  
  let(:user_id) {'test_user_id'}

  let(:valid_headers) {
    {
      'Authorization' => "Bearer #{encoded_token(user_id)}"
    }
  }

  let(:valid_attributes) {
    { title: 'Test title', description: 'Test description', status: 'pending', userId: 1 }
  }

  let(:invalid_attributes) {
    { title: '', description: '', status: '', userId: '' }
  }

  before do
    allow_any_instance_of(ApplicationController).to receive(:retrieve_public_key).and_return(OpenSSL::PKey::RSA.new(File.read('./public.pem')))
    request.headers.merge!(valid_headers)
  end

  describe "GET #index" do
    it "returns a success response" do
      Todo.create! valid_attributes
      get :index, params: {userId: user_id}
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new Todo" do
        expect {
          post :create, params: {todo: valid_attributes} 
        }.to change(Todo, :count).by(1)
      end

      it "renders a JSON response with the new todo" do
        post :create, params: {todo: valid_attributes}
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.location).to eq(todo_url(Todo.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Todo" do
        expect {
          post :create, params: {todo: invalid_attributes} 
        }.to change(Todo, :count).by(0)
      end

      it "renders a JSON response with errors for the new todo" do
        post :create, params: {todo: invalid_attributes}
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PATCH #update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { title: 'Updated title', description: 'Updated description', status: 'completed', userId: 1 }
      }

      it "updates the requested todo" do
        todo = Todo.create! valid_attributes
        patch :update, params: {id: todo.to_param, todo: new_attributes}
        todo.reload
        expect(todo.attributes).to include('title' => 'Updated title', 'description' => 'Updated description', 'status' => 'completed')
      end

      it "renders a JSON response with the todo" do
        todo = Todo.create! valid_attributes
        patch :update, params: {id: todo.to_param, todo: new_attributes}
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the todo" do
        todo = Todo.create! valid_attributes
        patch :update, params: {id: todo.to_param, todo: invalid_attributes}
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested todo" do
      todo = Todo.create! valid_attributes
      expect {
        delete :destroy, params: {id: todo.to_param}
      }.to change(Todo, :count).by(-1)
    end
  end
end
