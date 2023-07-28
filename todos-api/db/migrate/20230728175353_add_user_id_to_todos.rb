class AddUserIdToTodos < ActiveRecord::Migration[7.0]
  def change
    add_column :todos, :userId, :string
  end
end
