class Task < ApplicationRecord
  validates :title, presence: true
  validates :done, inclusion: { in: [true, false] }

  belongs_to :tag, optional: true
end
