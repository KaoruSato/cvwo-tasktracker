class AddConstraintForTags < ActiveRecord::Migration[5.2]
  def change
    change_column_null :tags, :title, false
  end
end
