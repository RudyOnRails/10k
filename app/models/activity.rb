class Activity < ActiveRecord::Base
  attr_accessible :name, :activity_type_id, :duration_hours
  belongs_to :user
  belongs_to :activity_type
end
