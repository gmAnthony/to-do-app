class Todo < ApplicationRecord
  validates :title, presence: true
  validates_inclusion_of :status, in: ['completed', 'pending']
end
