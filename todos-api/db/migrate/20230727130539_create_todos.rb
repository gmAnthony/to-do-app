class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :title
      t.string :description
      t.string :status
      t.string :user_id

      t.timestamps
    end
  end
end
