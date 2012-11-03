class AddTimeTotalToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :duration_hours, :integer
  end
end
